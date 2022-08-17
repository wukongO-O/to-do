import {Task, CreateTask, listStarred} from './tasks';
import {ListsOfTasks} from './lists';
import { id } from 'date-fns/locale';

let projectId = 0;
class Project {
    constructor(projectName) {
        this.projectName = projectName;
    }
    static showAddProject() {
        const addAProjectForm = document.querySelector('#projectForm');
        return addAProjectForm.style.display = 'block';
    }
    static cancelAddProject() {
        document.querySelector('#projectName').value = '';
        return document.querySelector('#projectForm').style.display = 'none';
    }
    addProject() {
        const projectForm = document.querySelector('#projectName').value;
        projectId += 1;

        let aProject = new Project(projectForm);
        let aProject_serial = JSON.stringify(aProject);
        localStorage.setItem(`project${projectId}`, aProject_serial);

        const newProjectDiv = document.createElement('div');
        newProjectDiv.classList.add('projectBtn');
        newProjectDiv.id = `${projectId}`;
        newProjectDiv.innerHTML = `
            ${projectForm}
                <button>Pmenu</button>
                <div class='dropdown'>
                    <button>Rename</button>
                    <button>Delete</button>
                </div>
        `
        const projectList = document.querySelector('.projectList');
        projectList.appendChild(newProjectDiv);

        const newProjectList = document.createElement('div');
        newProjectList.classList.add('project');
        newProjectList.id = `project${projectId}`;

        ListsOfTasks.clearTaskDisplay();
        
        newProjectList.textContent = `${projectForm}`; 
        document.querySelector('.taskList').appendChild(newProjectList);
        newProjectList.style.display = 'block';

        document.querySelector('#projectForm').style.display = 'none'; 
        document.querySelector('#projectName').value = '';
    }

    addTaskToProject(project) {
        const addTaskToProject = new CreateTask();
        addTaskToProject.saveTask(project);
    }

    static displayProject(e) {
        if (e.target.classList.contains('projectBtn')) {
            ListsOfTasks.clearTaskDisplay();
            const projectBtns = document.querySelectorAll('.projectBtn');
            projectBtns.forEach(pBtn => {
                pBtn.className = pBtn.className.replace(' active', '');
            })

            const projectN = e.target.id;
            const currentProject = document.getElementById(`project${projectN}`);
            currentProject.style.display = 'block';

            e.target.className += ' active';
        } 
    }

    editProject() {

    }

    deleteProject() {

    }


}

export {Project};