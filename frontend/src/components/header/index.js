import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/colors'

const HeaderComponent = styled.header`
	display: flex;
	justify-content: space-between;
	margin: 24px;
	padding: 4px;
	background-color: ${colors.brown};
	color: ${colors.white};
	border-radius: 18px;
`

const Title = styled.h1`
	margin: 0;
	padding: 20px;
	font-size: 24px;
`

const Header = () => {
	return (
		<HeaderComponent className='header'>
			<Title>Luftmessung</Title>
		</HeaderComponent>
	)
}

export default Header
