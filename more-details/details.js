const idArea = document.querySelector('#id');
const nameArea = document.querySelector('#name');
const dateArea = document.querySelector('#date');
const descriptionArea = document.querySelector('#description');
const completionStatusArea = document.querySelector('#completion-status');
const backButton = document.querySelector('#back');
const params = new URLSearchParams(window.location.search);
const taskData = params.get('taskData');
if (taskData === null) {
    alert("Error: 404 not found");
}
else {
    idArea.textContent = taskData.split(',')[0];
    nameArea.textContent = taskData.split(',')[1];
    descriptionArea.textContent = taskData.split(',')[2];
    dateArea.textContent = taskData.split(',')[3];
    completionStatusArea.textContent = taskData.split(',')[4];
}
backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});