# The Odin Project 11 - odin-to-do-app

This is the eleventh project from The Odin Project curriculum.

## Description

This application is built using Webpack, leveraging clean HTML, CSS, and JavaScript. All application logic is implemented in JavaScript components, accompanied by a single `index.css` file for styling.

Upon launching the application, a window resembling a simplified web browser interface appears. It features a tab bar where tabs can be added, removed, or renamed via double-clicking. Each tab serves as a distinct category for tasks, ensuring tasks are added only to one tab.

Tasks can be added using a circular button with a yellow background located at the bottom right of the screen. Clicking this button opens a task input box that occupies one-third of the content width, housing a form with the following elements:

1. Input field for the task title
2. Textarea for task description
3. Select boxes for:

   - The tab to assign the task
   - Task priority (Not Important, Common, Important, Very Important)

4. Calendar for selecting the task due date

Depending on whether the box is invoked by clicking the plus button or an existing task tab, the button content in form differs:

- For the plus button: "Save task" and "Cancel"
- For an existing task tab: "Save task", "Delete task", and "Cancel"

Saving or updating a task triggers a validation function to ensure the title and description fields are not empty. If either is empty, the task cannot be added or updated, and placeholders prompt the user to fill them.

Added tasks are represented as cards displaying:

1. Task title
2. Description
3. Calendar icon with the selected due date
4. Dot indicating task priority (color-coded: green, yellow, orange, and red) and priority level paragraph.

The application utilizes two local databases objects implemented as JavaScript component: one for tabs and another for tasks. Both are arrays of objects created with class containing information about existing tabs and tasks. Upon initialization, the application retrieves data from 'localStorage' into these arrays. On page refresh or tab closure, the contents of both arrays are stored back into 'localStorage', ensuring data persistence across sessions.

## Technologies

- HTML
- CSS
- JavaScript
- Webpack

## Scripts

Build the app:

> npm run build

Run dev environment (live server):

> npm run dev
