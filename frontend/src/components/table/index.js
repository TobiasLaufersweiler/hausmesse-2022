import React, { useContext } from 'react'
import DataContext from '../../context/DataContext'
import DataTable from 'react-data-table-component'
import moment from 'moment'

const columns = [
	{
		name: 'Temperatur',
		selector: (row) => row.temperature,
		sortable: true,
	},
	{
		name: 'Luftfeuchtigkeit',
		selector: (row) => row.humidity,
		sortable: true,
	},
	{
		name: 'Zeitpunkt',
		selector: (row) => row.timestamp,
		format: (row, index) => moment(row.timestamp).format('DD.MM.YYYY hh:mm:ss'),
		sortable: true,
	},
]

const Table = () => {
	const { data } = useContext(DataContext)

	return (
		<DataTable
			columns={columns}
			data={data}
			defaultSortFieldId={3}
			defaultSortAsc={false}
			striped
			pagination
		/>
	)
}

export default Table
