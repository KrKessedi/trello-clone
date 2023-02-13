import React, { FC, ReactChild, ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { task } from '../../interfaces/interface'
import { Draggable } from 'react-beautiful-dnd'
import TaskModal from '../TaskModal/TaskModal'
import { useAppDispatch } from '../../store/hooks/hooks'
import { modalHandler } from '../../store/listSlice'
const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: '10px 20px',
}))

interface ITask {
	task: any
	children: ReactNode | ReactChild
	index: number
}

const Task: FC<ITask> = ({ task, children, index }) => {
	const dispatch = useAppDispatch()
	return (
		<>
			<Draggable draggableId={task.taskId + ''} index={index}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<Item onClick={() => dispatch(modalHandler(true))}>
							<div style={{ fontSize: '17px' }}>{task.taskName}</div>
							<div style={{ fontSize: '10px' }}>{task.taskDescription}</div>
						</Item>
					</div>
				)}
			</Draggable>
		</>
	)
}

export default Task
