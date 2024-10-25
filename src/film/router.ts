import { Router } from 'express'
import { FilmController } from './film.controller'

const router = Router()
const filmController = new FilmController()

router.get('/film/:title', filmController.getOne.bind(filmController))

export default router
