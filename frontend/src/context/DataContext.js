import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SocketContext from './SocketContext'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const { socket, liveUpdates } = useContext(SocketContext)
  const [data, setData] = useState([])
  const [currentData, setCurrentData] = useState([])

  const loadData = async () => {
    const res = await axios.get('/api/data?limit=14400')
    setData(res.data)
    setCurrentData(res.data[res.data.length - 1])

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
        const newData = [...data]
        newData.push(newEntry)
        if (newData.length > 14400) {
          newData.shift()
        }
        setData(newData)
        setCurrentData(newEntry)
      })
    }
  }, [data, liveUpdates])

  return (
    <DataContext.Provider value={{ data, currentData, loadData }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
export { DataProvider }
