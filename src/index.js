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

//works w bug - need separate event for clicking menu
document.querySelector('.listAll').addEventListener('click', function(e) {
    if (e.target.classList.contains('dropdownbtn')) {
        document.querySelector('.dropdown').classList.toggle('showMenu');
    }
});


    
