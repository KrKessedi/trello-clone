import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks'
import CustomInput from '../components/CustomInput/CustomInput'
import { getBoardData } from '../store/apiCalls'
import List from '../components/List/List'
import './Dashboard.css'
import { addList, addTask, listState } from '../store/listSlice'
import { list } from '../interfaces/interface'

const Dashboard = () => {
	useEffect(() => {
		getBoardData(dispatch)
	}, [])

	const dispatch = useAppDispatch()
	const lists = useAppSelector((state) => state.list.listsArray)

	const addboardHandler = (name: string) => {
		let list = {
			listName: name,
			tasks: [],
			id: Date.now() + '',
		}
		dispatch(addList(list))
	}

	return (
		<div className='app'>
			<div className='app-boards-container'>
				<div className='app-boards'>
					{lists?.map((list: list) => (
						<List list={list} key={list.id} />
					))}
					<div className='app-boards-last'>
						<CustomInput
							displayClass='app-boards-add-board'
							editClass='app-boards-add-board-edit'
							placeholder='Enter List Name'
							text='Add List'
							buttonText='Add List'
							onSubmit={addboardHandler}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
// function addTaskInData(arg0: {
// 	id: number
// 	task: {
// 		taskId: number
// 		taskName: string
// 		taskDescription: string
// 		taskOwner: string
// 	}
// }) {
// 	throw new Error('Function not implemented.')
// }
