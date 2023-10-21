import Task from '../task/task.js'
class TasksList {

    #tasksList;

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

    addTask(task) {

        if (!(Task.prototype.isPrototypeOf(task) && typeof task.name === 'string' && task.name && task.description && task.description)) {
            throw new Error("Invalid task to add");
        }

        this.#tasksList.push(task);

    }

    removeTask(task) {

        if (!(Task.prototype.isPrototypeOf(task) && typeof task.name === 'string' && task.name && task.description && task.description)) {
            throw new Error("Invalid task to remove");
        }

        this.#tasksList.splice(this.#tasksList.indexOf(task), 1);

    }

    showAllTasks() {
        return this.#tasksList.slice(0);
    }

    showDoneTasks() {
        return this.#tasksList.find(task => task.isDone() === true);
    }

    showUndoneTasks() {
        return this.#tasksList.find(task => task.isDone() === false);
    }
}
export default TasksList;