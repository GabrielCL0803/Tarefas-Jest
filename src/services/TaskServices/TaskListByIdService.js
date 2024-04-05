class TaskListByIdService{
    constructor(taskRepository){
        this.taskRepository = taskRepository
    }
    async execute({id}){
        const task = await this.taskRepository.listTaskById({id})
        return task
    }
  }
  
  module.exports = TaskListByIdService