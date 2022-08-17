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

function addTasks() {
    const projects = document.querySelectorAll('.project');
       for (let i = 0; i < projects.length; i++){
        if (projects[i].style.display == 'block') {
            let displayedProjectId = projects[i].id;
            let displayedProject = document.querySelector(`#${displayedProjectId}`);
            const addTaskToProject = new CreateTask();
            addTaskToProject.saveTask(displayedProject);
            addTaskToProject.taskList(listAllTasks, addTaskToProject);
            displayedProject.style.display = 'block';
        } else {
            const addTask = new CreateTask();
            addTask.saveTask(listAllTasks);
            listAllTasks.style.display = 'block';
        };
       }
}
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTasks();
});

const cancelTaskBtn = document.querySelector('.cancelbtn');
cancelTaskBtn.addEventListener('click', () => {
    CreateTask.cancelAddTask();
});

function showMenuOfTask(e) {
    if (e.target.classList.contains('dropdownbtn')) {
        e.target.nextElementSibling.classList.toggle('showMenu');
    };
}
document.querySelector('.taskList').addEventListener('click', showMenuOfTask);

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
});

const projectForm = document.querySelector('#projectForm');
projectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const addAProject = new Project();
    addAProject.addProject();
});

const cancelAProjectBtn = document.querySelector('.cancelProject');
cancelAProjectBtn.addEventListener('click', () => {
    Project.cancelAddProject();
});

//bug: 2nd click - task disapppears
document.querySelector('.projectList').addEventListener('click', (e) => {
    Project.displayProject(e);
});




