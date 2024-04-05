const UserListService = require("../../services/UserServices/UserListService");
const userRepositoryInMemory = require("../../repositories/userRepository/userRepositoryInMemory");
const UserCreateServices = require("../../services/UserServices/UserCreateService");

describe("UserListService", () => {
  let userRepository = null;
  let userListService = null;
  let userCreatedService = null;
  it("user should be listed", async () => {
    const user1 = {
      name: "user test",
      email: "usertest@gmail.com",
      password: "123",
    };
    const user2 = {
      name: "user test 2",
      email: "user2@gmail.com",
      password: "321",
    };
    userRepository = new userRepositoryInMemory();
    userCreatedService = new UserCreateServices(userRepository);
    userListService = new UserListService(userRepository);

    await userCreatedService.execute(user1);
    await userCreatedService.execute(user2);

    const listUsers = await userListService.execute();
    expect(listUsers).toEqual(expect.arrayContaining(listUsers));
  });
});
