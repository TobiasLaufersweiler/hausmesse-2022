import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import { TemperatureChart, HumidityChart } from './components/chart'
import Header from './components/header'
import Table from './components/table'
import colors from './utils/colors'

const Grid = styled.div`
  display: grid;
  gap: 24px;
  margin: 0 24px;
  margin-bottom: 24px;
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  background-color: ${colors.white};
  border: 1px solid ${colors.lightBlue};
  border-radius: 18px;
  box-shadow: 0 10px 25px ${rgba(colors.mediumBlue, 0.15)};

  @media (max-width: 1375px) {
    grid-column: span 2;
  }
`

const CardHeading = styled.h2`
  padding: 0;
  margin: 0;
  margin-bottom: 24px;
  text-align: center;
  color: ${colors.darkBlue};
`

const App = () => {
  return (
    <>
      <Header />
      <Grid>
        <Card>
          <CardHeading>Temperatur</CardHeading>
          <TemperatureChart />
        </Card>
        <Card>
          <CardHeading>Luftfeuchtigkeit</CardHeading>
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
