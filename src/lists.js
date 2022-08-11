import { Task, listAllTasks, listToday, listUpcoming, listStarred } from './tasks';

class ListsOfTasks extends Task {
    static displayTasks(e) {
        listAllTasks.style.display = 'none';
        listToday.style.display = 'none';
        listUpcoming.style.display = 'none';
        listStarred.style.display = 'none';
        
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