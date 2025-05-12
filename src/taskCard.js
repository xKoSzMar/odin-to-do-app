import calendarIcon from "./assets/calendar.svg";
import { addTaskEditor, getSelectedTabNumber } from "./main.js";

const invokeTaskEditor = (e) => {
  const tabNumber = getSelectedTabNumber();

  addTaskEditor(
    e.currentTarget.id,
    e.currentTarget.childNodes[0].textContent,
    e.currentTarget.childNodes[1].textContent,
    tabNumber,
    e.currentTarget.childNodes[2].childNodes[3].textContent,
    e.currentTarget.childNodes[2].childNodes[1].textContent
  );
};

const taskCard = (task) => {
  const taskCard = document.createElement("div");
  taskCard.id = task.taskID;
  taskCard.className = "card";
  taskCard.addEventListener("click", invokeTaskEditor);

  // Title
  const title = document.createElement("h2");
  title.textContent = task.title;
  taskCard.appendChild(title);

  // Description
  const description = document.createElement("p");
  description.textContent = task.description;
  taskCard.appendChild(description);

  // Status
  const statusContainer = document.createElement("div");
  statusContainer.id = "status-container";

  const calendar = document.createElement("img");
  calendar.src = calendarIcon;
  calendar.width = "20";
  statusContainer.appendChild(calendar);

  const duePara = document.createElement("p");
  duePara.id = "due-para";
  duePara.textContent = task.dueDate;
  statusContainer.appendChild(duePara);

  const priority = document.createElement("div");
  priority.id = "priority-icon";
  if (task.priority === "Not Important") {
    priority.className = "green";
  } else if (task.priority === "Common") {
    priority.className = "yellow";
  } else if (task.priority === "Important") {
    priority.className = "orange";
  } else if (task.priority === "Very Important") {
    priority.className = "red";
  }

  statusContainer.appendChild(priority);

  const priorityPara = document.createElement("p");
  priorityPara.id = "priority-para";
  priorityPara.textContent = task.priority;
  statusContainer.appendChild(priorityPara);

  taskCard.appendChild(statusContainer);

  return taskCard;
};

export default taskCard;
