import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import FilmRoute from './film/router'
import { AppDataSource } from './database/orm.config'

async function bootstrap() {
	await AppDataSource.initialize()
	const app = express()
	const PORT = process.env.PORT

	app.use(express.json())
	app.use('/api', FilmRoute)

	app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
}

bootstrap()
