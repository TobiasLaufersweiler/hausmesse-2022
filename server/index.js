const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') })

const db = require('./app/models')

const dataRoutes = require('./app/routes/data.routes')

const PORT = process.env.SERVER_PORT || 5000

const app = express()

db.sequelize
	.sync()
	.then(() => {
		console.log('Synced db.')
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message)
	})

var corsOptions = {
	origin: `http://localhost:${PORT + 1}`,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>
	res.json({
		name: 'hausmesse-2022',
		authors: 'Marc Wissler, Ian Murawski, Tobias Laufersweiler',
	})
)

dataRoutes(app)

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})
