import React, { FC, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import CustomInput from '../CustomInput/CustomInput'
import { list } from '../../interfaces/interface'
// import { addList } from './store/apiCalls'
import { getBoardData } from '../../store/apiCalls'
import { useAppDispatch } from '../../store/hooks/hooks'
import Task from '../Task/Task'
import { Droppable } from 'react-beautiful-dnd'
import { setModalData } from '../../store/modalSlice'
import { addTask, deleteList } from '../../store/listSlice'
import { Button } from '@mui/material'

const Item: any = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
	height: 60,
	lineHeight: '60px',
}))

const darkTheme = createTheme({ palette: { mode: 'dark' } })
const lightTheme = createTheme({ palette: { mode: 'light' } })

interface IList {
	list: list
}

const List: FC<IList> = ({ list }) => {
	const dispatch = useAppDispatch()

	const addTaskHandler = (name: string) => {
		dispatch(
			addTask({
				id: list.id,
				task: {
					taskId: Date.now(),
					taskName: name,
					taskDescription: '',
					taskOwner: '',
				},
			})
		)
	}

	const handleTaskChange = (
		listId: string,
		// taskId: string,
		task: any
	): void => {
		dispatch(setModalData({ listId, task }))
		// dispatch(setModalActive(true))
	}

	// useEffect(() => {
	// 	getBoardData(dispatch)
	// }, [addTaskHandler])
	return (
		<Droppable droppableId={list.id + ''}>
			{(provided) => (
				<div {...provided.droppableProps} ref={provided.innerRef}>
					{/* <Grid container spacing={2}> */}
					{[lightTheme].map((theme, index) => (
						<Grid
							item
							xs={6}
							key={index}
							style={{
								background: '#53a18b',
								borderRadius: '10px',
								padding: '20px',
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
								<h2 style={{ color: 'white' }}>{list.listName}</h2>
								<Button
									// variant='out'
									color='error'
									onClick={() => dispatch(deleteList(list.id))}
								>
									Delete
								</Button>
							</div>
							<ThemeProvider theme={theme}>
								<Box
									style={{ background: '#53a18b' }}
									sx={{
										bgcolor: 'background.default',
										display: 'flex',
										gridTemplateColumns: { md: '1fr 1fr' },
										gap: 2,
										flexDirection: 'column',
										width: '300px',
										borderRadius: '10px',
										// width: 'max-content',
										height: 'max-content',
									}}
								>
									{list.tasks.map((task: any, index) => (
										<div
											onClick={() => handleTaskChange(list.id, task)}
											key={task.taskId}
										>
											<Task task={task} index={index}>
												{/* <p>{task.task.taskName}</p> */}
											</Task>
										</div>
									))}
									{provided.placeholder}
									<CustomInput
										displayClass='app-boards-add-board'
										editClass='app-boards-add-board-edit'
										placeholder='Enter Task Name'
										text='Add Task'
										buttonText='Add Task'
										onSubmit={addTaskHandler}
									/>
								</Box>
							</ThemeProvider>
						</Grid>
					))}
					{/* </Grid> */}
				</div>
			)}
		</Droppable>
	)
}

export default List
