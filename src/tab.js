import crossIcon from "./assets/cross.svg";
import { tabDatabase, taskDatabase } from "./database.js";
import { addCards, removeTaskEditor } from "./main.js";
import { clearBoard } from "./board.js";

const deleteTab = (e) => {
  // Delete all tasks related to the tab
  for (let i = 0; i < taskDatabase.getTasks.length; i++) {
    if (taskDatabase.getTasks[i].tabID === e.currentTarget.parentElement.id) {
      taskDatabase.deleteTask(i);
    }
  }

  // Delete tab
  for (let i = 0; i < tabDatabase.getTabs.length; i++) {
    if (tabDatabase.getTabs[i].tabID === e.currentTarget.parentElement.id) {
      tabDatabase.deleteTab(i);
    }
  }

  if (e.currentTarget.parentElement.classList.contains("selected-tab")) {
    clearBoard();
  }

  e.currentTarget.parentElement.remove();
};

const changeParaToInput = (e) => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = e.target.textContent;
  input.addEventListener("focusout", changeInputToPara);

  e.target.parentElement.replaceChild(input, e.target);
  input.focus();
};

const changeInputToPara = (e) => {
  for (let i = 0; i < tabDatabase.getTabs.length; i++) {
    if (tabDatabase.getTabs[i].tabID === e.currentTarget.parentElement.id) {
      tabDatabase.getTabs[i].name = e.currentTarget.value;
    }
  }

  const p = document.createElement("p");
  p.textContent = e.currentTarget.value;
  p.addEventListener("dblclick", changeParaToInput);

  e.currentTarget.parentElement.replaceChild(p, e.currentTarget);
};

const selectTab = (e) => {
  if (document.querySelector("#task-editor")) {
    removeTaskEditor();
  }

  if (e.target.tagName !== "IMG") {
    uncheckNotSelectedTabs(e.currentTarget.id);

    for (let i = 0; i < tabDatabase.getTabs.length; i++) {
      if (tabDatabase.getTabs[i].tabID === e.currentTarget.id) {
        tabDatabase.getTabs[i].className = "tab selected-tab";
      }
    }

    e.currentTarget.classList.add("selected-tab");
    addCards(e.currentTarget.id);
  }
};

const uncheckNotSelectedTabs = (id) => {
  for (let i = 0; i < document.querySelectorAll(".tab").length; i++) {
    if (
      document.querySelectorAll(".tab")[i].id !== id &&
      document.querySelectorAll(".tab")[i].classList.contains("selected-tab")
    ) {
      tabDatabase.getTabs[i].className = "tab";
      document.querySelectorAll(".tab")[i].classList.remove("selected-tab");
    }
  }
};

const createTab = (tabID, className, name) => {
  const tab = document.createElement("div");
  tab.className = className;
  tab.id = tabID;
  tab.addEventListener("click", selectTab);
  uncheckNotSelectedTabs(tab.id);

  const p = document.createElement("p");
  p.textContent = name;
  p.addEventListener("dblclick", changeParaToInput);

  const imgContainer = document.createElement("div");
  imgContainer.className = "delete-tab";
  imgContainer.addEventListener("click", deleteTab);

  const img = document.createElement("img");
  img.width = "20";
  img.src = crossIcon;

  imgContainer.appendChild(img);

  tab.appendChild(p);
  tab.appendChild(imgContainer);

  return tab;
};

export default createTab;
