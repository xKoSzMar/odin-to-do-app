import plusIcon from "./assets/plus.svg";
import createTab from "./tab.js";
import { clearBoard } from "./board.js";
import { tabDatabase } from "./database.js";
import { removeTaskEditor } from "./main.js";

const addTab = () => {
  if (document.querySelector("#task-editor")) {
    removeTaskEditor();
  }

  clearBoard();

  for (let i = 0; i < tabDatabase.getTabs.length; i++) {
    tabDatabase.getTabs[i].className = "tab";
  }

  const tabID = self.crypto.randomUUID();
  const className = "tab selected-tab";
  const name = "New Tab";

  tabDatabase.addTab(tabID, className, name);

  document
    .querySelector("#nav-container")
    .insertBefore(
      createTab(tabID, className, name),
      document.querySelector("#add-tab")
    );
};

const renderTabs = (container, numberOfTabs) => {
  for (let i = 0; i < numberOfTabs; i++) {
    container.appendChild(
      createTab(
        tabDatabase.getTabs[i].tabID,
        tabDatabase.getTabs[i].className,
        tabDatabase.getTabs[i].name
      )
    );
  }
};

const tabNav = (() => {
  // Navigation Container
  const navContainer = document.createElement("div");
  navContainer.id = "nav-container";

  // Render Tab
  renderTabs(navContainer, tabDatabase.getTabs.length);

  // Button Adding Tabs
  const addTabButton = document.createElement("div");
  addTabButton.id = "add-tab";
  addTabButton.addEventListener("click", addTab);

  const plusImg = document.createElement("img");
  plusImg.width = "20";
  plusImg.src = plusIcon;

  addTabButton.appendChild(plusImg);
  navContainer.appendChild(addTabButton);

  return navContainer;
})();

export default tabNav;
