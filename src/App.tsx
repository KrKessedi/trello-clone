import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import TaskModal from './components/TaskModal/TaskModal'
import Dashboard from './Home/Dashboard'
import MainRoutes from './MainRoutes'
import { updateData } from './store/apiCalls'
import { useAppDispatch, useAppSelector } from './store/hooks/hooks'
import { sort } from './store/listSlice'
import Navbar from './components/Navbar'
export default function Elevation() {
	const lists = useAppSelector((state) => state.list.listsArray)
	const modalActive = useAppSelector((state) => state.list.modalActive)
	const dispatch = useAppDispatch()
	const onDragEnd = (result: any) => {
		const { destination, source, draggableId } = result

		if (!destination) {
			return
		}

		dispatch(
			sort({
				droppableIdStart: source.droppableId,
				droppableIdEnd: destination.droppableId,
				droppableIndexStart: source.index,
				droppableIndexEnd: destination.index,
				draggableId,
			})
		)
	}
	React.useEffect(() => {
		updateData(lists)
	}, [onDragEnd])
	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				{modalActive ? <TaskModal /> : null}
				{/* <Navbar /> */}
				<MainRoutes />
			</DragDropContext>
		</>
	)
}
