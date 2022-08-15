import { Task, listAllTasks, listToday, listUpcoming, listStarred } from './tasks';

class ListsOfTasks extends Task {
    static clearTaskDisplay () {
        const taskDisplay = document.querySelector('.taskList');
        const allLists = taskDisplay.getElementsByTagName('*');
        for (let i = 0; i < allLists.length; i++) {
            allLists[i].style.display = 'none';
        };
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