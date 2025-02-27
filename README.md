# HDM Todo List - Frontend

## Context

This document describes the Frontend portion of the HDM Todo List application project.

## Setup
1. Clone the repository: `git clone https://github.com/ton-utilisateur/hdm-todo-test-web-app.git`
2. Navigate to the project folder: `cd hdm-todo-test-web-app`
3. Install dependencies: `yarn install`
4. Run the app: `yarn start`

## Features Implemented
- Task creation and editing
- Task deletion using backend API
- Managing task state with React Hooks

##  Decisions Made
- Task Management with useState: The tasks array is used to store tasks and is updated after each action (creation, modification, deletion).
- Task Creation and Modification: When modifying a task, a text field is used to enter a new task name. The handleSave function is used to create a new task, and handleUpdateTask is used to update an existing task.
- Task Deletion: Deletion is performed via the handleDelete function, which calls the backend to delete the task and reloads the task list after deletion.

## Issue:
- The POST request to create a new task failed with the error `SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input`. The server was not returning a valid JSON response.
- Newly created tasks did not immediately appear in the task list. The function to update the task list was not called after a new task was created.
- Database Issue.The server was not runing correctly.

## Conclusion:
This project allowed me to better understand how React and NestJS can be used together to create web applications. I was able to understand and implement the basics of task management on both the server-side and client-side.

## Link to Backend Repository
You can find the backend repository here: [HDM Todo List - Backend](https://github.com/akerraf/hdm-todo-test-api)
