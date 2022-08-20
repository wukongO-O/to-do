import { Task, listAllTasks, listToday, listUpcoming, listStarred } from './tasks';


class ListsOfTasks extends Task {

    static clearTaskDisplay () {
        const allLists = document.querySelectorAll('.taskList > div');
        allLists.forEach(list => {
            list.style.display = 'none';
        });
    } 

    static displayTasks(e) {
        this.clearTaskDisplay();

        const taskbtns = document.querySelectorAll('.taskbtn');
        taskbtns.forEach(tbtn => {
            tbtn.className = tbtn.className.replace(' active', '');
        });

        if (e.currentTarget == document.querySelector('.all')) {
            listAllTasks.style.display = 'block';
        } else if (e.currentTarget == document.querySelector('.today')) {
            listToday.style.display = 'block';
        } else if (e.currentTarget == document.querySelector('.upcoming')) {
            listUpcoming.style.display = 'block';
        } else if (e.currentTarget == document.querySelector('.star')) {
            listStarred.style.display = 'block';
        };

        e.currentTarget.className += ' active';
    }
    
    }

export { ListsOfTasks }