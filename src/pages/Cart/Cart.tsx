import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { list } from '../../interfaces/interface'
import {
	taskInCart,
	removeFromCart,
	removeAllCart,
} from '../../store/cartSlice'
import { restoreTask } from '../../store/listSlice'
import { Button } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: '10px 20px',
}))

const lightTheme = createTheme({ palette: { mode: 'light' } })

export default function Cart() {
	const cartList = useAppSelector((state: any) => state.cart.list)
	const dispatch = useAppDispatch()

	return (
		<Grid
			container
			spacing={2}
			style={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{[lightTheme].map((theme, index) => (
				<Grid
					item
					xs={6}
					key={index}
					style={{
						background: '#53a18b',
						padding: '20px',
						borderRadius: '10px',
						minHeight: '400px',
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: '1em',
						}}
					>
						<h2 style={{ marginBottom: '1em', color: 'white' }}>Cart</h2>
						<Button
							// variant='out'
							color='error'
							onClick={() => dispatch(removeAllCart())}
						>
							Delete All
						</Button>
					</div>
					{cartList.length > 0 ? (
						<ThemeProvider theme={theme}>
							<Box
								sx={{
									// p: 2,
									display: 'grid',
									gridTemplateColumns: { md: '1fr 1fr' },
									gap: 2,
								}}
							>
								{cartList.map((item: taskInCart) => (
									<Item key={item.task.taskId}>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<div>
												<p style={{ fontSize: '20px' }}>{item.task.taskName}</p>
												<p>{item.task.taskDescription}</p>
											</div>
											<div>
												<Button
													style={{ marginRight: '1em' }}
													variant='contained'
													color='success'
													size='small'
													onClick={() => {
														dispatch(restoreTask(item))
														dispatch(removeFromCart(item.task.taskId))
													}}
												>
													Restore
												</Button>
												<Button
													size='small'
													variant='outlined'
													color='error'
													onClick={() =>
														dispatch(removeFromCart(item.task.taskId))
													}
												>
													Delete
												</Button>
											</div>
										</div>
									</Item>
								))}
							</Box>
						</ThemeProvider>
					) : (
						<p
							style={{
								fontSize: '30px',
								color: 'white',
								textAlign: 'center',
							}}
						>
							Cart is empty!
						</p>
					)}
				</Grid>
			))}
		</Grid>
	)
}
