import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { task } from '../interfaces/interface'

type modalState = {
	listId: string
	task: task
}

const initialState = {
	listId: 'list-0',
	task: {
		taskId: 'task-0',
		taskName: 'task 0',
		taskDescription: 'description',
		taskOwner: 'Anton',
	},
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalData: (
			state: modalState,
			{ payload }: PayloadAction<modalState>
		) => {
			state.listId = payload.listId
			state.task = payload.task
		},
	},
})

export const modal = modalSlice.reducer
export const { setModalData } = modalSlice.actions
