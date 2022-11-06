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
        //create project and its linked tasks for display
        const newProjectList = document.createElement('div');
        newProjectList.classList.add('project');
        newProjectList.id = `project${projectId}`;

        ListsOfTasks.clearTaskDisplay();
        newProjectList.innerHTML = `
            <div class=projectTitle>${projectForm}</div>
            <button class="addATask"><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg> Add a task</button>
        `
        document.querySelector('.taskList').appendChild(newProjectList);
        
        newProjectList.style.display = 'block';
        document.querySelector('#projectForm').style.display = 'none'; 
        document.querySelector('#projectName').value = '';
    }

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
            //change project name on the panel
            const toRename = e.target.parentNode.parentNode.parentNode;
            const editForm = document.createElement('form');
            editForm.setAttribute('class', 'renameForm');
            editForm.innerHTML = `
                <input class='renameBox' value = ${toRename.firstChild.textContent.trim()} >
                <div class='submitEdit'>
                    <button class='saveNewName'></button>
                    <button class='cancelChange'></button>
                </div>
            `
            toRename.replaceChild(editForm, toRename.firstChild);
        }
    }
    
    static saveProjectEdit(e) {
        if (e.target.classList.contains('saveNewName')) {
            const editProject = e.target.parentNode.parentNode.parentNode;
            let newProjectName = editProject.querySelector('.renameBox');
            let newProjectNameNode = document.createTextNode(`${newProjectName.value}`);
            const renameForm = editProject.querySelector('.renameForm');
            editProject.replaceChild(newProjectNameNode, renameForm);
            //change project name on display
            let projectOnDisplay = document.querySelector(`#project${editProject.id} .projectTitle`);
            projectOnDisplay.textContent = newProjectName.value;
        }
    }
    static cancelProjectEdit(e) {
        if (e.target.classList.contains('cancelChange')) {
            const currentProject = e.target.parentNode.parentNode.parentNode;
            const originalProjectName = document.querySelector(`#project${currentProject.id} .projectTitle`).textContent;
            const originalProjectNode = document.createTextNode(`${originalProjectName}`);
            currentProject.replaceChild(originalProjectNode, currentProject.firstChild);
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