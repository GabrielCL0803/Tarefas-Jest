const UserRepositoryInMemory = require("../../repositories/userRepository/userRepositoryInMemory");
const TaskRepositoryInMemory = require("../../repositories/taskRepository/taskRepositoryInMemory");

const UserCreateService = require("../../services/UserServices/UserCreateService");

const TaskCreateService = require("../../services/TaskServices/TaskCreateService");
const TaskListService = require("../../services/TaskServices/TaskListService");

describe("TaskListService", () => {
  let taskRepository = null;
  let taskCreateService = null;
  let userCreateService = null;
  let userRepository = null;
  let taskListService = null;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);

    taskRepository = new TaskRepositoryInMemory();
    taskCreateService = new TaskCreateService(taskRepository);
    taskListService = new TaskListService(taskRepository);
  });

  it("should be able to list Tasks", async () => {
    const user = {
      name: "userTest",
      email: "userTest@gmail.com",
      password: "1234",
    };
    const userCreated = await userCreateService.execute(user);

    const task1 = {
      title: "The test1",
      description: "Book test1, book test1",
      isCompleted: "false",
      user_id: userCreated.user_id,
    };

    const task2 = {
      title: "The test2",
      description: "Book test2, book test2",
      isCompleted: "false",
      user_id: userCreated.user_id,
    };

    await taskCreateService.execute(task1);
    await taskCreateService.execute(task2);

    const list = await taskListService.execute();
    expect(list).toEqual(expect.arrayContaining(list));
  });
});
