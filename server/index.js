const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') })

const db = require('./app/models')

const dataRoutes = require('./app/routes/data.routes')

const PORT = process.env.SERVER_PORT || 5000

const app = express()
const server = http.createServer(app, {
	cors: {
		origin: 'http://localhost:3000',
	},
})
const io = new Server(server)

global.io = io

io.on('connection', (socket) => {
	console.log('a user connected')
	global.socket = socket
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})
})

db.sequelize
	.sync()
	.then(() => {
		console.log('Synced db.')
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message)
	})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>
	res.json({
		name: 'hausmesse-2022',
		authors: 'Marc Wissler, Ian Murawski, Tobias Laufersweiler',
	})
)

dataRoutes(app)

server.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})
