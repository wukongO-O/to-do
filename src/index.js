import './style.css';
import { 
    Task, 
    CreateTask, 
    TaskMenu, 
    newTaskTitle, 
    newTaskDes, 
    newTaskDue, 
    newTaskPriority, 
    newTaskStar 
} from './tasks';
import { ListsOfTasks } from './lists';

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
document.querySelector('.listAll').addEventListener('click', showMenu);

function deleteTask(e) {
    if (e.target.classList.contains('del')) {
        const toDelTask = e.target.parentNode.parentNode;
        const deleteStoredItem = toDelTask.children[0].children[2].textContent;
        localStorage.removeItem(deleteStoredItem);
        toDelTask.innerHTML = '';
        //need to delete the same task in other lists
    }
}
document.querySelector('.listAll').addEventListener('click', deleteTask);

function editTask(e) {
    if (e.target.classList.contains('edit')) {
//form populated w the e.target info -> remove the e.target from display & all lists & local storage -> saveTask function
        const toEdit = e.target.parentNode.parentNode;
        document.getElementById('taskForm').style.display = 'block';
        newTaskTitle.value = toEdit.children[0].children[2].textContent;
        newTaskDes.value = toEdit.children[0].children[3].textContent;
        newTaskDue.value = toEdit.children[0].children[4].textContent;
        newTaskStar.checked = toEdit.children[0].children[5].textContent;
        newTaskPriority.value = toEdit.children[0].children[6].textContent;

        const delToEdit = toEdit.children[0].children[2].textContent;
        localStorage.removeItem(delToEdit);
        toEdit.innerHTML = '';
//need to delete the same task in other lists
    }
}

document.querySelector('.listAll').addEventListener('click', editTask);

const taskBtns = document.querySelectorAll('.taskbtn');
taskBtns.forEach(tBtn => {
    tBtn.addEventListener('click', (e) => {
        ListsOfTasks.displayTasks(e);
    })
});
//document.querySelector('.taskbtn .active').click();