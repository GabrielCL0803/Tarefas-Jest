class TaskUpdateService{
    constructor(taskRepository){
        this.taskRepository = taskRepository
    }
    async execute({id, title, description}){
        const taskUpdated = await this.taskRepository.updateTask({id, title, description})
        return taskUpdated
    }
  }
  
  module.exports = TaskUpdateService