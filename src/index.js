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


const taskLists = document.querySelector('.taskList');
taskLists.addEventListener('click', (e) => {
    if (e.target.classList.contains('addATask')) {
        CreateTask.showAddTask();
    }
});

function addTasks() {
    const projects = document.querySelectorAll('.project');
    for (let j = 0; j < projects.length; j++) {
        if (projects[j].style.display == 'block') {
            let displayedProject = document.getElementById(`${projects[j].id}`);
            const addTask = new CreateTask();
            addTask.saveTask(displayedProject, `${projects[j].id}`);
            const currentTask = displayedProject.lastElementChild;
            const cloneTask = currentTask.cloneNode(true);
            listAllTasks.appendChild(cloneTask);
            ListsOfTasks.clearTaskDisplay();
            displayedProject.style.display = 'block';
        } else {
            const linkedProject = document.getElementById(`${taskForm.className}`);
            const addTask2 = new CreateTask();
            addTask2.saveTask(linkedProject, `${taskForm.className}`);
            const cloneTask2 = linkedProject.lastElementChild.cloneNode(true);
            listAllTasks.appendChild(cloneTask2);
        }
    }  
    taskForm.removeAttribute('class');
}
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTasks();
});

const cancelTaskBtn = document.querySelector('.cancelbtn');
cancelTaskBtn.addEventListener('click', () => {
    CreateTask.cancelAddTask();
});

function showDropdownMenu(e) {
    if (e.target.classList.contains('dropdownbtn')) {
        e.target.nextElementSibling.classList.toggle('showMenu');
    };
}
taskLists.addEventListener('click', showDropdownMenu);

function deleteTask(e) {
    if (e.target.classList.contains('del')) {
        const toDelTask = e.target.parentNode.parentNode;
        const toDelTaskId = toDelTask.classList.item(0);
        const toDelItems = document.querySelectorAll(`.${toDelTaskId}`);
        localStorage.removeItem(toDelTaskId);
        toDelItems.forEach(item => {
            item.remove();
        });
    }
}
taskLists.addEventListener('click', deleteTask);

function editTask(e) {
    if (e.target.classList.contains('edit')) {
        CreateTask.showAddTask();
        const toEdit = e.target.parentNode.parentNode;
        newTaskTitle.value = toEdit.children[0].children[2].textContent;
        newTaskDes.value = toEdit.children[0].children[3].textContent;
        newTaskDue.value = toEdit.children[0].children[4].textContent;
        newTaskStar.checked = toEdit.children[0].children[5].textContent;
        newTaskPriority.value = toEdit.children[0].children[6].textContent;
        const inProject = toEdit.classList.item(1);
        taskForm.classList.add(`${inProject}`);

        const toEditTaskId = toEdit.classList.item(0);
        const delItemsToEdit = document.querySelectorAll(`.${toEditTaskId}`);
        localStorage.removeItem(toEditTaskId);
        delItemsToEdit.forEach(item => {
            item.remove();
        });

        document.querySelector('.cancelbtn').type = 'submit';
        }
}
taskLists.addEventListener('click', editTask);

const taskBtns = document.querySelectorAll('.taskbtn');
taskBtns.forEach(tBtn => {
    tBtn.addEventListener('click', (e) => {
        ListsOfTasks.displayTasks(e);
    })
})

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

const projectMenus = document.querySelector('.projectList');
projectMenus.addEventListener('click', (e) => {
    Project.displayProject(e);
    Project.editProject(e);
    Project.deleteProject(e);
    showDropdownMenu(e);
});



