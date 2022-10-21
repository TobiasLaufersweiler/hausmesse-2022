import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SocketContext from './SocketContext'

const DataContext = createContext()

const DataProvider = ({ children }) => {
	const { socket, liveUpdates } = useContext(SocketContext)
	const [data, setData] = useState([])

	const loadData = async () => {
		const res = await axios.get('http://localhost:5000/data')
		setData(res.data)

		return res
	}

	useEffect(() => {
		loadData()
	}, [])

	useEffect(() => {
		if (liveUpdates) {
			socket.on('data-entry', (newEntry) => {
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
