import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { list, task } from '../interfaces/interface'
import { taskInCart } from './cartSlice'

type deleteListAction = {
	id: string
}

type deleteTaskAction = {
	id: string
	taskId: string
}

type sortAction = {
	droppableIdStart: string
	droppableIdEnd: string
	droppableIndexStart: number
	droppableIndexEnd: number
	draggableId: string
}

type addTaskAction = {
	id: string
	task: task
}

export type listState = {
	modalActive: boolean
	listsArray: list[]
}

const initialState: listState = {
	modalActive: false,
	listsArray: [],
}

const listSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		getBoard: (state: listState, { payload }: PayloadAction<[]>) => {
			state.listsArray = payload
		},
		addList: (state: listState, { payload }: PayloadAction<list>) => {
			state.listsArray.push(payload)
		},

		addTask: (state: listState, { payload }: PayloadAction<any>) => {
			state.listsArray.map((list) =>
				list.id === payload.id
					? { ...list, tasks: list.tasks.push(payload.task) }
					: list
			)
		},

		sort: (state: listState, { payload }: PayloadAction<sortAction>) => {
			// same list

			if (payload.droppableIdStart === payload.droppableIdEnd) {
				const list: any = state.listsArray.find(
					(list: any) => payload.droppableIdStart == list.id
				)
				const card = list.tasks.splice(payload.droppableIndexStart, 1)
				list?.tasks.splice(payload.droppableIndexEnd, 0, ...card)
			}
			// other list
			if (payload.droppableIdStart !== payload.droppableIdEnd) {
				const listStart: any = state.listsArray.find(
					(list: any) => payload.droppableIdStart == list.id
				)

				const card = listStart.tasks.splice(payload.droppableIndexStart, 1)
				const listEnd: any = state.listsArray.find(
					(list: any) => payload.droppableIdEnd == list.id
				)
				listEnd.tasks.splice(payload.droppableIndexEnd, 0, ...card)
			}
		},

		modalHandler: (state: listState, { payload }: PayloadAction<boolean>) => {
			state.modalActive = payload
		},

		updateTask: (state: listState, { payload }: PayloadAction<any>) => {
			state.listsArray = state.listsArray.map((list) =>
				list.id === payload.id
					? {
							...list,
							tasks: list.tasks.map((task: any) =>
								task.taskId == payload.task.taskId ? payload.task : task
							),
							// id: '1',
					  }
					: list
			)
		},

		deleteTask: (
			state: listState,
			{ payload }: PayloadAction<deleteTaskAction>
		) => {
			state.listsArray = state.listsArray.map((list) =>
				list.id === payload.id
					? {
							...list,
							tasks: list.tasks.filter(
								(task) => +task.taskId !== +payload.taskId
							),
					  }
					: list
			)
		},

		deleteList: (state: listState, { payload }: PayloadAction<string>) => {
			state.listsArray = state.listsArray.filter((list) => list.id !== payload)
		},

		setModalActive: (state: listState, { payload }: PayloadAction<boolean>) => {
			state.modalActive = payload
		},
		restoreTask: (state: listState, { payload }: PayloadAction<taskInCart>) => {
			// state.listsArray = state.listsArray.map((list => {
			// list.id ===payload.id ? list.tasks.push(payload.task) : list
			state.listsArray.map(
				(list) =>
					list.id === payload.listId
						? {
								...list,
								tasks: list.tasks.push(payload.task),
						  }
						: list
				// }
			)
		},
	},
})

export default listSlice.reducer
export const {
	getBoard,
	addList,
	addTask,
	sort,
	setModalActive,
	updateTask,
	deleteTask,
	deleteList,
	modalHandler,
	restoreTask,
} = listSlice.actions
