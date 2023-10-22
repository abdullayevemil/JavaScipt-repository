const idArea = document.querySelector('#id');
const nameArea = document.querySelector('#name');
const descriptionArea = document.querySelector('#description');
const completionStatusArea = document.querySelector('#completion-status');
const backButton = document.querySelector('#back');
const editButton = document.querySelector('#edit');
const params = new URLSearchParams(window.location.search);
const taskData = params.get('taskData');
if (taskData === null) {
    alert("Error: 404 not found");
}
else {
    idArea.textContent = taskData.split(',')[0];
    nameArea.value = taskData.split(',')[1];
    descriptionArea.value = taskData.split(',')[2];
    completionStatusArea.textContent = taskData.split(',')[3];
}
editButton.addEventListener('click', () => {
    if (nameArea.value && descriptionArea.value) {
        window.location.href = `../index.html?taskData=${[idArea.textContent, nameArea.value, descriptionArea.value]}`;
    }
    else {
        alert("Invalid data was entered");
    }
});
backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});