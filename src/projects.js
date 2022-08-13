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

    }

    editProject() {

    }

    deleteProject() {

    }

    displayProject() {

    }
}

export {Project};