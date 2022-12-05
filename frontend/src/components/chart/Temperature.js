import React, { useContext } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import DataContext from '../../context/DataContext'
import moment from 'moment'

import colors from '../../utils/colors'

const TemperatureChart = () => {
  const { data } = useContext(DataContext)

  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <Line
        type='monotone'
        dataKey='temperature'
        stroke={colors.darkBlue}
        dot={<></>}
      />

      <Tooltip />

      <XAxis
        interval={data.length / 10}
        dataKey='timestamp'
        tickFormatter={(value, index) => {
          return moment(value).format('HH:mm')
        }}
      />
      <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
    </LineChart>
  )
}

export default TemperatureChart
