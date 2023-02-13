import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function ButtonAppBar() {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						CloneTrello
					</Typography>
					{pathname === '/cart' ? (
						<Button color='inherit' onClick={() => navigate('/')}>
							Back
						</Button>
					) : (
						<Button color='inherit' onClick={() => navigate('/cart')}>
							Cart
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}
