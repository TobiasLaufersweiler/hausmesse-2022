const express = require('express')
const app = express()

const PORT = 5000

app.get('/', (req, res) => res.json({ hello: 'world' }))

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})
