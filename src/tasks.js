import { 
    compareAsc, 
    parseISO 
} from 'date-fns';

class Task {
    constructor(taskTitle, taskDescription, dueDate, priority, starred) {
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.dueDate = dueDate
        this.priority = priority
        this.starred = starred
    }
}

const newTaskTitle = document.querySelector('#taskTitle');
const newTaskDes = document.querySelector('#taskDes');
const newTaskDue = document.querySelector('#dueDate');
const newTaskStar = document.getElementById('starredTask')
const newTaskPriority = document.querySelector('.priority');

const listAllTasks = document.querySelector('.listAll');
const listToday = document.querySelector('.listToday');
const listUpcoming = document.querySelector('.listUpcoming');
const listStarred = document.querySelector('.listStarred');

let tItemId = 0;

class CreateTask extends Task{
    constructor(taskTitle, taskDescription, dueDate, priority, starred) {
        super(taskTitle, taskDescription, dueDate, priority, starred)
    }
    static showAddTask() {
        const taskForm = document.querySelector('#taskForm');
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

    taskList (listDom, tItem, tItemId, projectID) {  
        listDom.innerHTML += `
        <div class='task${tItemId} ${projectID} taskDiv'>
            <ul class='task'>
                <input name='newT' type='checkbox' id='newTask'>
                <label for='newTask'></label>
                <li class='ttitle'>${tItem.taskTitle}</li>
                <li class='tdescription'>${tItem.taskDescription}</li>
                <li class='tdue'>${tItem.dueDate}</li>
                <li class='tpriority'>${tItem.priority}</li>
                <li class='tstar ${tItem.starred}'></li>
            </ul>
            <button class='dropdownbtn'></button>
            <div class='dropdown'>
                    <button class='edit'> Edit </button>
                    <button class='del'> Delete </button>
            </div>
        </div>
        `
    }

    categorizeTask(t, n, id) {
        if (compareAsc(this.formattedDue(), this.formattedToday()) == 0) {
            this.taskList(listToday, t, n, id);
        } else if (compareAsc(this.formattedDue(), this.formattedToday()) == 1) {
            this.taskList(listUpcoming, t, n, id);
        } 
        if (newTaskStar.checked == true) {
            this.taskList(listStarred, t, n, id);
        } 
}

    saveTask(listDom, projectID) {
        if (newTaskTitle.value.length < 1) return;
        
        let aTask = new Task(newTaskTitle.value, newTaskDes.value, newTaskDue.value, newTaskPriority.value, newTaskStar.checked);

        tItemId +=1;
        this.taskList(listDom, aTask, tItemId, projectID);
        
        let aTask_serial = JSON.stringify(aTask);
        localStorage.setItem(`task${tItemId}`, aTask_serial);

        this.categorizeTask(aTask, tItemId, projectID);

        newTaskTitle.value = '';
        newTaskDes.value = '';
        newTaskDue.value = '';
        newTaskStar.checked = false;
        newTaskPriority.value = '';

        taskForm.style.display = 'none';
    }
}

export { Task, CreateTask, newTaskTitle, newTaskDes, newTaskDue, newTaskPriority, newTaskStar, listAllTasks, listToday, listUpcoming, listStarred }