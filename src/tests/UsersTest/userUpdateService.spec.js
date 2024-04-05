const UserCreateService = require("../../services/UserServices/UserCreateService");
const userRepositoryInMemory = require("../../repositories/userRepository/userRepositoryInMemory");
const UserUpdateService = require("../../services/UserServices/UserUpdateService");
describe("UserCreateService", () => {
  let userRepository = null;
  let userCreateService = null;
  let userUpdateService = null;

  it("user should be updated", async () => {
    const user = {
      name: "user test",
      email: "usertest@gmail.com",
      password: "123",
    };
    userRepository = new userRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
    userUpdateService = new UserUpdateService(userRepository);
    const userCreated = await userCreateService.execute(user);

    (userCreated.name = "User Update"),
      (userCreated.email = "update@email.com");

    const updatedUser = await userUpdateService.execute(userCreated);

    expect(updatedUser).toHaveProperty("email", "update@email.com");
  });
});
