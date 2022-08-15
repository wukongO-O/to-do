import {Task, CreateTask, listStarred} from './tasks';
import {ListsOfTasks} from './lists';

class Project {
    constructor(projectName) {
        this.projectName = projectName;
    }
    static showAddProject() {
        const addAProjectForm = document.querySelector('#projectForm');
        return addAProjectForm.style.display = 'block';
    }

    //show project name on the panel + display area w add a task function
    addProject() {
        //get project name from the form - use it as project/list title + append it to project lists area & make it a clickable tab to switch display + append the list&add a task func to display area
        const projectForm = document.querySelector('#projectName').value;
 
        const newProjectDiv = document.createElement('div');
        newProjectDiv.textContent = `${projectForm}`;
        const projectList = document.querySelector('.projectList');
        projectList.appendChild(newProjectDiv);

        const newProjectList = document.createElement('ul');

        ListsOfTasks.clearTaskDisplay();
        
        newProjectList.textContent = `${projectForm}`; 
        document.querySelector('.taskList').appendChild(newProjectList);
        newProjectList.style.display = 'block';

        document.querySelector('#projectForm').style.display = 'none'; 
        document.querySelector('#projectName').value = '';
    }

    addTaskToProject() {
       //if e.currentTarget(project).display != none
        CreateTask.saveTask(newProjectList);
    }

    displayProject() {
//hide alltask list + display 1 project at a time
    }

    editProject() {

    }

    deleteProject() {

    }


}

export {Project};