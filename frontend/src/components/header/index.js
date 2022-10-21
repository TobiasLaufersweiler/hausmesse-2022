import React, { useContext } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import Switch from 'react-switch'

import colors from '../../utils/colors'
import SocketContext from '../../context/SocketContext'
import DataContext from '../../context/DataContext'

const HeaderComponent = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 24px;
	padding: 4px;
	background-color: ${colors.mediumBlue};
	color: ${colors.white};
	border-radius: 18px;
	box-shadow: 0 10px 25px ${rgba(colors.darkBlue, 0.2)};
`

const Title = styled.h1`
	margin: 0;
	padding: 20px;
	font-size: 24px;
`

const Text = styled.div`
	display: flex;
	gap: 16px;
	padding: 0 24px;
`

const Button = styled.button`
	display: inline-block;
	padding: 12px 16px;
	margin: 0;
	border: 0;
	background-color: ${colors.white};
	color: ${colors.mediumBlue};
`

const Header = () => {
	const { loadData } = useContext(DataContext)
	const { liveUpdates, toggleLiveUpdates } = useContext(SocketContext)

	return (
		<HeaderComponent className='header'>
			<Title>Luftmessung</Title>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{!liveUpdates && <Button onClick={loadData}>Reload Data</Button>}
				<Text>
					<span>Live Updates</span>
					<Switch
						checked={liveUpdates}
						onChange={async () => {
							toggleLiveUpdates()
							await loadData()
						}}
					></Switch>
				</Text>
			</div>
		</HeaderComponent>
	)
}

export default Header
