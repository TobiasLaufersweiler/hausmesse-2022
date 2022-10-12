const db = require('../models')
const DataEntry = db.dataEntries

exports.create = (req, res) => {
	const data = {
		temperature: req.body.temperature,
		humidity: req.body.humidity,
	}

	DataEntry.create(data)
		.then((data) => {
			res.json(data)
		})
		.catch((error) =>
			res.status(500).json({ error: 'Oops, something went wrong.' })
		)
}

exports.findAll = (req, res) => {
	DataEntry.findAll()
		.then((data) => res.json(data))
		.catch((error) =>
			res.status(500).json({ error: 'Oops, something went wrong.' })
		)
}

exports.findOne = (req, res) => {
	const id = req.params.id

	DataEntry.findByPk(id)
		.then((data) => res.json(data))
		.catch((error) =>
			res.status(500).json({ error: 'Oops, something went wrong.' })
		)
}
