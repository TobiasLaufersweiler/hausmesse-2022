const express = require('express')
const app = express()

const PORT = 5000

app.get('/', (req, res) => res.json({ hello: 'world' }))

app.post('/data', (req, res) => {
	const data = req.body
	console.log(data)

	// Save data to DB

	// Broadcast data via Socket.IO
})

app.get('/data', (req, res) => {
	res.json([
		{
			id: 1,
			temperature: 23.1,
			humidity: 67,
			timestamp: Date.now(),
		},
	])
})

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})
