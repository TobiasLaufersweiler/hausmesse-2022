const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config.js')
const DataEntryModel = require('./DataEntry.model.js')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.dataEntries = DataEntryModel(sequelize, Sequelize)

module.exports = db
