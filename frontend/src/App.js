import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import { TemperatureChart, HumidityChart } from './components/chart'
import Header from './components/header'
import Table from './components/table'
import colors from './utils/colors'

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 24px;
	margin: 0 24px;
	margin-bottom: 24px;
`

const Card = styled.div`
	padding: 24px;
	background-color: ${colors.white};
	border: 1px solid ${colors.lightBlue};
	border-radius: 18px;
	box-shadow: 0 10px 25px ${rgba(colors.mediumBlue, 0.15)};
`

const App = () => {
	return (
		<>
			<Header />
			<Grid>
				<Card>
					<TemperatureChart />
				</Card>
				<Card>
					<HumidityChart />
				</Card>
				<Card style={{ gridColumn: 'span 2' }}>
					<Table />
				</Card>
			</Grid>
		</>
	)
}

export default App
