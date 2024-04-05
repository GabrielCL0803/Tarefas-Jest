class UserDeleteService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async execute({user_id}){
        const userDelete = await this.userRepository.deleteUser({user_id})
        return userDelete
    }
  }
  
  module.exports = UserDeleteService