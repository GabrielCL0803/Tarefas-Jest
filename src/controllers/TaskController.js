
const knex = require("../database/knex")
const TaskRepository = require("../repositories/taskRepository/TaskRepository")
const TaskCreateService = require("../services/TaskServices/TaskCreateService")
const TaskDeleteService = require("../services/TaskServices/TaskDeleteService")
const TaskListByIdService = require("../services/TaskServices/TaskListByIdService")
const TaskListService = require("../services/TaskServices/TaskListService")
const TaskUpdateService = require("../services/TaskServices/TaskUpdateService")

const taskRepository = new TaskRepository

const taskCreateService = new TaskCreateService(taskRepository)//------------Criação de Tarefa
const taskListService = new TaskListService(taskRepository)//----------------Listagem de Tarefa
const taskListByIdService = new TaskListByIdService(taskRepository)//--------Listagem por Id
const taskUpdateService = new TaskUpdateService(taskRepository)//------------Updatagem de Tarefas 
const taskDeleteService = new TaskDeleteService(taskRepository)//------------Deletar Tarefas


class TaskController{


    async createTask(req,res){
        const {title, description} = req.body
        const {user_id} = req.params

        const {isCompleted} = false
        
        await taskCreateService.execute({title, description,isCompleted,user_id})

        return res.status(201).json("Tarefa criada com sucesso")
    }

    async listTask(req, res) {
        const tasks = await taskListService.execute()
       return res.status(200).json(tasks)
    }

    async listTaskById(req, res) {
        const {id} = req.params

        const task = await taskListByIdService.execute({id})

        return res.status(200).json(task)
    }

    async updateTask(req, res) {
        const {id} = req.params
        const {title, description} = req.body

        await taskUpdateService.execute({title, description, id})

        return res.status(200).json("Tarefa atualizada com sucesso!")
    }

    async deleteTask(req,res){
        const {id} = req.params

        await taskDeleteService.execute({id})

        return res.status(200).json("Tarefa deletada com sucesso!")

    }

}

module.exports = TaskController