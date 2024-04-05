const knex = require("../database/knex")
const UserRepository = require("../repositories/userRepository/userRepository")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserListService = require("../services/UserServices/UserListService")
const UserListById = require("../services/UserServices/UserListByIdService")
const UserUpdateService = require("../services/UserServices/UserUpdateService")
const UserDeleteService = require("../services/UserServices/UserDeleteService")


const userRepository = new UserRepository
const userCreateService = new UserCreateService(userRepository)//---------Criação de Usuário
const userListService = new UserListService(userRepository)//-------------Listagem de todos os Usuários
const userListByIdService = new UserListById(userRepository)//------------Listagem por Id
const userUpdateService = new UserUpdateService(userRepository)//---------Atualização de dados do Usuário
const userDeleteService = new UserDeleteService(userRepository)//---------Deletar Usuário

class UserController{
    async createUser(req,res){
        const {name, email, password} = req.body
        
        await userCreateService.execute({name, email, password})

        return res.status(201).json("Usuário cadastrado com sucesso")
    }

    async listUser(req,res){
       const users = await userListService.execute()
       return res.status(200).json(users)
    }

    async listUserById(req,res){
        const {user_id} = req.params

        const user = await userListByIdService.execute({user_id})

        return res.status(200).json(user)
    }

    async updateUser(req,res){
        const {user_id} = req.params
        const {name, email, password} = req.body

        await userUpdateService.execute({name, email, password, user_id})

        return res.status(200).json("Usuário atualizado com sucesso!")
    }
    async updateUserAdmin(req,res){
        const {user_id} = req.params

        await knex("users").where({id:user_id}).update({isAdmin:true})

        return res.status(200).json("Usuário agora é um adiministrador!")
    }

    async deleteUser(req,res){
    const {user_id} = req.params
    
    await userDeleteService.execute({user_id})

        return res.status(200).json("Registro deletado com sucesso!")
    }

}
module.exports = UserController