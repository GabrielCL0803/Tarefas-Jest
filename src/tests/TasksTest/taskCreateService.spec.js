const TasksCreateService = require("../../services/TaskServices/TaskCreateService");
const taskRepositoryinMemory = require("../../repositories/taskRepository/taskRepositoryInMemory");
const UserCreateServices = require("../../services/UserServices/UserCreateService");
const userRepositoryInMemory = require("../../repositories/userRepository/userRepositoryInMemory");

describe("TaskCreateService", () => {
  let TaskRepository = null;
  let taskCreateService = null;
  let userCreateService = null;
  let UserRepository = null;

  TaskRepository = new taskRepositoryinMemory();
  taskCreateService = new TasksCreateService(TaskRepository);
  UserRepository = new userRepositoryInMemory();
  userCreateService = new UserCreateServices(UserRepository);

  const user = {
    name: "userTest",
    email: "userTest@gmail.com",
    password: "1234",
  };

  const userCreated = userCreateService.execute(user);

  it("task should be created", async () => {
    const task = {
      title: "The test",
      description: "Book test, book test",
      isCompleted: "false",
      user_id: userCreated.user_id,
    };

    const taskCreated = await taskCreateService.execute(task);
    expect(taskCreated).toHaveProperty("user_id", userCreated.user_id);
  });
});
