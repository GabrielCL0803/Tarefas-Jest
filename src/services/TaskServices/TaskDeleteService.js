class TaskDeleteService{
    constructor(taskRepository){
        this.taskRepository = taskRepository
    }
    async execute({id}){
        const taskDelete = await this.taskRepository.deleteTask({id})
        return taskDelete
    }
  }
  
  module.exports = TaskDeleteService