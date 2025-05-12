import plusIcon from "./assets/plus.svg";
import { board, clearBoard } from "./board.js";
import taskCard from "./taskCard.js";
import taskEditor from "./taskEditor.js";
import { taskDatabase } from "./database.js";

const removeTaskEditor = () => document.querySelector("#task-editor").remove();

const addTaskEditor = (
  cardID,
  title,
  description,
  tabNumber,
  priority,
  dueDate
) => {
  if (document.querySelectorAll(".tab").length > 0) {
    if (document.querySelector("#task-editor")) {
      removeTaskEditor();
    }

    document
      .querySelector("#main-container")
      .appendChild(
        taskEditor(cardID, title, description, tabNumber, priority, dueDate)
      );
  }
};

const addCards = (id) => {
  clearBoard();

  for (let i = 0; i < taskDatabase.getTasks.length; i++) {
    if (taskDatabase.getTasks[i].tabID === id) {
      document
        .querySelector("#board")
        .appendChild(taskCard(taskDatabase.getTasks[i]));
    }
  }
};

const getSelectedTabNumber = () => {
  let number = 0;

  for (let i = 0; i < document.querySelectorAll(".tab").length; i++) {
    if (
      document.querySelectorAll(".tab")[i].classList.contains("selected-tab")
    ) {
      number = i;
    }
  }

  return number;
};

const mainContainer = (() => {
  // Main container
  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";

  // Add task button
  const addTaskContainer = document.createElement("div");
  addTaskContainer.id = "add-task";
  addTaskContainer.addEventListener("click", () =>
    addTaskEditor(addTaskContainer.id, "", "", getSelectedTabNumber(), "Common")
  );

  const plusImg = document.createElement("img");
  plusImg.src = plusIcon;
  plusImg.width = "50";

  addTaskContainer.appendChild(plusImg);
  mainContainer.appendChild(addTaskContainer);

  mainContainer.appendChild(board);

  return mainContainer;
})();

export {
  mainContainer,
  removeTaskEditor,
  addTaskEditor,
  addCards,
  getSelectedTabNumber,
};
