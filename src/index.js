import './style.css';
import { Task, CreateTask, TaskMenu } from './tasks';

const addATaskBtn = document.querySelector('.addATask');
addATaskBtn.addEventListener('click', () => {
    CreateTask.showAddTask();
});

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const addTask = new CreateTask();
    addTask.saveTask();

}, false);

const cancelTaskBtn = document.querySelector('.cancelbtn');
cancelTaskBtn.addEventListener('click', () => {
    CreateTask.cancelAddTask();
});

document.querySelector('.listAll').addEventListener('click', function(e) {
    if (e.target.classList.contains('dropdownbtn')) {
        e.target.nextElementSibling.classList.toggle('showMenu');
    }
});

document.querySelector('.listAll').addEventListener('click', function(e) {
    if (e.target.classList.contains('del')) {
        const toDelTask = e.target.parentNode.parentNode;
        const deleteStoredItem = toDelTask.children[0].children[2].textContent;
        localStorage.removeItem(deleteStoredItem);
        toDelTask.innerHTML = '';
    }
})