import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SocketContext from './SocketContext'

const DataContext = createContext()

const DataProvider = ({ children }) => {
	const { socket, liveUpdates } = useContext(SocketContext)
	const [data, setData] = useState([])

	const loadData = async () => {
		const res = await axios.get('http://localhost/api/data')
		setData(res.data)

		return res
	}

	useEffect(() => {
		loadData()
	}, [])

	useEffect(() => {
		socket.off('data-entry')

		if (liveUpdates) {
			socket.on('data-entry', (newEntry) => {
				console.log(newEntry)
				data.push(newEntry)
				setData(data)
			})
		}
	}, [data])

	return (
		<DataContext.Provider value={{ data, loadData }}>
			{children}
		</DataContext.Provider>
	)
}

export default DataContext
export { DataProvider }
