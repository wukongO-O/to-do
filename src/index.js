import './style.css';
import { 
    Task, 
    CreateTask, 
    newTaskTitle, 
    newTaskDes, 
    newTaskDue, 
    newTaskPriority, 
    newTaskStar, 
    listAllTasks
} from './tasks';
import { ListsOfTasks } from './lists';
import { Project } from './projects';

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

function showMenu(e) {
    if (e.target.classList.contains('dropdownbtn')) {
        e.target.nextElementSibling.classList.toggle('showMenu');
    };
}
document.querySelector('.taskList').addEventListener('click', showMenu);

function deleteTask(e) {
    if (e.target.classList.contains('del')) {
        const toDelTask = e.target.parentNode.parentNode;
        const toDelTaskId = toDelTask.className;
        const toDelItems = document.querySelectorAll(`.${toDelTaskId}`);
        localStorage.removeItem(toDelTaskId);
        toDelItems.forEach(item => {
            item.remove();
        })
    }
}
document.querySelector('.taskList').addEventListener('click', deleteTask);

function editTask(e) {
    if (e.target.classList.contains('edit')) {
        const toEdit = e.target.parentNode.parentNode;
        document.getElementById('taskForm').style.display = 'block';
        newTaskTitle.value = toEdit.children[0].children[2].textContent;
        newTaskDes.value = toEdit.children[0].children[3].textContent;
        newTaskDue.value = toEdit.children[0].children[4].textContent;
        newTaskStar.checked = toEdit.children[0].children[5].textContent;
        newTaskPriority.value = toEdit.children[0].children[6].textContent;

        const toEditTaskId = toEdit.className;
        const delItemsToEdit = document.querySelectorAll(`.${toEditTaskId}`);
        localStorage.removeItem(toEditTaskId);
        delItemsToEdit.forEach(item => {
            item.remove();
        })
    }
}
document.querySelector('.taskList').addEventListener('click', editTask);

const taskBtns = document.querySelectorAll('.taskbtn');
taskBtns.forEach(tBtn => {
    tBtn.addEventListener('click', (e) => {
        ListsOfTasks.displayTasks(e);
    })
});

//Project
const addAProjectBtn = document.querySelector('.addProjectBtn');
addAProjectBtn.addEventListener('click', () => {
    Project.showAddProject();
})