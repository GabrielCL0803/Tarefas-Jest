class UserUpdateService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async execute({user_id, name, email, password}){
        const userUpdated = await this.userRepository.updateUser({user_id, name, email, password})
        return userUpdated
    }
  }
  
  module.exports = UserUpdateService