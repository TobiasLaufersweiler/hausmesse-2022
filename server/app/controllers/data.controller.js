const db = require('../models')
const DataEntry = db.dataEntries

exports.create = (req, res) => {
	// GENERATE RANDOM ENTRIES
	// TRUNCATE TABLE BEFORE GENERATING!

	// const entries = []
	// const now = new Date()

	// for (var i = 0; i < 3600; i++) {
	// 	entries.push({
	// 		temperature: Number.parseFloat(
	// 			(Math.random() * (25 - 23) + 23).toFixed(1)
	// 		),
	// 		humidity: Number.parseFloat((Math.random() * (68 - 65) + 65).toFixed(1)),
	// 		timestamp: new Date().setSeconds(now.getSeconds() - (3600 - i)),
	// 	})
	// }

	// DataEntry.bulkCreate(entries).then(() => res.send('success'))
	// return

	const data = {
		timestamp: new Date(req.body.timestamp),
		temperature: req.body.temperature,
		humidity: req.body.humidity,
	}

	DataEntry.create(data)
		.then((data) => {
			global.io.emit('data-entry', data)
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
