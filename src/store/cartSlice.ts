import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { task } from '../interfaces/interface'

export type taskInCart = {
	listId: string
	task: task
}

type stateCart = {
	list: taskInCart[]
}

const initialState: stateCart = {
	list: [],
}

const cartSlice: any = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addInCart: (state: stateCart, { payload }: PayloadAction<any>) => {
			state.list.push(payload)
		},
		removeFromCart: (state: stateCart, { payload }: PayloadAction<any>) => {
			state.list = state.list.filter((task) => task.task.taskId !== payload)
		},
		removeAllCart: (state: stateCart) => {
			state.list = []
		},
	},
})

export default cartSlice.reducer
export const { addInCart, removeFromCart, removeAllCart } = cartSlice.actions
