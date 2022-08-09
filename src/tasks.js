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
        <div class='${list.className}'>
            <ul class='task'> 
                <input name='newT' type='checkbox' id='newTask'>
                <label for='newTask'></label>    
                <li class='ttitle'>${newTaskTitle.value}</li>
                <li class='tdescription'>${newTaskDes.value}</li>
                <li class='tdue'>${newTaskDue.value}</li>
                <li class='tstar'>${newTaskStar.checked}</li>
                <li class='tpriority'>${newTaskPriority.value}</li>
            </ul> 
            <button class='dropdownbtn'> Menu </button>
            <div class='dropdown'>
                    <button class='edit'> Edit </button>
                    <button class='del'> Delete </button>
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

    saveTask() {
        //create a task in all tasks by default
        if (newTaskTitle.value.length < 1) return;
        
        const listAllTasks = document.querySelector('.listAll');
        this.taskList(listAllTasks);
        
        let aTask = new Task(newTaskTitle.value, newTaskDes.value, newTaskDue.value, newTaskStar.checked, newTaskPriority.value);
        let aTask_serial = JSON.stringify(aTask);
        localStorage.setItem(newTaskTitle.value, aTask_serial);

        //save each new task to an array in local storage
        allTasks[allTasks.length] = JSON.parse(localStorage.getItem(newTaskTitle.value)); 
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

//add delete&edit functions to the buttons
class TaskMenu extends CreateTask {
    constructor(taskTitle, taskDescription, dueDate, priority, starred) {
        super(taskTitle, taskDescription, dueDate, priority, starred)
    }
//delete from html - change display to array-based - to remove item from the array & localstorage
    
    editTask() {
        document.getElementById('taskForm').removeAttribute('disabled');
        showAddTask();
    }
}

export { Task, CreateTask, TaskMenu, newTaskTitle, newTaskDes, newTaskDue, newTaskPriority, newTaskStar };