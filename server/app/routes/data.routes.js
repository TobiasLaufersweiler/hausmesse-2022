const express = require('express')

module.exports = (app) => {
	const router = express.Router()

	const dataController = require('../controllers/data.controller.js')

	router.post('/', dataController.create)

	router.get('/', dataController.findAll)
	router.get('/:id', dataController.findOne)

	app.use('/data', router)
}
