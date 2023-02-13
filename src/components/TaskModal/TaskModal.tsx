import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { deleteTask, modalHandler, updateTask } from '../../store/listSlice'
import { ChangeEvent } from 'react'
import { TextField } from '@mui/material'
import { addInCart } from '../../store/cartSlice'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '20px',
}

interface task {
	task: any
}

export default function BasicModal() {
	const modal = useAppSelector((state) => state.list.modalActive)
	const editingModal = useAppSelector((state) => state.modal)

	const [data, setData] = React.useState(editingModal)

	const dispatch = useAppDispatch()

	const updateData = () => {
		dispatch(
			updateTask({
				id: data.listId,
				task: data.task,
			})
		)
		dispatch(modalHandler(false))
	}

	const handleAddToCart = () => {
		dispatch(addInCart(data))
		dispatch(
			deleteTask({
				id: data.listId,
				taskId: data.task.taskId,
			})
		)
		dispatch(modalHandler(false))
	}

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, task: { ...data.task, taskName: e.target.value } })
	}
	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({
			...data,
			task: { ...data.task, taskDescription: e.target.value },
		})
	}

	return (
		<div>
			<Modal
				open={modal}
				onClose={() => dispatch(modalHandler(false))}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<TextField
						style={{
							width: '300px',
							textAlign: 'center',
							marginBottom: '1em',
						}}
						required
						id='outlined-required'
						label='Required'
						defaultValue={data.task.taskName}
						onChange={handleNameChange}
					/>
					<TextField
						style={{ width: '300px', textAlign: 'center', marginBottom: '1em' }}
						required
						id='outlined-required'
						label='Required'
						defaultValue={data.task.taskDescription}
						onChange={handleDescriptionChange}
					/>
					<div>
						<Button onClick={updateData}>Update Task</Button>
						<Button onClick={handleAddToCart}>Delete Task</Button>
					</div>
				</Box>
			</Modal>
		</div>
	)
}
