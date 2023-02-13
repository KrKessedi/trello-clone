import axios from 'axios'
import { list } from '../interfaces/interface'
import { addList, addTask, getBoard } from './listSlice'

const BASE_URL = 'http://localhost:8000/'

export const publicReq = axios.create({
	baseURL: BASE_URL,
})

// export const addListInBack = async (dispatch: any, name: string) => {
// 	let list = {
// 		listName: name,
// 		tasks: [],
// 	}
// 	try {
// 		const res = await publicReq.patch('posts', { lists: list })
// 		dispatch(addList(res.data))
// 		console.log(res.data)
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

export const getBoardData = async (dispatch: any) => {
	try {
		let res = await publicReq('posts')
		dispatch(getBoard(res.data.lists))
	} catch (err) {
		console.log(err)
	}
}

// export const addTaskInData = async (dispatch: any, data: any) => {
// 	try {
// 		let res = await publicReq(`posts/${data.id}`)
// 		// console.log(res)
// 		res.data.tasks.push(data)
// 		let res2 = await publicReq.patch(`posts/${data.id}`, {
// 			tasks: res.data.tasks,
// 		})
// 		console.log(data)
// 		dispatch(addTask(data))
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

export const updateData = async (data: any) => {
	try {
		let res = await publicReq.patch('posts', { lists: data })
	} catch (err) {
		console.log(err)
	}
}
