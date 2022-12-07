import React, { createContext, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost/', {
  transports: ['websocket'],
})

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const [liveUpdates, setLiveUpdates] = useState(false)

  const toggleLiveUpdates = async () => {
    setLiveUpdates(!liveUpdates)
  }

  console.log(liveUpdates)

  return (
    <SocketContext.Provider value={{ socket, liveUpdates, toggleLiveUpdates }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
export { SocketProvider }
