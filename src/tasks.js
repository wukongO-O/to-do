import { compareAsc, format, parseISO } from 'date-fns'

class Task {
    constructor(taskTitle, taskDescription, dueDate, priority, starred) {
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.dueDate = dueDate
        this.priority = priority
        this.starred = starred
    }
}

//create new task as object + save each object to localStorage
//make taskform visible -> submit or cancel the form -> a) if cancelled: hidden the form b) if submitted: display form data + another layer of functions after task/elements created by DOM (delete + edit)
let allTasks = [];
const newTaskTitle = document.querySelector('#taskTitle');
const newTaskDes = document.querySelector('#taskDes');
const newTaskDue = document.querySelector('#dueDate');
const newTaskStar = document.getElementById('starredTask')
const newTaskPriority = document.querySelector('.priority');

class CreateTask extends Task{
    constructor(taskTitle, taskDescription, dueDate, priority, starred) {
        super(taskTitle, taskDescription, dueDate, priority, starred)
    }
    static showAddTask() {
        var taskForm = document.querySelector('#taskForm');
        return taskForm.style.display = "block";
    }

    static cancelAddTask() {
        return document.querySelector('#taskForm').style.display = "none";
    }

    formattedToday() {
        const today = new Date()
        return today.setHours(0, 0, 0, 0);
    }

    formattedDue() {
        const formatDue = parseISO(`${newTaskDue.value}`);
        return formatDue.setHours(0, 0, 0, 0);
    }

    taskList(list) {
        list.innerHTML += `
        <ul class='task'> 
            <input name='newT' type='checkbox' id='newTask'>
            <label for='newTask'></label>    
            <li class='ttitle'> ${newTaskTitle.value} </li>
            <li class='tdescription'> ${newTaskDes.value} </li>
            <li class='tdue'> ${newTaskDue.value} </li>
            <li class='tstar'> ${newTaskStar.checked} </li>
            <li class='tpriority'> ${newTaskPriority.value} </li>
        </ul> 
        <div>    
            <button class='dropdownbtn'> Menu </button>
            <div class='dropdown'>
                <button> Edit </button>
                <button> Delete </button>
            </div>
        </div>
        `;
    }

    categorizeTask() {
//categorize the task to a list based on duedate --to do: (set in localstorage +) assign to display under corresponding tabs - hidden until clicked - show in another function/click event 
        const listToday = document.querySelector('.listToday');
        const listUpcoming = document.querySelector('.listUpcoming');
        const listStarred = document.querySelector('.listStarred');
         if (compareAsc(this.formattedDue(), this.formattedToday()) == 0) {
             this.taskList(listToday);
             //listToday.style.display = 'block';
         } else if (compareAsc(this.formattedDue(), this.formattedToday()) == 1) {
             this.taskList(listUpcoming);
         } 
         if (newTaskStar.checked == true) {
             this.taskList(listStarred);
         } 
    }

/* this function is not working right
    taskMenuBtn() {
        const showDropdown = document.querySelector('.dropdownbtn');
        showDropdown.addEventListener('click', () => {
            document.querySelector('.dropdown').classList.toggle('show');
        });
    }
*/
    saveTask() {
        //create a task in all tasks by default
        if (newTaskTitle.value.length < 1) return;
        
        const listAllTasks = document.querySelector('.listAll');
        this.taskList(listAllTasks);
        let aTask = {
            taskTitle: newTaskTitle.value,
            taskDescription: newTaskDes.value,
            dueDate: newTaskDue.value,
            starred: newTaskStar.checked,
            priority: newTaskPriority.value,
        };
        let aTask_serial = JSON.stringify(aTask);
        localStorage.setItem('newTask', aTask_serial);

        //save each new task to an array in local storage
        allTasks[allTasks.length] = JSON.parse(localStorage.newTask); 
        let allTasks_serial = JSON.stringify(allTasks);
        localStorage.setItem('allTasks', allTasks_serial);

        this.categorizeTask();

        newTaskTitle.value = '';
        newTaskDes.value = '';
        newTaskDue.value = '';
        newTaskStar.checked = false;
        newTaskPriority.value = '';

        taskForm.style.display = 'none';
        listAllTasks.style.display = 'block';
    }
}

class TaskMenu extends CreateTask {
    //create & append a delete button
    constructor(taskTitle, taskDescription, dueDate, priority, starred) {
        super(taskTitle, taskDescription, dueDate, priority, starred)
    }
     


    menu() {
        const tspan = document.createElement('span');
        newTaskName.appendChild(tspan);
        const tmenu = document.createElement('button');
        tmenu.classList.add('menuBtn');
        tspan.appendChild(tmenu);
        const dropdownM = document.createElement('div');
        dropdownM.classList.add('menuContent');
        tspan.appendChild(dropdownM);
        const deletebtn = document.createElement(button);
        deletebtn.classList.add('deleteBtn');
        dropdownM.appendChild(deletebtn);
        const editbtn = document.createElement(button);
        editbtn.classList.add('editBtn');
        dropdownM.appendChild(editbtn);
    }

    toggleMenu(){
        dropdownM.classList.toggle('show');
    }

    deleteTask(){
        deletebtn.addEventListener('click', function() {
            const toDel = this.parentElement.parentElement.parentElement;
            toDel.style.display = 'none';
            tasksection.removeChild(toDel);
        })
    }
    
    editTask() {
        document.getElementById('taskForm').removeAttribute('disabled');
        showAddTask();
    }

}

export { Task, CreateTask, TaskMenu };
