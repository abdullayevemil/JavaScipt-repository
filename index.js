import TasksList from "./task-list/tasksList.js";
import Task from "./task/task.js"
const filterBy = document.querySelector('select:nth-of-type(2)');
const sortBy = document.querySelector('select:first-of-type');
const addButton = document.querySelector('button:first-of-type');
const tasksList = document.querySelector('ul');
const listItemTemplate = document.querySelector('template');
const tasks = new TasksList();




