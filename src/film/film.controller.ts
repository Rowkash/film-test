import { Request, Response } from 'express'
import { AppDataSource } from '../database/orm.config'
import { Film } from './entities/film.entity'
import redis from '../database/redis.client'

// =============== App cache store =============== //

const cacheStore = new Map()

export class FilmController {
	// =============== Get one movie by title =============== //

	async getOne(req: Request, res: Response) {
		try {
			const { title } = req.params
			console.log(title)
			if (!title) {
				return res.status(400).json({ error: 'Title parameter is required' })
			}

			const key = `film/${title}`
			const cache = await this.getFromCache(key)
			if (cache) return res.status(200).json(cache)
			const repo = AppDataSource.getRepository(Film)
			const result = await repo.findOne({ where: { title } })
			if (!result) {
				return res.status(404).json({ message: 'No films found' })
			}
			this.cacheData(key, result)
			await redis.setex(key, 30, JSON.stringify(result))
			return res.status(200).json(result)
		} catch (error) {
			console.error(error.message)
			return res
				.status(500)
				.json('Oops, something went wrong. Please try again ')
		}
	}

	// =============== Get movie from cache =============== //

	async getFromCache(key: string) {
		try {
			if (cacheStore.has(key)) return cacheStore.get(key)

			const redisCache = await redis.get(key)
			if (redisCache) return JSON.parse(redisCache)
			return null
		} catch (error) {
			console.error(error.message)
			return null
		}
	}

	cacheData(key: string, value: object) {
		cacheStore.set(key, value)
		setTimeout(() => {
			cacheStore.delete(key)
		}, 15000)
	}
}
