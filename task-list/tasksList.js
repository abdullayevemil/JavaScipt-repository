import Task from '../task/task.js'
import { filterList, sortList } from '../index.js'
class TasksList {

    #tasksList;

    #clone;

    #newListItem;

    #listItems;

    constructor() {
        this.#tasksList = [];
        this.#listItems = [];
    }

    get listItems() {
        return this.#listItems.slice(0);
    }

    get tasksList() {
        return this.#tasksList.slice(0);
    }

    createTasksListForJson() {
        const jsonTasks = [];
        this.#tasksList.forEach(task => {
            jsonTasks.push({
                id: task.id,
                name: task.name,
                description: task.description,
                date: task.date,
                completionStatus: task.completionStatus,
            })
        });
        return jsonTasks;
    }

    initializeTasksListFromJson() {
        const dataToLoad = JSON.parse(localStorage.getItem("tasksList"));
        if (dataToLoad === null) {
            return;
        }
        const loadedTasks = dataToLoad.map(e => {
            const task = new Task(e.name, e.description);
            task.id = e.id;
            task.completionStatus = e.completionStatus;
            task.date = e.date;
            return task;
        });
        loadedTasks.forEach(task => this.addTask(task));
    }

    addTask(task) {

        if (!(Task.prototype.isPrototypeOf(task))) {
            throw new Error("Invalid task to add");
        }

        this.#tasksList.push(task);
        this.#clone = createTemplateClone(task, this);
        this.#newListItem = this.#clone.children[0];
        this.#newListItem.children[1].addEventListener('click', () => {
            window.location.href = `../more-details/details.html?taskData=${[task.id, task.name, task.description, task.date, task.completionStatus]}`;
        })
        this.#newListItem.children[3].addEventListener('click', () => {
            window.location.href = `../more-details/details.html?taskData=${[task.id, task.name, task.description, task.date, task.completionStatus]}`;
        })
        tasksList.appendChild(this.#newListItem);
        this.#listItems.push(this.#newListItem);
        filterList();
        sortList();
        localStorage.setItem("tasksList", JSON.stringify(this.createTasksListForJson()));
    }

    removeTask(task) {

        if (!(Task.prototype.isPrototypeOf(task) && typeof task.name === 'string' && typeof task.description === 'string' && task.name && task.description)) {
            throw new Error("Invalid task to remove");
        }
        const index = this.#tasksList.indexOf(task);
        this.#tasksList.splice(index, 1);
        tasksList.removeChild(this.#listItems[index]);
        this.#listItems.splice(index, 1);
        localStorage.setItem("tasksList", JSON.stringify(this.createTasksListForJson()));
    }

    updateTask(task) {
        const index = this.#tasksList.indexOf(this.#tasksList.find(element => element.id === task.id));
        this.#tasksList[index].name = task.name;
        this.#tasksList[index].description = task.description;
        this.#listItems[index].children[1].textContent = task.name;
        localStorage.setItem("tasksList", JSON.stringify(this.createTasksListForJson()));
        filterList();
        sortList();
    }
}
const tasksList = document.querySelector('ul');

const listItemTemplate = document.querySelector('template');
function createTemplateClone(task, tasks) {
    const clone = listItemTemplate.content.cloneNode(true);
    const spans = clone.querySelectorAll("span");
    spans[0].textContent = task.name;
    spans[2].textContent = task.date;
    const buttons = clone.querySelectorAll("button");
    const checkbox = clone.querySelector('input');
    checkbox.addEventListener('click', () => {
        task.invertcompletionStatus();
        filterList();
        sortList();
        localStorage.setItem("tasksList", JSON.stringify(tasks.tasksList));
    });
    buttons[1].addEventListener('click', () => {
        tasks.removeTask(task);
        localStorage.setItem("tasksList", JSON.stringify(tasks.tasksList));
    });
    buttons[0].addEventListener('click', () => {
        window.location.href = `../edit/edit.html?taskData=${[task.id, task.name, task.description, task.completionStatus]}`;
    });
    return clone;
}
export default TasksList;