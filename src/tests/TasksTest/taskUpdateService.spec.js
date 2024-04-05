const UserRepositoryInMemory = require("../../repositories/userRepository/userRepositoryInMemory");
const TaskRepositoryInMemory = require("../../repositories/taskRepository/taskRepositoryInMemory");

const UserCreateService = require("../../services/UserServices/UserCreateService");

const TaskCreateService = require("../../services/TaskServices/TaskCreateService");
const TaskUpdateService = require("../../services/TaskServices/TaskUpdateService");

describe("TaskUpdateService", () => {
  let taskRepository = null;
  let taskCreateService = null;
  let userCreateService = null;
  let userRepository = null;
  let taskUpdateService = null;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);

    taskRepository = new TaskRepositoryInMemory();
    taskCreateService = new TaskCreateService(taskRepository);
    taskUpdateService = new TaskUpdateService(taskRepository);
  });

  it("should be able to update Tasks", async () => {
    const user = {
      name: "userTest",
      email: "userTest@gmail.com",
      password: "1234",
    };
    const userCreated = await userCreateService.execute(user);

    const task = {
      title: "The test",
      description: "Book test, book test",
      user_id: userCreated.user_id,
    };

    const taskCreated = await taskCreateService.execute(task);

    taskCreated.title = "Tarefa atualizada"
    taskCreated.description = "Descrição atualizada"

    const taskUpdated = await taskUpdateService.execute(taskCreated);
    
    expect(taskUpdated).toHaveProperty("title", "Tarefa atualizada");
  });
});
