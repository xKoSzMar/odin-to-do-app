import { tabDatabase, taskDatabase } from "./database.js";
import taskCard from "./taskCard.js";

const clearBoard = () => {
  while (document.querySelector("#board").lastChild) {
    document.querySelector("#board").lastChild.remove();
  }
};

const getSelectedTabNumberFromDatabase = () => {
  let number = null;

  for (let i = 0; i < tabDatabase.getTabs.length; i++) {
    if (tabDatabase.getTabs[i].className.includes("selected-tab")) {
      number = i;
    }
  }

  return number;
};

const renderTasks = (container, numberOfTasks) => {
  for (let i = 0; i < numberOfTasks; i++) {
    if (
      taskDatabase.getTasks[i].tabID ===
      tabDatabase.getTabs[getSelectedTabNumberFromDatabase()].tabID
    ) {
      container.appendChild(taskCard(taskDatabase.getTasks[i]));
    }
  }
};

const board = (() => {
  const board = document.createElement("div");
  board.id = "board";

  renderTasks(board, taskDatabase.getTasks.length);

  return board;
})();

export { board, clearBoard };
