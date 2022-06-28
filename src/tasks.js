import { compareAsc, format } from 'date-fns'

class Task {
    constructor(taskTitle, taskDescription, dueDate, priority, starred) {
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.dueDate = dueDate
        this.priority = priority
        this.starred = starred
    }
    static formattedDue() {
        return format(new Date(dueDate), 'MM/dd/yyyy');
    }
    static formattedToday() {
        return formattedToday = format(new Date(), 'MM/dd/yyyy');
    }
    static starredOrNot() {
        //this.starred = document.getElementById('starTask');
        if (this.starred == 'checked') {
            return true;
        } else {
            return false;
        } 
    }
}

//create new task as object + save each object to localStorage
//make taskform visible -> submit or cancel the form -> a) if cancelled: hidden the form b) if submitted: display form data + another layer of functions after task/elements created by DOM (delete + edit)
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

    saveTask() {
        //create a task in all tasks by default
        const listAllTasks = document.querySelector('.listAll');
        const newTaskTitle = document.querySelector('#taskTitle')
        const newTaskDes = document.querySelector('#taskDes');
        const newTaskDue = document.querySelector('#dueDate');
        const newTaskStar = document.getElementById('starredTask')
        const newTaskPriority = document.querySelector('.priority');

        if (newTaskTitle.value.length < 1) return;

        listAllTasks.innerHTML += `
            <ul class='task'> ${newTaskTitle.value}
                <li class='tdescription'> ${newTaskDes.value} </li>
                <li class='tdue'> ${newTaskDue.value} </li>
                <li class='tstar'> ${newTaskStar.checked} </li>
                <li class='tpriority'> ${newTaskPriority.value} </li>
            </ul> `;
        
        let aTask = {
            taskTitle: newTaskTitle.value,
            taskDescription: newTaskDes.value,
            dueDate: newTaskDue.value,
            starred: newTaskStar.checked,
            priority: newTaskPriority.value,
        };
        let aTask_serial = JSON.stringify(aTask);
        localStorage.setItem('newTask', aTask_serial);

            //need to fix: @localStorage - a new task overwrites alltasks
        let allTasks = [];
        let allTasks_serial = JSON.stringify(allTasks);
        localStorage.setItem('allTasks', allTasks_serial);

        newTaskTitle.value = '';
        newTaskDes.value = '';
        newTaskDue.value = '';
        newTaskStar.checked = false;
        newTaskPriority.value = '';

        //categorize the task to a list based on duedate
        let listToday = [];
        let listUpcoming = [];
        let listStarred = [];
/*
        if (compareAsc(this.dueDate.formattedDue(), formattedToday()) == 0) {
            listToday.push(this);
        } else if (compareAsc(this.dueDate.formattedDue(), formattedToday())== 1) {
            listUpcoming.push(this);
        } else if (compareAsc(this.dueDate.formattedDue(), formattedToday())== -1) {
            newTaskDue.value = 'overdue';
        } else {
            newTaskDue.value = 'noDuedate'; 
        };

        if (newTaskStar.value == 'checked') {
            listStarred.push(this);
        } */

        taskForm.style.display = 'none';
        listAllTasks.style.display = 'block';
    }

     

    completeTask(){
        newTaskName.addEventListener('click', function (e) {
            e.target.classList.toggle('checked');
        }, false);
    } 
}

class taskMenu extends Task {
    //create & append a delete button
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

export { Task, CreateTask, taskMenu };

/*const task = (taskTitle, taskDescription, dueDate, priority, starred) => {
    const starredOrNot = () => {
        if (starred == checked) {
            return true;
        } else {
            return false;
        }
    };

    const formattedDue = format(new Date(dueDate), 'MM/dd/yyyy');
    const formattedToday = format(new Date(), 'MM/dd/yyyy');

    return {taskTitle, taskDescription, dueDate, formattedDue, formattedToday, priority, starredOrNot};
};
*/