import { CreateTask } from './tasks';
import { ListsOfTasks } from './lists';

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
        if (projectForm.length < 1) return;
        projectId += 1;

        let aProject = new Project(projectForm);
        let aProject_serial = JSON.stringify(aProject);
        localStorage.setItem(`project${projectId}`, aProject_serial);

        const newProjectDiv = document.createElement('div');
        newProjectDiv.classList.add('projectBtn');
        newProjectDiv.id = `${projectId}`;
        newProjectDiv.innerHTML = `
            ${projectForm}
                <div class = 'dropdownDiv'>
                    <button class='dropdownbtn'></button>
                    <div class='dropdown'>
                        <button class='rename'>Rename</button>
                        <button class='delProject'>Delete</button>
                    </div>
                </div>
        `
        const projectList = document.querySelector('.projectList');
        projectList.appendChild(newProjectDiv);

        const newProjectList = document.createElement('div');
        newProjectList.classList.add('project');
        newProjectList.id = `project${projectId}`;

        ListsOfTasks.clearTaskDisplay();
        newProjectList.innerHTML = `
            <div class=projectTitle>${projectForm}</div>
            <button class="addATask"><img src="../src/img/add.svg" alt="add project icon"> Add a task</button>
        `
        document.querySelector('.taskList').appendChild(newProjectList);
        
        newProjectList.style.display = 'block';
        document.querySelector('#projectForm').style.display = 'none'; 
        document.querySelector('#projectName').value = '';
    }
/*
    addTaskToProject(project) {
        const addTaskToProject = new CreateTask();
        addTaskToProject.saveTask(project);
    } */

    static displayProject(e) {
        if (e.target.classList.contains('projectBtn')) {
            ListsOfTasks.clearTaskDisplay();
            const projectBtns = document.querySelectorAll('.projectBtn');
            projectBtns.forEach(pBtn => {
                pBtn.className = pBtn.className.replace(' active', '');
            })
            let projectN = e.target.id;
            document.getElementById(`project${projectN}`).style.display = 'block';
            e.target.className += ' active';
        } 
    }

    static editProject(e) {
        if(e.target.classList.contains('rename')) {
            const toRename = e.target.parentNode.parentNode;
            document.getElementById('projectForm').style.display = 'block';
            document.querySelector('#projectName').value = toRename.firstChild.textContent;

            const toRenameProjectId = toRename.id;
            localStorage.removeItem(`project${toRenameProjectId}`);
            document.getElementById(`${toRenameProjectId}`).remove();
        }
    }

    static deleteProject(e) {
        if (e.target.classList.contains('delProject')) {
            const toDelProject = e.target.parentNode.parentNode.parentNode;
            const toDelProjectId = toDelProject.id;
            localStorage.removeItem(`project${toDelProjectId}`);
            document.getElementById(`${toDelProjectId}`).remove();
            //delete associated tasks in lists
            const toDelTasksAll = document.querySelectorAll(`.project${toDelProjectId}`);
            const toDelTasksList = document.querySelectorAll(`#project${toDelProjectId} .project${toDelProjectId}`);
            toDelTasksAll.forEach((task) => {
                task.remove();
            });
            toDelTasksList.forEach((t) => {
                const tStorageName = t.classList.item(0);
                localStorage.removeItem(tStorageName);
            });
        }
    }
}

export { Project };