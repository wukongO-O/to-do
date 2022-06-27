import { task, createTask, taskMenu } from './tasks';

class listsOfTasks extends task {
    //to display tasks w class .today
    todaysTodos(){
        const todaysTasks = [];
        const todo4Today = document.querySelectorAll('.todoToday');
        todo4Today.forEach( (todo)=> {
            todaysTasks.push(todo);
        })
    }
    
    //to display tasks w class. upcoming
    displayToday(){

    }

    displayUpcoming(){
    
    }
    
    //to display tasks w class .starred
    displayStarred(){
    
    }
    //to display tasks w class .all
    displayAllTasks(){
    
    }
    
    overdue(){
    
    }
    
    }