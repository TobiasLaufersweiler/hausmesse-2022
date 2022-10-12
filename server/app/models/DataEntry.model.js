const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	const DataEntry = sequelize.define(
		'data_entry',
		{
			temperature: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			humidity: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			createdAt: 'timestamp',
			updatedAt: false,
			underscored: true,
		}
	)

	return DataEntry
}
