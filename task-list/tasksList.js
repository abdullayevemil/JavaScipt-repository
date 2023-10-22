import Task from '../task/task.js'
import {filterList, sortList} from '../index.js'
class TasksList {

    #tasksList;

    #clone;

    #newListItem;

    #listItems = [];

    constructor(tasks) {

        if (Array.isArray(tasks) && tasks.every((task) => Task.prototype.isPrototypeOf(task))) {
            this.#tasksList = tasks;
        } else if (Task.prototype.isPrototypeOf(tasks)) {
            this.#tasksList = [tasks];
        } else if (tasks === undefined) {
            this.#tasksList = [];
        }
        else {
            throw new Error("Invalid data was entered!");
        }
    }

    get listItems() {
        return this.#listItems.slice(0);
    }

    get tasksList() {
        return this.#tasksList.slice(0);
    }

    addTask(task) {

        if (!(Task.prototype.isPrototypeOf(task) && typeof task.name === 'string' && task.name && task.description && task.description)) {
            throw new Error("Invalid task to add");
        }

        this.#tasksList.push(task);
        this.#clone = createTemplateClone(task, this);
        this.#newListItem = this.#clone.children[0];
        tasksList.appendChild(this.#newListItem);
        this.#listItems.push(this.#newListItem);
        filterList();
        sortList();
    }

    removeTask(task) {

        if (!(Task.prototype.isPrototypeOf(task) && typeof task.name === 'string' && task.name && task.description && task.description)) {
            throw new Error("Invalid task to remove");
        }
        const index = this.#tasksList.indexOf(task);
        this.#tasksList.splice(index, 1);
        tasksList.removeChild(this.#listItems[index]);
        this.#listItems.splice(index, 1);
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
    });
    buttons[1].addEventListener('click', () => {
        tasks.removeTask(task);
    });
    return clone;
}
export default TasksList;