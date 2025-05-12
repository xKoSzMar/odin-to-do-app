class Task {
  taskID = self.crypto.randomUUID();

  constructor(title, description, tabID, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.tabID = tabID;
    this.priority = priority;
    this.dueDate = dueDate;
  }
}

class TaskDatabase {
  #taskDatabase = JSON.parse(localStorage.getItem("taskDatabase")) || [];

  addTask(title, description, tabID, priority, dueDate) {
    this.#taskDatabase.push(
      new Task(title, description, tabID, priority, dueDate)
    );
  }

  updateTask(cardID, title, description, tabID, priority, dueDate) {
    for (let i = 0; i < this.#taskDatabase.length; i++) {
      if (this.#taskDatabase[i].taskID === cardID) {
        this.#taskDatabase[i].title = title;
        this.#taskDatabase[i].description = description;
        this.#taskDatabase[i].tabID = tabID;
        this.#taskDatabase[i].priority = priority;
        this.#taskDatabase[i].dueDate = dueDate;
      }
    }
  }

  deleteTask(id) {
    this.#taskDatabase.splice(id, 1);
  }

  get getTasks() {
    return this.#taskDatabase;
  }
}

class Tab {
  constructor(tabID, className, name) {
    this.tabID = tabID;
    this.className = className;
    this.name = name;
  }
}

class TabDatabase {
  #tabDatabase = JSON.parse(localStorage.getItem("tabDatabase")) || [
    {
      tabID: self.crypto.randomUUID(),
      className: "tab selected-tab",
      name: "My To Do List",
    },
  ];

  addTab(tabID, className, name) {
    this.#tabDatabase.push(new Tab(tabID, className, name));
  }

  deleteTab(id) {
    this.#tabDatabase.splice(id, 1);
  }

  get getTabs() {
    return this.#tabDatabase;
  }
}

window.addEventListener("beforeunload", () => {
  localStorage.setItem("tabDatabase", JSON.stringify(tabDatabase.getTabs));
  localStorage.setItem("taskDatabase", JSON.stringify(taskDatabase.getTasks));
});

const taskDatabase = new TaskDatabase();
const tabDatabase = new TabDatabase();

export { taskDatabase, tabDatabase };
