import TasksList from "./task-list/tasksList.js";
import Task from "./task/task.js"
const filterBy = document.querySelector('select:nth-of-type(2)');
const sortBy = document.querySelector('select:first-of-type');
const addButton = document.querySelector('button:first-of-type');
const tasksList = document.querySelector('ul');
const listItemTemplate = document.querySelector('template');
const tasks = new TasksList();


function createAddForm() {
    const form = document.createElement('form');
    form.appendChild(createAddFieldset());
    return form;
}

function createAddFieldset() {
    const fieldset = document.createElement('fieldset');
    fieldset.appendChild(createLegend("Add"));
    const nameLabel = createLabel('name');
    fieldset.appendChild(nameLabel);
    const descriptionLabel = createLabel('description');
    fieldset.appendChild(descriptionLabel);
    const backButton = createButton('submit', 'Back to Home');
    backButton.addEventListener('click', () => document.body.removeChild(modalWindow));
    const addButton = createButton('submit', 'Add');
    addButton.addEventListener('click', () => {
        console.log(nameLabel.children[0].value,
            descriptionLabel.children[0].value);
        const newTask = new Task(nameLabel.children[0].value, descriptionLabel.children[0].value);
        console.log(tasks);
        const clone = listItemTemplate.content.cloneNode(true);
        const spans = clone.querySelectorAll("span");
        spans[0].textContent = newTask.name;
        spans[2].textContent = newTask.date;
        tasksList.appendChild(clone);
        tasks.addTask(newTask);
        console.log(tasks);
        document.body.removeChild(modalWindow);
    })
    fieldset.appendChild(addButton);
    fieldset.appendChild(backButton);
    return fieldset;
}

function createLegend(formLegend) {
    const legend = document.createElement('legend');
    legend.text = formLegend;
    return legend;
}

function createLabel(text) {
    const label = document.createElement('label');
    label.textContent = text;
    label.appendChild(createInput());
    return label;
}

function createInput() {
    const input = document.createElement('input');
    return input;
}

function createButton(type, text) {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    return button;
}