export interface task {
	taskId: string
	taskName: string
	taskDescription: string
	taskOwner: string
}

export interface list {
	id: string
	listName: string
	tasks: task[]
}
