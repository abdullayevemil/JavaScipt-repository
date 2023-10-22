import TasksList from "./task-list/tasksList.js";
import Task from "./task/task.js"
const filterBy = document.querySelector('.filterBy');
const sortBy = document.querySelector('.sortBy');
const addButton = document.querySelector('button:first-of-type');
let tasksList = document.querySelector('ul');
const tasks = new TasksList();
tasks.initializeTasksListFromJson();
const modalWindow = createModalWindow();

function createModalWindow() {
    const window = document.createElement('div');
    window.style.backgroundColor = 'grey';
    window.style.width = '100%';
    window.style.height = '100%';
    window.style.position = 'absolute';
    window.style.top = 0;
    window.style.left = 0;
    const modalWindowContent = document.createElement('div');
    modalWindowContent.style.backgroundColor = 'white';
    const form = createAddForm();
    modalWindowContent.appendChild(form);
    window.appendChild(modalWindowContent);
    addButton.addEventListener('click', () => document.body.append(window));
    return window;
}

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
    const backButton = createButton('button', 'Back to Home');
    backButton.addEventListener('click', () => {
        nameLabel.children[0].value = "";
        descriptionLabel.children[0].value = "";
        document.body.removeChild(modalWindow);
    });
    const addButton = createButton('button', 'Add');
    addButton.addEventListener('click', () => {
        try {
            const newTask = new Task(nameLabel.children[0].value, descriptionLabel.children[0].value);
            tasks.addTask(newTask);
            nameLabel.children[0].value = "";
            descriptionLabel.children[0].value = "";
            document.body.removeChild(modalWindow);
        } catch (error) {
            alert(error);
        }
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

filterBy.addEventListener('change', () => {
    filterList();
    sortList();
});
sortBy.addEventListener('change', () => {
    filterList();
    sortList();
});

export function filterList() {
    const option = filterBy.value;
    if (option === "All") {
        tasksList.replaceChildren();
        tasks.listItems.forEach(item => tasksList.appendChild(item));
    }
    else if (option === "Done") {
        const items = tasks.listItems.filter(li => li.children[0].checked === true);
        tasksList.replaceChildren();
        items.forEach(item => tasksList.appendChild(item));
    }
    else if (option === "Undone") {
        const items = tasks.listItems.filter(li => li.children[0].checked === false);
        tasksList.replaceChildren();
        items.forEach(item => tasksList.appendChild(item));
    }
}

export function sortList() {
    const option = sortBy.value;
    if (option === "Name") {
        const items = [...tasksList.children].slice(0).sort((firstLi, secondLi) => firstLi.children[1].textContent.localeCompare(secondLi.children[1].textContent));
        tasksList.replaceChildren();
        items.forEach(item => tasksList.appendChild(item));
    }
    else if (option === "Date") {
        const items = [...tasksList.children].slice(0).sort((firstLi, secondLi) => secondLi.children[3].textContent.localeCompare(firstLi.children[3].textContent));
        tasksList.replaceChildren();
        items.forEach(item => tasksList.appendChild(item));
    }
}

const params = new URLSearchParams(window.location.search);
const taskData = params.get('taskData');
if (taskData !== null) {
    tasks.updateTask({
        id: taskData.split(',')[0],
        name: taskData.split(',')[1],
        description: taskData.split(',')[2]
    });
}