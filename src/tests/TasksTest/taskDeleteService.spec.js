const TaskCreateService = require("../../services/TaskServices/TaskCreateService");
const TaskDeleteService = require("../../services/TaskServices/TaskDeleteService");
const TaskListService = require("../../services/TaskServices/TaskListService");

const taskRepositoryinMemory = require("../../repositories/taskRepository/taskRepositoryInMemory");
const UserCreateService = require("../../services/UserServices/UserCreateService");
const userRepositoryInMemory = require("../../repositories/userRepository/userRepositoryInMemory");

describe("TaskDeleteService", () => {
  let taskRepository = null;
  let taskCreateService = null;
  let taskDeleteService = null;
  let taskListService = null;
  let userCreateService = null;
  let userRepository = null;

  taskRepository = new taskRepositoryinMemory();
  taskCreateService = new TaskCreateService(taskRepository);
  taskDeleteService = new TaskDeleteService(taskRepository);
  taskListService = new TaskListService(taskRepository);
  userRepository = new userRepositoryInMemory();
  userCreateService = new UserCreateService(userRepository);

  it("should be able to delete a task", async () => {
    const user = {
      name: "userTest",
      email: "userTest@gmail.com",
      password: "1234",
    };

    const userCreated = await userCreateService.execute(user);

    const task = {
      title: "The test",
      description: "Book test, book test",
      isCompleted: "false",
      user_id: userCreated.user_id,
    };

    await taskCreateService.execute(task);

    await taskDeleteService.execute(task);

    const list = await taskListService.execute();

    expect(list).not.toHaveProperty("title", "The test");
  });
});
