import { taskDatabase } from "./database.js";
import { removeTaskEditor, addCards } from "./main.js";

const createInput = (id, name, type) => {
  const input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = type;

  return input;
};

const createSelect = (id, labelName, name, range) => {
  const container = document.createElement("div");
  container.id = `${id}-container`;

  const label = document.createElement("label");
  label.textContent = labelName;
  label.setAttribute("for", id);
  container.appendChild(label);

  const select = document.createElement("select");
  select.id = id;
  select.name = name;

  for (let i = 0; i < range.length; i++) {
    const option = document.createElement("option");
    option.value = range[i];
    option.textContent = range[i];

    select.appendChild(option);
  }

  container.appendChild(select);

  return container;
};

const createButton = (id, text) => {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  button.type = "button";

  return button;
};

const getOptionID = () => {
  let optionID = 0;

  for (let i = 0; i < document.querySelector("#tab-select").length; i++) {
    if (document.querySelector("#tab-select")[i].selected) {
      optionID = i;
    }
  }

  return optionID;
};

const validateForm = () => {
  let error = false;
  const titleInput = document.querySelector("#task-title");
  const descriptionInput = document.querySelector("#task-description");

  if (titleInput.value === "") {
    titleInput.placeholder = "You have to enter the title!";
    error = true;
  }

  if (descriptionInput.value === "") {
    descriptionInput.placeholder = "You have to enter description!";
    error = true;
  }

  return error;
};

const createTask = () => {
  if (!validateForm()) {
    const optionID = getOptionID();

    taskDatabase.addTask(
      document.querySelector("#task-title").value,
      document.querySelector("#task-description").value,
      document.querySelectorAll(".tab")[optionID].id,
      document.querySelector("#priority-select").value,
      document.querySelector("#due-input").value
    );

    if (document.querySelectorAll(".selected-tab")[0]) {
      if (
        document.querySelectorAll(".selected-tab")[0].id ===
        document.querySelectorAll(".tab")[optionID].id
      ) {
        addCards(document.querySelectorAll(".selected-tab")[0].id);
      }
    }

    removeTaskEditor();
  }
};

const updateTask = (cardID) => {
  if (!validateForm()) {
    const optionID = getOptionID();

    taskDatabase.updateTask(
      cardID,
      document.querySelector("#task-title").value,
      document.querySelector("#task-description").value,
      document.querySelectorAll(".tab")[optionID].id,
      document.querySelector("#priority-select").value,
      document.querySelector("#due-input").value
    );

    addCards(document.querySelectorAll(".selected-tab")[0].id);

    removeTaskEditor();
  }
};

const deleteTask = (cardID) => {
  for (let i = 0; i < taskDatabase.getTasks.length; i++) {
    if (taskDatabase.getTasks[i].taskID === cardID) {
      taskDatabase.deleteTask(i);
    }
  }

  const optionID = getOptionID();

  if (
    document.querySelectorAll(".selected-tab")[0].id ===
    document.querySelectorAll(".tab")[optionID].id
  ) {
    addCards(document.querySelectorAll(".selected-tab")[0].id);
  }

  removeTaskEditor();
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth =
    currentDate.getMonth() + 1 < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;
  const currentDay =
    currentDate.getDate() < 10
      ? `0${currentDate.getDate()}`
      : currentDate.getDate();

  return `${currentYear}-${currentMonth}-${currentDay}`;
};

const taskEditor = (
  cardID,
  title,
  description,
  tabNumber,
  priority,
  dueDate
) => {
  const taskEditor = document.createElement("div");
  taskEditor.id = "task-editor";

  // Form
  const form = document.createElement("form");

  // Heading
  const heading = document.createElement("h2");
  heading.textContent = "Task:";
  form.appendChild(heading);

  // Title input
  const titleInput = createInput("task-title", "title", "text");
  titleInput.placeholder = "Title";
  titleInput.value = title;
  form.appendChild(titleInput);

  // Description input
  const desInput = document.createElement("textarea");
  desInput.id = "task-description";
  desInput.name = "description";
  desInput.placeholder = "Description";
  desInput.value = description;
  form.appendChild(desInput);

  // Tab select
  const tabArr = [];
  for (let i = 0; i < document.querySelectorAll(".tab").length; i++) {
    tabArr.push(document.querySelectorAll(".tab")[i].textContent);
  }

  const tabSelect = createSelect("tab-select", "Tab", "tab", tabArr);
  tabSelect.lastChild.childNodes[tabNumber].selected = true;
  form.appendChild(tabSelect);

  // Priority select
  const prioArr = ["Not Important", "Common", "Important", "Very Important"];
  const prioritySelect = createSelect(
    "priority-select",
    "Priority",
    "priority",
    prioArr
  );

  prioritySelect.lastChild.childNodes[
    prioArr.indexOf(priority)
  ].selected = true;
  form.appendChild(prioritySelect);

  // Due date input
  const dueContainer = document.createElement("div");
  dueContainer.id = "due-date";

  const dueLabel = document.createElement("label");
  dueLabel.textContent = "Due date";
  dueLabel.setAttribute("for", "due-input");
  dueContainer.appendChild(dueLabel);

  const dateInput = createInput("due-input", "due", "date");
  cardID === "add-task"
    ? (dateInput.value = getCurrentDate())
    : (dateInput.value = dueDate);

  dueContainer.appendChild(dateInput);

  form.appendChild(dueContainer);

  // Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "button-container";

  const saveButton = createButton("save-button", "Save task");
  cardID === "add-task"
    ? saveButton.addEventListener("click", createTask)
    : saveButton.addEventListener("click", () => updateTask(cardID));

  buttonContainer.appendChild(saveButton);

  if (cardID !== "add-task") {
    const deleteButton = createButton("delete-button", "Delete task");
    deleteButton.addEventListener("click", () => deleteTask(cardID));
    buttonContainer.appendChild(deleteButton);
  }

  const cancelButton = createButton("cancel-button", "Cancel");
  cancelButton.addEventListener("click", removeTaskEditor);
  buttonContainer.appendChild(cancelButton);

  form.appendChild(buttonContainer);

  taskEditor.appendChild(form);

  return taskEditor;
};

export default taskEditor;
