/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lists.js":
/*!**********************!*\
  !*** ./src/lists.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListsOfTasks": () => (/* binding */ ListsOfTasks)
/* harmony export */ });
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");


class ListsOfTasks extends _tasks__WEBPACK_IMPORTED_MODULE_0__.Task {
  static clearTaskDisplay() {
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
      _tasks__WEBPACK_IMPORTED_MODULE_0__.listAllTasks.style.display = 'block';
    } else if (e.currentTarget == document.querySelector('.today')) {
      _tasks__WEBPACK_IMPORTED_MODULE_0__.listToday.style.display = 'block';
    } else if (e.currentTarget == document.querySelector('.upcoming')) {
      _tasks__WEBPACK_IMPORTED_MODULE_0__.listUpcoming.style.display = 'block';
    } else if (e.currentTarget == document.querySelector('.star')) {
      _tasks__WEBPACK_IMPORTED_MODULE_0__.listStarred.style.display = 'block';
    }

    e.currentTarget.className += ' active';
  }

}



/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lists */ "./src/lists.js");

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
    localStorage.setItem("project".concat(projectId), aProject_serial);
    const newProjectDiv = document.createElement('div');
    newProjectDiv.classList.add('projectBtn');
    newProjectDiv.id = "".concat(projectId);
    newProjectDiv.innerHTML = "\n            ".concat(projectForm, "\n                <div class = 'dropdownDiv'>\n                    <button class='dropdownbtn'></button>\n                    <div class='dropdown'>\n                        <button class='rename'>Rename</button>\n                        <button class='delProject'>Delete</button>\n                    </div>\n                </div>\n        ");
    const projectList = document.querySelector('.projectList');
    projectList.appendChild(newProjectDiv); //create project and its linked tasks for display

    const newProjectList = document.createElement('div');
    newProjectList.classList.add('project');
    newProjectList.id = "project".concat(projectId);
    _lists__WEBPACK_IMPORTED_MODULE_0__.ListsOfTasks.clearTaskDisplay();
    newProjectList.innerHTML = "\n            <div class=projectTitle>".concat(projectForm, "</div>\n            <button class=\"addATask\"><svg xmlns=\"http://www.w3.org/2000/svg\" height=\"48\" width=\"48\"><path d=\"M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z\"/></svg> Add a task</button>\n        ");
    document.querySelector('.taskList').appendChild(newProjectList);
    newProjectList.style.display = 'block';
    document.querySelector('#projectForm').style.display = 'none';
    document.querySelector('#projectName').value = '';
  }

  static displayProject(e) {
    if (e.target.classList.contains('projectBtn')) {
      _lists__WEBPACK_IMPORTED_MODULE_0__.ListsOfTasks.clearTaskDisplay();
      const projectBtns = document.querySelectorAll('.projectBtn');
      projectBtns.forEach(pBtn => {
        pBtn.className = pBtn.className.replace(' active', '');
      });
      let projectN = e.target.id;
      document.getElementById("project".concat(projectN)).style.display = 'block';
      e.target.className += ' active';
    }
  }

  static editProject(e) {
    if (e.target.classList.contains('rename')) {
      //change project name on the panel
      const toRename = e.target.parentNode.parentNode.parentNode;
      const editForm = document.createElement('form');
      editForm.setAttribute('class', 'renameForm');
      editForm.innerHTML = "\n                <input class='renameBox' value = ".concat(toRename.firstChild.textContent.trim(), " >\n                <div class='submitEdit'>\n                    <button class='saveNewName'></button>\n                    <button class='cancelChange'></button>\n                </div>\n            ");
      toRename.replaceChild(editForm, toRename.firstChild);
    }
  }

  static saveProjectEdit(e) {
    if (e.target.classList.contains('saveNewName')) {
      const editProject = e.target.parentNode.parentNode.parentNode;
      let newProjectName = editProject.querySelector('.renameBox');
      let newProjectNameNode = document.createTextNode("".concat(newProjectName.value));
      const renameForm = editProject.querySelector('.renameForm');
      editProject.replaceChild(newProjectNameNode, renameForm); //change project name on display

      let projectOnDisplay = document.querySelector("#project".concat(editProject.id, " .projectTitle"));
      projectOnDisplay.textContent = newProjectName.value;
    }
  }

  static cancelProjectEdit(e) {
    if (e.target.classList.contains('cancelChange')) {
      const currentProject = e.target.parentNode.parentNode.parentNode;
      const originalProjectName = document.querySelector("#project".concat(currentProject.id, " .projectTitle")).textContent;
      const originalProjectNode = document.createTextNode("".concat(originalProjectName));
      currentProject.replaceChild(originalProjectNode, currentProject.firstChild);
    }
  }

  static deleteProject(e) {
    if (e.target.classList.contains('delProject')) {
      const toDelProject = e.target.parentNode.parentNode.parentNode;
      const toDelProjectId = toDelProject.id;
      localStorage.removeItem("project".concat(toDelProjectId));
      document.getElementById("".concat(toDelProjectId)).remove(); //delete associated tasks in lists

      const toDelTasksAll = document.querySelectorAll(".project".concat(toDelProjectId));
      const toDelTasksList = document.querySelectorAll("#project".concat(toDelProjectId, " .project").concat(toDelProjectId));
      toDelTasksAll.forEach(task => {
        task.remove();
      });
      toDelTasksList.forEach(t => {
        const tStorageName = t.classList.item(0);
        localStorage.removeItem(tStorageName);
      });
    }
  }

}



/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTask": () => (/* binding */ CreateTask),
/* harmony export */   "Task": () => (/* binding */ Task),
/* harmony export */   "listAllTasks": () => (/* binding */ listAllTasks),
/* harmony export */   "listStarred": () => (/* binding */ listStarred),
/* harmony export */   "listToday": () => (/* binding */ listToday),
/* harmony export */   "listUpcoming": () => (/* binding */ listUpcoming),
/* harmony export */   "newTaskDes": () => (/* binding */ newTaskDes),
/* harmony export */   "newTaskDue": () => (/* binding */ newTaskDue),
/* harmony export */   "newTaskPriority": () => (/* binding */ newTaskPriority),
/* harmony export */   "newTaskStar": () => (/* binding */ newTaskStar),
/* harmony export */   "newTaskTitle": () => (/* binding */ newTaskTitle)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/parseISO/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/compareAsc/index.js");


class Task {
  constructor(taskTitle, taskDescription, dueDate, priority, starred) {
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.dueDate = dueDate;
    this.priority = priority;
    this.starred = starred;
  }

}

const newTaskTitle = document.querySelector('#taskTitle');
const newTaskDes = document.querySelector('#taskDes');
const newTaskDue = document.querySelector('#dueDate');
const newTaskStar = document.getElementById('starredTask');
const newTaskPriority = document.querySelector('.priority');
const listAllTasks = document.querySelector('.listAll');
const listToday = document.querySelector('.listToday');
const listUpcoming = document.querySelector('.listUpcoming');
const listStarred = document.querySelector('.listStarred');
let tItemId = 0;

class CreateTask extends Task {
  constructor(taskTitle, taskDescription, dueDate, priority, starred) {
    super(taskTitle, taskDescription, dueDate, priority, starred);
  }

  static showAddTask() {
    const taskForm = document.querySelector('#taskForm');
    return taskForm.style.display = "block";
  }

  static cancelAddTask() {
    return document.querySelector('#taskForm').style.display = "none";
  }

  formattedToday() {
    const today = new Date();
    return today.setHours(0, 0, 0, 0);
  }

  formattedDue() {
    const formatDue = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])("".concat(newTaskDue.value));
    return formatDue.setHours(0, 0, 0, 0);
  }

  taskList(listDom, tItem, tItemId, projectID) {
    listDom.innerHTML += "\n        <div class='task".concat(tItemId, " ").concat(projectID, " taskDiv'>\n            <ul class='task'>\n                <input name='newT' type='checkbox' id='newTask'>\n                <label for='newTask'></label>\n                <li class='ttitle'>").concat(tItem.taskTitle, "</li>\n                <li class='tdescription'>").concat(tItem.taskDescription, "</li>\n                <li class='tdue'>").concat(tItem.dueDate, "</li>\n                <li class='tpriority'>").concat(tItem.priority, "</li>\n                <li class='tstar ").concat(tItem.starred, "'></li>\n            </ul>\n            <button class='dropdownbtn'></button>\n            <div class='dropdown'>\n                    <button class='edit'> Edit </button>\n                    <button class='del'> Delete </button>\n            </div>\n        </div>\n        ");
  }

  categorizeTask(t, n, id) {
    if ((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(this.formattedDue(), this.formattedToday()) == 0) {
      this.taskList(listToday, t, n, id);
    } else if ((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(this.formattedDue(), this.formattedToday()) == 1) {
      this.taskList(listUpcoming, t, n, id);
    }

    if (newTaskStar.checked == true) {
      this.taskList(listStarred, t, n, id);
    }
  }

  saveTask(listDom, projectID) {
    if (newTaskTitle.value.length < 1) return;
    let aTask = new Task(newTaskTitle.value, newTaskDes.value, newTaskDue.value, newTaskPriority.value, newTaskStar.checked);
    tItemId += 1;
    this.taskList(listDom, aTask, tItemId, projectID);
    let aTask_serial = JSON.stringify(aTask);
    localStorage.setItem("task".concat(tItemId), aTask_serial);
    this.categorizeTask(aTask, tItemId, projectID);
    newTaskTitle.value = '';
    newTaskDes.value = '';
    newTaskDue.value = '';
    newTaskStar.checked = false;
    newTaskPriority.value = '';
    taskForm.style.display = 'none';
  }

}



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/fff_tusj-webfont.woff2 */ "./src/fonts/fff_tusj-webfont.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/fff_tusj-webfont.woff */ "./src/fonts/fff_tusj-webfont.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../src/img/dotMenu.svg */ "./src/img/dotMenu.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./img/check.svg */ "./src/img/check.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./img/x.svg */ "./src/img/x.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./img/star.svg */ "./src/img/star.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* fix dropdownmenu position */\n@font-face {\n    font-family: 'fff_tusjbold';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\nbody {\n    margin: 0;\n    font-family: monospace;\n    color: black;\n}\n\n.container {\n    min-height: 100%;\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n    height: 100vh;\n}\n\n.header, .footer {\n    background-color:#999B84;\n    text-align: center;\n    font-family: 'fff_tusjbold';\n}\n.title {\n    font-size: 50pt;\n    padding: 30px 0;\n}\n.footer {\n    color: #F4EEED;\n    padding: 8px 0 15px 0;\n}\na > svg {\n    stroke: #F4EEED;\n    position: relative;\n    top: 4px;\n    left: 2px;\n}\na > svg :hover {\n    stroke: #D8AC9C;\n    fill: #D8AC9C;\n}\n\n.main {\n    display: flex;\n}\n.panel {\n    background-color: #EFD9D1;\n    flex: 1;\n}\n.tasks {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    margin: 0;\n    align-self: flex-start;\n}\n.display {\n    background-color: #F4EEED;\n    flex: 3;\n}\ntextarea {\n    resize: none;\n}\n.panel img {\n    height: 30px;\n    width: 30px;\n    position: relative;\n    top: 0.4rem;\n}\n.panel button {\n    border: none;\n    width: 100%;\n    background-color: #EFD9D1;\n    text-align: left;\n    font-size: 20pt;\n    font-family: monospace;\n    padding: 0.5rem 2rem;\n}\n\nbutton:hover, .projectBtn:hover, .projectBtn:hover .dropdownbtn {\n    background-color: #D8AC9C;\n}\n\n.projectHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 30pt;\n    padding: 2rem 0 2rem 2rem;\n}\n.taskHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 20px;\n    margin: 55px;\n    text-align: center;\n}\n\n.projectBtn {\n    display: grid;\n    grid-template-columns: 4fr 1fr;\n    align-items: baseline;\n    font-size: 20pt;\n    padding-left: 2rem;\n    position: relative;\n    margin-bottom: 1rem;\n}\n.dropdownbtn {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 30px;\n    width: 30px;\n    display: inherit;\n}\nform.renameForm {\n    display: flex;\n}\n.renameBox {\n    font-size: 15pt;\n    margin-right: 10px;\n    padding: 0 10px;\n    width: 200px;\n    background-color: #F4EEED;\n    border: solid 1px black;\n}\n.submitEdit {\n    display: flex;\n    width: 50px;\n}\n.submitEdit button {\n    padding: 0;\n    background-color: #F4EEED;\n    border: 1px solid black;\n  }\n.submitEdit button:hover {\n    background-color: #D8AC9C;\n}\n.taskDiv {\n    position: relative;\n}\n.dropdownDiv {\n    float: right;\n    position: relative;\n}\n.dropdown {\n    display: none;\n    position: absolute;\n    min-width: 50px;\n    z-index: 1;\n}\n\ndiv.showMenu {\n    display: block;\n}\n.dropdown button {\n    background-color: #F4EEED;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n}\n.taskDiv .dropdown.showMenu {\n    top: 44px;\n    display: grid;\n    right: 10px;\n    justify-content: end;\n    left: 0;\n}\n\n#projectForm {\n    margin: 1rem 3rem 0 3rem;\n    font-size: 15pt;\n}\n#projectName {\n    width: 150px;\n  }\n#projectForm .save {\n    margin-top: 5px;\n    display: flex;\n    margin-left: 0;\n}\n.save button {\n    width: 100px;\n}\n.saveNewName {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") no-repeat;\n}\n.cancelChange {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") no-repeat;\n}\nbutton.cancelProject, button.addProject {\n    border: solid 1px black;\n    width: 8rem;\n    margin: 0.5rem;\n    padding: 0.2rem 0;\n    text-align: center;\n    border-radius: 5px;\n    font-size: 15pt;\n}\ninput, textarea {\n    padding: 2px 1em;\n    font-size: 15pt;\n    background-color: #F4EEED;\n    border: solid 1px black;\n}\n\n.projectTitle {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 40px;\n    text-align: center;\n}\n.display button {\n    font-family: monospace;\n    font-size: 16pt;\n    border: 1pt solid;\n    border-radius: 5px;\n    background-color: #F4EEED;\n}\n.display .addATask {\n    margin: 0 0 20px 80px;\n    display: flex;\n    align-items: center;\n    padding: 0 15px;\n}\n\n.display button:hover, #addTask button:hover {\n    background-color: #D8AC9C;\n}\n.save {\n    margin-top: 5px;\n}\n#taskForm {\n    font-family: monospace;\n    font-size: 16pt;\n}\nfieldset {\n    display: grid;\n    gap: 10px;\n    margin: 0 5rem;\n}\ninput[id='newTask']:checked~li.ttitle {\n    text-decoration: line-through;\n    color:black;\n}\n\n.taskList {\n    display: flex;\n    flex-direction: column-reverse;\n}\n.taskDiv {\n    display: flex;\n    gap: 20px;\n    padding: 0 40px;\n    align-items: flex-start;\n}\n.task {\n    list-style-type: none;\n    display: grid;\n    gap: 20px;\n    grid-template-columns: 30px 180px 6fr 3fr 1fr;\n    grid-template-areas:\n        \"one two four five six\"\n        \"three three three three three\";\n    justify-content: flex-start;\n    align-items: center;\n    flex: 1;\n    font-size: 16pt;\n    margin: 0;\n}\n.addATask svg {\n    transform: scale(0.75);\n}\n#newTask {\n    grid-area: one;\n}\n.ttitle {\n    grid-area: two;\n}\n.tdescription {\n    grid-area: three;\n    padding-left: 3rem;\n    color: rgb(97, 95, 95);\n}\n.tdue {\n    grid-area: four;\n}\n.tpriority {\n    grid-area: five;\n}\n.tstar {\n    grid-area: six;\n}\n.true {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 20px;\n    width: 20px;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,8BAA8B;AAC9B;IACI,2BAA2B;IAC3B;+DACwD;IACxD,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,SAAS;IACT,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,gBAAgB;IAChB,aAAa;IACb,iCAAiC;IACjC,aAAa;AACjB;;AAEA;IACI,wBAAwB;IACxB,kBAAkB;IAClB,2BAA2B;AAC/B;AACA;IACI,eAAe;IACf,eAAe;AACnB;AACA;IACI,cAAc;IACd,qBAAqB;AACzB;AACA;IACI,eAAe;IACf,kBAAkB;IAClB,QAAQ;IACR,SAAS;AACb;AACA;IACI,eAAe;IACf,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;AACA;IACI,yBAAyB;IACzB,OAAO;AACX;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,SAAS;IACT,sBAAsB;AAC1B;AACA;IACI,yBAAyB;IACzB,OAAO;AACX;AACA;IACI,YAAY;AAChB;AACA;IACI,YAAY;IACZ,WAAW;IACX,kBAAkB;IAClB,WAAW;AACf;AACA;IACI,YAAY;IACZ,WAAW;IACX,yBAAyB;IACzB,gBAAgB;IAChB,eAAe;IACf,sBAAsB;IACtB,oBAAoB;AACxB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,2BAA2B;IAC3B,eAAe;IACf,yBAAyB;AAC7B;AACA;IACI,2BAA2B;IAC3B,eAAe;IACf,aAAa;IACb,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,qBAAqB;IACrB,eAAe;IACf,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;AACvB;AACA;IACI,yDAA6C;IAC7C,wBAAwB;IACxB,4BAA4B;IAC5B,YAAY;IACZ,WAAW;IACX,gBAAgB;AACpB;AACA;IACI,aAAa;AACjB;AACA;IACI,eAAe;IACf,kBAAkB;IAClB,eAAe;IACf,YAAY;IACZ,yBAAyB;IACzB,uBAAuB;AAC3B;AACA;IACI,aAAa;IACb,WAAW;AACf;AACA;IACI,UAAU;IACV,yBAAyB;IACzB,uBAAuB;EACzB;AACF;IACI,yBAAyB;AAC7B;AACA;IACI,kBAAkB;AACtB;AACA;IACI,YAAY;IACZ,kBAAkB;AACtB;AACA;IACI,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,UAAU;AACd;;AAEA;IACI,cAAc;AAClB;AACA;IACI,yBAAyB;IACzB,4CAA4C;AAChD;AACA;IACI,SAAS;IACT,aAAa;IACb,WAAW;IACX,oBAAoB;IACpB,OAAO;AACX;;AAEA;IACI,wBAAwB;IACxB,eAAe;AACnB;AACA;IACI,YAAY;EACd;AACF;IACI,eAAe;IACf,aAAa;IACb,cAAc;AAClB;AACA;IACI,YAAY;AAChB;AACA;IACI,6DAA0C;AAC9C;AACA;IACI,6DAAsC;AAC1C;AACA;IACI,uBAAuB;IACvB,WAAW;IACX,cAAc;IACd,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;IAClB,eAAe;AACnB;AACA;IACI,gBAAgB;IAChB,eAAe;IACf,yBAAyB;IACzB,uBAAuB;AAC3B;;AAEA;IACI,2BAA2B;IAC3B,eAAe;IACf,aAAa;IACb,kBAAkB;AACtB;AACA;IACI,sBAAsB;IACtB,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,yBAAyB;AAC7B;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,yBAAyB;AAC7B;AACA;IACI,eAAe;AACnB;AACA;IACI,sBAAsB;IACtB,eAAe;AACnB;AACA;IACI,aAAa;IACb,SAAS;IACT,cAAc;AAClB;AACA;IACI,6BAA6B;IAC7B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;AACA;IACI,aAAa;IACb,SAAS;IACT,eAAe;IACf,uBAAuB;AAC3B;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,SAAS;IACT,6CAA6C;IAC7C;;uCAEmC;IACnC,2BAA2B;IAC3B,mBAAmB;IACnB,OAAO;IACP,eAAe;IACf,SAAS;AACb;AACA;IACI,sBAAsB;AAC1B;AACA;IACI,cAAc;AAClB;AACA;IACI,cAAc;AAClB;AACA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,sBAAsB;AAC1B;AACA;IACI,eAAe;AACnB;AACA;IACI,eAAe;AACnB;AACA;IACI,cAAc;AAClB;AACA;IACI,yDAAqC;IACrC,wBAAwB;IACxB,4BAA4B;IAC5B,YAAY;IACZ,WAAW;AACf","sourcesContent":["/* fix dropdownmenu position */\n@font-face {\n    font-family: 'fff_tusjbold';\n    src: url('./fonts/fff_tusj-webfont.woff2') format('woff2'),\n         url('./fonts/fff_tusj-webfont.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\nbody {\n    margin: 0;\n    font-family: monospace;\n    color: black;\n}\n\n.container {\n    min-height: 100%;\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n    height: 100vh;\n}\n\n.header, .footer {\n    background-color:#999B84;\n    text-align: center;\n    font-family: 'fff_tusjbold';\n}\n.title {\n    font-size: 50pt;\n    padding: 30px 0;\n}\n.footer {\n    color: #F4EEED;\n    padding: 8px 0 15px 0;\n}\na > svg {\n    stroke: #F4EEED;\n    position: relative;\n    top: 4px;\n    left: 2px;\n}\na > svg :hover {\n    stroke: #D8AC9C;\n    fill: #D8AC9C;\n}\n\n.main {\n    display: flex;\n}\n.panel {\n    background-color: #EFD9D1;\n    flex: 1;\n}\n.tasks {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    margin: 0;\n    align-self: flex-start;\n}\n.display {\n    background-color: #F4EEED;\n    flex: 3;\n}\ntextarea {\n    resize: none;\n}\n.panel img {\n    height: 30px;\n    width: 30px;\n    position: relative;\n    top: 0.4rem;\n}\n.panel button {\n    border: none;\n    width: 100%;\n    background-color: #EFD9D1;\n    text-align: left;\n    font-size: 20pt;\n    font-family: monospace;\n    padding: 0.5rem 2rem;\n}\n\nbutton:hover, .projectBtn:hover, .projectBtn:hover .dropdownbtn {\n    background-color: #D8AC9C;\n}\n\n.projectHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 30pt;\n    padding: 2rem 0 2rem 2rem;\n}\n.taskHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 20px;\n    margin: 55px;\n    text-align: center;\n}\n\n.projectBtn {\n    display: grid;\n    grid-template-columns: 4fr 1fr;\n    align-items: baseline;\n    font-size: 20pt;\n    padding-left: 2rem;\n    position: relative;\n    margin-bottom: 1rem;\n}\n.dropdownbtn {\n    background-image: url(../src/img/dotMenu.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 30px;\n    width: 30px;\n    display: inherit;\n}\nform.renameForm {\n    display: flex;\n}\n.renameBox {\n    font-size: 15pt;\n    margin-right: 10px;\n    padding: 0 10px;\n    width: 200px;\n    background-color: #F4EEED;\n    border: solid 1px black;\n}\n.submitEdit {\n    display: flex;\n    width: 50px;\n}\n.submitEdit button {\n    padding: 0;\n    background-color: #F4EEED;\n    border: 1px solid black;\n  }\n.submitEdit button:hover {\n    background-color: #D8AC9C;\n}\n.taskDiv {\n    position: relative;\n}\n.dropdownDiv {\n    float: right;\n    position: relative;\n}\n.dropdown {\n    display: none;\n    position: absolute;\n    min-width: 50px;\n    z-index: 1;\n}\n\ndiv.showMenu {\n    display: block;\n}\n.dropdown button {\n    background-color: #F4EEED;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n}\n.taskDiv .dropdown.showMenu {\n    top: 44px;\n    display: grid;\n    right: 10px;\n    justify-content: end;\n    left: 0;\n}\n\n#projectForm {\n    margin: 1rem 3rem 0 3rem;\n    font-size: 15pt;\n}\n#projectName {\n    width: 150px;\n  }\n#projectForm .save {\n    margin-top: 5px;\n    display: flex;\n    margin-left: 0;\n}\n.save button {\n    width: 100px;\n}\n.saveNewName {\n    background: url(./img/check.svg) no-repeat;\n}\n.cancelChange {\n    background: url(./img/x.svg) no-repeat;\n}\nbutton.cancelProject, button.addProject {\n    border: solid 1px black;\n    width: 8rem;\n    margin: 0.5rem;\n    padding: 0.2rem 0;\n    text-align: center;\n    border-radius: 5px;\n    font-size: 15pt;\n}\ninput, textarea {\n    padding: 2px 1em;\n    font-size: 15pt;\n    background-color: #F4EEED;\n    border: solid 1px black;\n}\n\n.projectTitle {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 40px;\n    text-align: center;\n}\n.display button {\n    font-family: monospace;\n    font-size: 16pt;\n    border: 1pt solid;\n    border-radius: 5px;\n    background-color: #F4EEED;\n}\n.display .addATask {\n    margin: 0 0 20px 80px;\n    display: flex;\n    align-items: center;\n    padding: 0 15px;\n}\n\n.display button:hover, #addTask button:hover {\n    background-color: #D8AC9C;\n}\n.save {\n    margin-top: 5px;\n}\n#taskForm {\n    font-family: monospace;\n    font-size: 16pt;\n}\nfieldset {\n    display: grid;\n    gap: 10px;\n    margin: 0 5rem;\n}\ninput[id='newTask']:checked~li.ttitle {\n    text-decoration: line-through;\n    color:black;\n}\n\n.taskList {\n    display: flex;\n    flex-direction: column-reverse;\n}\n.taskDiv {\n    display: flex;\n    gap: 20px;\n    padding: 0 40px;\n    align-items: flex-start;\n}\n.task {\n    list-style-type: none;\n    display: grid;\n    gap: 20px;\n    grid-template-columns: 30px 180px 6fr 3fr 1fr;\n    grid-template-areas:\n        \"one two four five six\"\n        \"three three three three three\";\n    justify-content: flex-start;\n    align-items: center;\n    flex: 1;\n    font-size: 16pt;\n    margin: 0;\n}\n.addATask svg {\n    transform: scale(0.75);\n}\n#newTask {\n    grid-area: one;\n}\n.ttitle {\n    grid-area: two;\n}\n.tdescription {\n    grid-area: three;\n    padding-left: 3rem;\n    color: rgb(97, 95, 95);\n}\n.tdue {\n    grid-area: four;\n}\n.tpriority {\n    grid-area: five;\n}\n.tstar {\n    grid-area: six;\n}\n.true {\n    background-image: url(./img/star.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 20px;\n    width: 20px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/compareAsc/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/compareAsc/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compareAsc)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */

function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/constants/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/constants/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "daysInWeek": () => (/* binding */ daysInWeek),
/* harmony export */   "maxTime": () => (/* binding */ maxTime),
/* harmony export */   "millisecondsInHour": () => (/* binding */ millisecondsInHour),
/* harmony export */   "millisecondsInMinute": () => (/* binding */ millisecondsInMinute),
/* harmony export */   "millisecondsInSecond": () => (/* binding */ millisecondsInSecond),
/* harmony export */   "minTime": () => (/* binding */ minTime),
/* harmony export */   "minutesInHour": () => (/* binding */ minutesInHour),
/* harmony export */   "monthsInQuarter": () => (/* binding */ monthsInQuarter),
/* harmony export */   "monthsInYear": () => (/* binding */ monthsInYear),
/* harmony export */   "quartersInYear": () => (/* binding */ quartersInYear),
/* harmony export */   "secondsInHour": () => (/* binding */ secondsInHour),
/* harmony export */   "secondsInMinute": () => (/* binding */ secondsInMinute)
/* harmony export */ });
/**
 * Days in 1 week.
 *
 * @name daysInWeek
 * @constant
 * @type {number}
 * @default
 */
var daysInWeek = 7;
/**
 * Maximum allowed time.
 *
 * @name maxTime
 * @constant
 * @type {number}
 * @default
 */

var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;
/**
 * Milliseconds in 1 minute
 *
 * @name millisecondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInMinute = 60000;
/**
 * Milliseconds in 1 hour
 *
 * @name millisecondsInHour
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInHour = 3600000;
/**
 * Milliseconds in 1 second
 *
 * @name millisecondsInSecond
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInSecond = 1000;
/**
 * Minimum allowed time.
 *
 * @name minTime
 * @constant
 * @type {number}
 * @default
 */

var minTime = -maxTime;
/**
 * Minutes in 1 hour
 *
 * @name minutesInHour
 * @constant
 * @type {number}
 * @default
 */

var minutesInHour = 60;
/**
 * Months in 1 quarter
 *
 * @name monthsInQuarter
 * @constant
 * @type {number}
 * @default
 */

var monthsInQuarter = 3;
/**
 * Months in 1 year
 *
 * @name monthsInYear
 * @constant
 * @type {number}
 * @default
 */

var monthsInYear = 12;
/**
 * Quarters in 1 year
 *
 * @name quartersInYear
 * @constant
 * @type {number}
 * @default
 */

var quartersInYear = 4;
/**
 * Seconds in 1 hour
 *
 * @name secondsInHour
 * @constant
 * @type {number}
 * @default
 */

var secondsInHour = 3600;
/**
 * Seconds in 1 minute
 *
 * @name secondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var secondsInMinute = 60;

/***/ }),

/***/ "./node_modules/date-fns/esm/parseISO/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/parseISO/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseISO)
/* harmony export */ });
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/index.js */ "./node_modules/date-fns/esm/constants/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");



/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The previous `parse` implementation was renamed to `parseISO`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   parseISO('2016-01-01')
 *   ```
 *
 * - `parseISO` now validates separate date and time values in ISO-8601 strings
 *   and returns `Invalid Date` if the date is invalid.
 *
 *   ```javascript
 *   parseISO('2018-13-32')
 *   //=> Invalid Date
 *   ```
 *
 * - `parseISO` now doesn't fall back to `new Date` constructor
 *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? 2 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time)) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.

    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }

  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString; // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].

  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: NaN,
    restDateString: ''
  };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null; // either year or century is null, not both

  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/fff_tusj-webfont.woff":
/*!*****************************************!*\
  !*** ./src/fonts/fff_tusj-webfont.woff ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ba6e0f67e69d207e4625.woff";

/***/ }),

/***/ "./src/fonts/fff_tusj-webfont.woff2":
/*!******************************************!*\
  !*** ./src/fonts/fff_tusj-webfont.woff2 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5b6e7bfc14f914d7e85c.woff2";

/***/ }),

/***/ "./src/img/check.svg":
/*!***************************!*\
  !*** ./src/img/check.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a6151888542feae6b584.svg";

/***/ }),

/***/ "./src/img/dotMenu.svg":
/*!*****************************!*\
  !*** ./src/img/dotMenu.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "82b8ca150ddd4b5977f1.svg";

/***/ }),

/***/ "./src/img/star.svg":
/*!**************************!*\
  !*** ./src/img/star.svg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6159865ea9c8d3e4ccd0.svg";

/***/ }),

/***/ "./src/img/x.svg":
/*!***********************!*\
  !*** ./src/img/x.svg ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6c9a4ba71a333be7b021.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lists */ "./src/lists.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projects */ "./src/projects.js");




const taskLists = document.querySelector('.taskList');
taskLists.addEventListener('click', e => {
  if (e.target.classList.contains('addATask')) {
    _tasks__WEBPACK_IMPORTED_MODULE_1__.CreateTask.showAddTask();
  }
});

function addTasks() {
  const projects = document.querySelectorAll('.project');

  for (let j = 0; j < projects.length; j++) {
    if (projects[j].style.display == 'block') {
      let displayedProject = document.getElementById("".concat(projects[j].id));
      const addTask = new _tasks__WEBPACK_IMPORTED_MODULE_1__.CreateTask();
      addTask.saveTask(displayedProject, "".concat(projects[j].id));
      const currentTask = displayedProject.lastElementChild;
      const cloneTask = currentTask.cloneNode(true);
      _tasks__WEBPACK_IMPORTED_MODULE_1__.listAllTasks.appendChild(cloneTask);
      _lists__WEBPACK_IMPORTED_MODULE_2__.ListsOfTasks.clearTaskDisplay();
      displayedProject.style.display = 'block';
    }
    /*
    else {
        const linkedProject = document.getElementById(`${taskForm.className}`);
        const addTask2 = new CreateTask();
        addTask2.saveTask(linkedProject, `${taskForm.className}`);
        const cloneTask2 = linkedProject.lastElementChild.cloneNode(true);
        listAllTasks.appendChild(cloneTask2);
    } */

  }

  taskForm.removeAttribute('class');
}

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTasks();
});
const cancelTaskBtn = document.querySelector('.cancelbtn');
cancelTaskBtn.addEventListener('click', () => {
  _tasks__WEBPACK_IMPORTED_MODULE_1__.CreateTask.cancelAddTask();
});

function showDropdownMenu(e) {
  if (e.target.classList.contains('dropdownbtn')) {
    e.target.nextElementSibling.classList.toggle('showMenu');
  }
}

taskLists.addEventListener('click', showDropdownMenu);

window.onclick = function (e) {
  if (!e.target.matches('.dropdownbtn')) {
    const dropdowns = document.querySelectorAll('.dropdown');

    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];

      if (openDropdown.classList.contains('showMenu')) {
        openDropdown.classList.remove('showMenu');
      }
    }
  }
};

function deleteTask(e) {
  if (e.target.classList.contains('del')) {
    const toDelTask = e.target.parentNode.parentNode;
    const toDelTaskId = toDelTask.classList.item(0);
    const toDelItems = document.querySelectorAll(".".concat(toDelTaskId));
    localStorage.removeItem(toDelTaskId);
    toDelItems.forEach(item => {
      item.remove();
    });
  }
}

taskLists.addEventListener('click', deleteTask);

function editTask(e) {
  if (e.target.classList.contains('edit')) {
    _tasks__WEBPACK_IMPORTED_MODULE_1__.CreateTask.showAddTask();
    const toEdit = e.target.parentNode.parentNode;
    _tasks__WEBPACK_IMPORTED_MODULE_1__.newTaskTitle.value = toEdit.children[0].children[2].textContent;
    _tasks__WEBPACK_IMPORTED_MODULE_1__.newTaskDes.value = toEdit.children[0].children[3].textContent;
    _tasks__WEBPACK_IMPORTED_MODULE_1__.newTaskDue.value = toEdit.children[0].children[4].textContent;
    _tasks__WEBPACK_IMPORTED_MODULE_1__.newTaskStar.checked = toEdit.children[0].children[5].textContent;
    _tasks__WEBPACK_IMPORTED_MODULE_1__.newTaskPriority.value = toEdit.children[0].children[6].textContent;
    const inProject = toEdit.classList.item(1);
    taskForm.classList.add("".concat(inProject));
    const toEditTaskId = toEdit.classList.item(0);
    const delItemsToEdit = document.querySelectorAll(".".concat(toEditTaskId));
    localStorage.removeItem(toEditTaskId);
    delItemsToEdit.forEach(item => {
      item.remove();
    });
    document.querySelector('.cancelbtn').type = 'submit';
  }
}

taskLists.addEventListener('click', editTask);
const taskBtns = document.querySelectorAll('.taskbtn');
taskBtns.forEach(tBtn => {
  tBtn.addEventListener('click', e => {
    _lists__WEBPACK_IMPORTED_MODULE_2__.ListsOfTasks.displayTasks(e);
  });
}); //Project

const addAProjectBtn = document.querySelector('.addProjectBtn');
addAProjectBtn.addEventListener('click', () => {
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.showAddProject();
});
const projectForm = document.querySelector('#projectForm');
projectForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const addAProject = new _projects__WEBPACK_IMPORTED_MODULE_3__.Project();
  addAProject.addProject();
});
const cancelAProjectBtn = document.querySelector('.cancelProject');
cancelAProjectBtn.addEventListener('click', () => {
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.cancelAddProject();
});
const projectMenus = document.querySelector('.projectList');
projectMenus.addEventListener('click', e => {
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.displayProject(e);
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.editProject(e);
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.saveProjectEdit(e);
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.cancelProjectEdit(e);
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.deleteProject(e);
  showDropdownMenu(e);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLE9BQU8sYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxZQUFZLE1B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O0VBQ0FRLDREQUFBLENBQXNCUixDQUF0QjtFQUNBcUgsZ0JBQWdCLENBQUNySCxDQUFELENBQWhCO0FBQ0gsQ0FQRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvbGlzdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb21wYXJlQXNjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb25zdGFudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3BhcnNlSVNPL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhc2ssIGxpc3RBbGxUYXNrcywgbGlzdFRvZGF5LCBsaXN0VXBjb21pbmcsIGxpc3RTdGFycmVkIH0gZnJvbSAnLi90YXNrcyc7XG5cbmNsYXNzIExpc3RzT2ZUYXNrcyBleHRlbmRzIFRhc2sge1xuICAgIHN0YXRpYyBjbGVhclRhc2tEaXNwbGF5ICgpIHtcbiAgICAgICAgY29uc3QgYWxsTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza0xpc3QgPiBkaXYnKTtcbiAgICAgICAgYWxsTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIGxpc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG4gICAgfSBcbiAgICBzdGF0aWMgZGlzcGxheVRhc2tzKGUpIHtcbiAgICAgICAgdGhpcy5jbGVhclRhc2tEaXNwbGF5KCk7XG5cbiAgICAgICAgY29uc3QgdGFza2J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza2J0bicpO1xuICAgICAgICB0YXNrYnRucy5mb3JFYWNoKHRidG4gPT4ge1xuICAgICAgICAgICAgdGJ0bi5jbGFzc05hbWUgPSB0YnRuLmNsYXNzTmFtZS5yZXBsYWNlKCcgYWN0aXZlJywgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGwnKSkge1xuICAgICAgICAgICAgbGlzdEFsbFRhc2tzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2UgaWYgKGUuY3VycmVudFRhcmdldCA9PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kYXknKSkge1xuICAgICAgICAgICAgbGlzdFRvZGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2UgaWYgKGUuY3VycmVudFRhcmdldCA9PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXBjb21pbmcnKSkge1xuICAgICAgICAgICAgbGlzdFVwY29taW5nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2UgaWYgKGUuY3VycmVudFRhcmdldCA9PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcicpKSB7XG4gICAgICAgICAgICBsaXN0U3RhcnJlZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgIH0gICBcbn1cblxuZXhwb3J0IHsgTGlzdHNPZlRhc2tzIH0iLCJpbXBvcnQgeyBMaXN0c09mVGFza3MgfSBmcm9tICcuL2xpc3RzJztcbmxldCBwcm9qZWN0SWQgPSAwO1xuY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdE5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lO1xuICAgIH1cbiAgICBzdGF0aWMgc2hvd0FkZFByb2plY3QoKSB7XG4gICAgICAgIGNvbnN0IGFkZEFQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Rm9ybScpO1xuICAgICAgICByZXR1cm4gYWRkQVByb2plY3RGb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgICBzdGF0aWMgY2FuY2VsQWRkUHJvamVjdCgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3ROYW1lJykudmFsdWUgPSAnJztcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Rm9ybScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIGFkZFByb2plY3QoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3ROYW1lJykudmFsdWU7XG4gICAgICAgIGlmIChwcm9qZWN0Rm9ybS5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgICAgIHByb2plY3RJZCArPSAxO1xuXG4gICAgICAgIGxldCBhUHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RGb3JtKTtcbiAgICAgICAgbGV0IGFQcm9qZWN0X3NlcmlhbCA9IEpTT04uc3RyaW5naWZ5KGFQcm9qZWN0KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHByb2plY3Qke3Byb2plY3RJZH1gLCBhUHJvamVjdF9zZXJpYWwpO1xuXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3UHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0QnRuJyk7XG4gICAgICAgIG5ld1Byb2plY3REaXYuaWQgPSBgJHtwcm9qZWN0SWR9YDtcbiAgICAgICAgbmV3UHJvamVjdERpdi5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAke3Byb2plY3RGb3JtfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSAnZHJvcGRvd25EaXYnPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkcm9wZG93bmJ0bic+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Ryb3Bkb3duJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J3JlbmFtZSc+UmVuYW1lPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWxQcm9qZWN0Jz5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdExpc3QnKTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobmV3UHJvamVjdERpdik7XG4gICAgICAgIC8vY3JlYXRlIHByb2plY3QgYW5kIGl0cyBsaW5rZWQgdGFza3MgZm9yIGRpc3BsYXlcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3UHJvamVjdExpc3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBuZXdQcm9qZWN0TGlzdC5pZCA9IGBwcm9qZWN0JHtwcm9qZWN0SWR9YDtcblxuICAgICAgICBMaXN0c09mVGFza3MuY2xlYXJUYXNrRGlzcGxheSgpO1xuICAgICAgICBuZXdQcm9qZWN0TGlzdC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPXByb2plY3RUaXRsZT4ke3Byb2plY3RGb3JtfTwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZEFUYXNrXCI+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaGVpZ2h0PVwiNDhcIiB3aWR0aD1cIjQ4XCI+PHBhdGggZD1cIk0yMi41IDM4VjI1LjVIMTB2LTNoMTIuNVYxMGgzdjEyLjVIMzh2M0gyNS41VjM4WlwiLz48L3N2Zz4gQWRkIGEgdGFzazwvYnV0dG9uPlxuICAgICAgICBgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrTGlzdCcpLmFwcGVuZENoaWxkKG5ld1Byb2plY3RMaXN0KTtcbiAgICAgICAgXG4gICAgICAgIG5ld1Byb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdEZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3ROYW1lJykudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGxheVByb2plY3QoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0QnRuJykpIHtcbiAgICAgICAgICAgIExpc3RzT2ZUYXNrcy5jbGVhclRhc2tEaXNwbGF5KCk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0QnRuJyk7XG4gICAgICAgICAgICBwcm9qZWN0QnRucy5mb3JFYWNoKHBCdG4gPT4ge1xuICAgICAgICAgICAgICAgIHBCdG4uY2xhc3NOYW1lID0gcEJ0bi5jbGFzc05hbWUucmVwbGFjZSgnIGFjdGl2ZScsICcnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsZXQgcHJvamVjdE4gPSBlLnRhcmdldC5pZDtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcm9qZWN0JHtwcm9qZWN0Tn1gKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIHN0YXRpYyBlZGl0UHJvamVjdChlKSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVuYW1lJykpIHtcbiAgICAgICAgICAgIC8vY2hhbmdlIHByb2plY3QgbmFtZSBvbiB0aGUgcGFuZWxcbiAgICAgICAgICAgIGNvbnN0IHRvUmVuYW1lID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBjb25zdCBlZGl0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGVkaXRGb3JtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncmVuYW1lRm9ybScpO1xuICAgICAgICAgICAgZWRpdEZvcm0uaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz0ncmVuYW1lQm94JyB2YWx1ZSA9ICR7dG9SZW5hbWUuZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKCl9ID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdzdWJtaXRFZGl0Jz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nc2F2ZU5ld05hbWUnPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdjYW5jZWxDaGFuZ2UnPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgdG9SZW5hbWUucmVwbGFjZUNoaWxkKGVkaXRGb3JtLCB0b1JlbmFtZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgc2F2ZVByb2plY3RFZGl0KGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2F2ZU5ld05hbWUnKSkge1xuICAgICAgICAgICAgY29uc3QgZWRpdFByb2plY3QgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGxldCBuZXdQcm9qZWN0TmFtZSA9IGVkaXRQcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoJy5yZW5hbWVCb3gnKTtcbiAgICAgICAgICAgIGxldCBuZXdQcm9qZWN0TmFtZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtuZXdQcm9qZWN0TmFtZS52YWx1ZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IHJlbmFtZUZvcm0gPSBlZGl0UHJvamVjdC5xdWVyeVNlbGVjdG9yKCcucmVuYW1lRm9ybScpO1xuICAgICAgICAgICAgZWRpdFByb2plY3QucmVwbGFjZUNoaWxkKG5ld1Byb2plY3ROYW1lTm9kZSwgcmVuYW1lRm9ybSk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwcm9qZWN0IG5hbWUgb24gZGlzcGxheVxuICAgICAgICAgICAgbGV0IHByb2plY3RPbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdCR7ZWRpdFByb2plY3QuaWR9IC5wcm9qZWN0VGl0bGVgKTtcbiAgICAgICAgICAgIHByb2plY3RPbkRpc3BsYXkudGV4dENvbnRlbnQgPSBuZXdQcm9qZWN0TmFtZS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgY2FuY2VsUHJvamVjdEVkaXQoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWxDaGFuZ2UnKSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFByb2plY3QgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdCR7Y3VycmVudFByb2plY3QuaWR9IC5wcm9qZWN0VGl0bGVgKS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUHJvamVjdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtvcmlnaW5hbFByb2plY3ROYW1lfWApO1xuICAgICAgICAgICAgY3VycmVudFByb2plY3QucmVwbGFjZUNoaWxkKG9yaWdpbmFsUHJvamVjdE5vZGUsIGN1cnJlbnRQcm9qZWN0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZVByb2plY3QoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxQcm9qZWN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvRGVsUHJvamVjdCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgY29uc3QgdG9EZWxQcm9qZWN0SWQgPSB0b0RlbFByb2plY3QuaWQ7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdCR7dG9EZWxQcm9qZWN0SWR9YCk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0b0RlbFByb2plY3RJZH1gKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgdGFza3MgaW4gbGlzdHNcbiAgICAgICAgICAgIGNvbnN0IHRvRGVsVGFza3NBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJvamVjdCR7dG9EZWxQcm9qZWN0SWR9YCk7XG4gICAgICAgICAgICBjb25zdCB0b0RlbFRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCNwcm9qZWN0JHt0b0RlbFByb2plY3RJZH0gLnByb2plY3Qke3RvRGVsUHJvamVjdElkfWApO1xuICAgICAgICAgICAgdG9EZWxUYXNrc0FsbC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9EZWxUYXNrc0xpc3QuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRTdG9yYWdlTmFtZSA9IHQuY2xhc3NMaXN0Lml0ZW0oMCk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odFN0b3JhZ2VOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBQcm9qZWN0IH07IiwiaW1wb3J0IHsgXG4gICAgY29tcGFyZUFzYywgXG4gICAgcGFyc2VJU08gXG59IGZyb20gJ2RhdGUtZm5zJztcblxuY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBzdGFycmVkKSB7XG4gICAgICAgIHRoaXMudGFza1RpdGxlID0gdGFza1RpdGxlXG4gICAgICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gdGFza0Rlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgICAgIHRoaXMuc3RhcnJlZCA9IHN0YXJyZWRcbiAgICB9XG59XG5cbmNvbnN0IG5ld1Rhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrVGl0bGUnKTtcbmNvbnN0IG5ld1Rhc2tEZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0RlcycpO1xuY29uc3QgbmV3VGFza0R1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG5jb25zdCBuZXdUYXNrU3RhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFycmVkVGFzaycpXG5jb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpb3JpdHknKTtcblxuY29uc3QgbGlzdEFsbFRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RBbGwnKTtcbmNvbnN0IGxpc3RUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0VG9kYXknKTtcbmNvbnN0IGxpc3RVcGNvbWluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0VXBjb21pbmcnKTtcbmNvbnN0IGxpc3RTdGFycmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RTdGFycmVkJyk7XG5cbmxldCB0SXRlbUlkID0gMDtcblxuY2xhc3MgQ3JlYXRlVGFzayBleHRlbmRzIFRhc2t7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBzdGFycmVkKSB7XG4gICAgICAgIHN1cGVyKHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgc3RhcnJlZClcbiAgICB9XG4gICAgc3RhdGljIHNob3dBZGRUYXNrKCkge1xuICAgICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRm9ybScpO1xuICAgICAgICByZXR1cm4gdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgc3RhdGljIGNhbmNlbEFkZFRhc2soKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0Zvcm0nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGZvcm1hdHRlZFRvZGF5KCkge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICAgICAgcmV0dXJuIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIH1cbiAgICBmb3JtYXR0ZWREdWUoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdER1ZSA9IHBhcnNlSVNPKGAke25ld1Rhc2tEdWUudmFsdWV9YCk7XG4gICAgICAgIHJldHVybiBmb3JtYXREdWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgfVxuICAgIHRhc2tMaXN0IChsaXN0RG9tLCB0SXRlbSwgdEl0ZW1JZCwgcHJvamVjdElEKSB7ICBcbiAgICAgICAgbGlzdERvbS5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPSd0YXNrJHt0SXRlbUlkfSAke3Byb2plY3RJRH0gdGFza0Rpdic+XG4gICAgICAgICAgICA8dWwgY2xhc3M9J3Rhc2snPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPSduZXdUJyB0eXBlPSdjaGVja2JveCcgaWQ9J25ld1Rhc2snPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9J25ld1Rhc2snPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSd0dGl0bGUnPiR7dEl0ZW0udGFza1RpdGxlfTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSd0ZGVzY3JpcHRpb24nPiR7dEl0ZW0udGFza0Rlc2NyaXB0aW9ufTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSd0ZHVlJz4ke3RJdGVtLmR1ZURhdGV9PC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9J3Rwcmlvcml0eSc+JHt0SXRlbS5wcmlvcml0eX08L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz0ndHN0YXIgJHt0SXRlbS5zdGFycmVkfSc+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkcm9wZG93bmJ0bic+PC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdkcm9wZG93bic+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2VkaXQnPiBFZGl0IDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWwnPiBEZWxldGUgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9XG4gICAgY2F0ZWdvcml6ZVRhc2sodCwgbiwgaWQpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVBc2ModGhpcy5mb3JtYXR0ZWREdWUoKSwgdGhpcy5mb3JtYXR0ZWRUb2RheSgpKSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0KGxpc3RUb2RheSwgdCwgbiwgaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXBhcmVBc2ModGhpcy5mb3JtYXR0ZWREdWUoKSwgdGhpcy5mb3JtYXR0ZWRUb2RheSgpKSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0KGxpc3RVcGNvbWluZywgdCwgbiwgaWQpO1xuICAgICAgICB9IFxuICAgICAgICBpZiAobmV3VGFza1N0YXIuY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0KGxpc3RTdGFycmVkLCB0LCBuLCBpZCk7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIHNhdmVUYXNrKGxpc3REb20sIHByb2plY3RJRCkge1xuICAgICAgICBpZiAobmV3VGFza1RpdGxlLnZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBhVGFzayA9IG5ldyBUYXNrKG5ld1Rhc2tUaXRsZS52YWx1ZSwgbmV3VGFza0Rlcy52YWx1ZSwgbmV3VGFza0R1ZS52YWx1ZSwgbmV3VGFza1ByaW9yaXR5LnZhbHVlLCBuZXdUYXNrU3Rhci5jaGVja2VkKTtcblxuICAgICAgICB0SXRlbUlkICs9MTtcbiAgICAgICAgdGhpcy50YXNrTGlzdChsaXN0RG9tLCBhVGFzaywgdEl0ZW1JZCwgcHJvamVjdElEKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBhVGFza19zZXJpYWwgPSBKU09OLnN0cmluZ2lmeShhVGFzayk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGB0YXNrJHt0SXRlbUlkfWAsIGFUYXNrX3NlcmlhbCk7XG5cbiAgICAgICAgdGhpcy5jYXRlZ29yaXplVGFzayhhVGFzaywgdEl0ZW1JZCwgcHJvamVjdElEKTtcblxuICAgICAgICBuZXdUYXNrVGl0bGUudmFsdWUgPSAnJztcbiAgICAgICAgbmV3VGFza0Rlcy52YWx1ZSA9ICcnO1xuICAgICAgICBuZXdUYXNrRHVlLnZhbHVlID0gJyc7XG4gICAgICAgIG5ld1Rhc2tTdGFyLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgbmV3VGFza1ByaW9yaXR5LnZhbHVlID0gJyc7XG5cbiAgICAgICAgdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG59XG5cbmV4cG9ydCB7IFRhc2ssIENyZWF0ZVRhc2ssIG5ld1Rhc2tUaXRsZSwgbmV3VGFza0RlcywgbmV3VGFza0R1ZSwgbmV3VGFza1ByaW9yaXR5LCBuZXdUYXNrU3RhciwgbGlzdEFsbFRhc2tzLCBsaXN0VG9kYXksIGxpc3RVcGNvbWluZywgbGlzdFN0YXJyZWQgfSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL2ZmZl90dXNqLXdlYmZvbnQud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL2ZmZl90dXNqLXdlYmZvbnQud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL3NyYy9pbWcvZG90TWVudS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2ltZy9jaGVjay5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2ltZy94LnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vaW1nL3N0YXIuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBmaXggZHJvcGRvd25tZW51IHBvc2l0aW9uICovXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdCgnd29mZicpO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbmJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIGNvbG9yOiBibGFjaztcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLmhlYWRlciwgLmZvb3RlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6Izk5OUI4NDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxufVxcbi50aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogNTBwdDtcXG4gICAgcGFkZGluZzogMzBweCAwO1xcbn1cXG4uZm9vdGVyIHtcXG4gICAgY29sb3I6ICNGNEVFRUQ7XFxuICAgIHBhZGRpbmc6IDhweCAwIDE1cHggMDtcXG59XFxuYSA+IHN2ZyB7XFxuICAgIHN0cm9rZTogI0Y0RUVFRDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDRweDtcXG4gICAgbGVmdDogMnB4O1xcbn1cXG5hID4gc3ZnIDpob3ZlciB7XFxuICAgIHN0cm9rZTogI0Q4QUM5QztcXG4gICAgZmlsbDogI0Q4QUM5QztcXG59XFxuXFxuLm1haW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4ucGFuZWwge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZEOUQxO1xcbiAgICBmbGV4OiAxO1xcbn1cXG4udGFza3Mge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG4uZGlzcGxheSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNEVFRUQ7XFxuICAgIGZsZXg6IDM7XFxufVxcbnRleHRhcmVhIHtcXG4gICAgcmVzaXplOiBub25lO1xcbn1cXG4ucGFuZWwgaW1nIHtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDAuNHJlbTtcXG59XFxuLnBhbmVsIGJ1dHRvbiB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRkQ5RDE7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIGZvbnQtc2l6ZTogMjBwdDtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgcGFkZGluZzogMC41cmVtIDJyZW07XFxufVxcblxcbmJ1dHRvbjpob3ZlciwgLnByb2plY3RCdG46aG92ZXIsIC5wcm9qZWN0QnRuOmhvdmVyIC5kcm9wZG93bmJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNEOEFDOUM7XFxufVxcblxcbi5wcm9qZWN0SGVhZGluZyB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgZm9udC1zaXplOiAzMHB0O1xcbiAgICBwYWRkaW5nOiAycmVtIDAgMnJlbSAycmVtO1xcbn1cXG4udGFza0hlYWRpbmcge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIGZvbnQtc2l6ZTogNDBwdDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgbWFyZ2luOiA1NXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0QnRuIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA0ZnIgMWZyO1xcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICAgIGZvbnQtc2l6ZTogMjBwdDtcXG4gICAgcGFkZGluZy1sZWZ0OiAycmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5kcm9wZG93bmJ0biB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgZGlzcGxheTogaW5oZXJpdDtcXG59XFxuZm9ybS5yZW5hbWVGb3JtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLnJlbmFtZUJveCB7XFxuICAgIGZvbnQtc2l6ZTogMTVwdDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y0RUVFRDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxufVxcbi5zdWJtaXRFZGl0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDUwcHg7XFxufVxcbi5zdWJtaXRFZGl0IGJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNEVFRUQ7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgfVxcbi5zdWJtaXRFZGl0IGJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNEOEFDOUM7XFxufVxcbi50YXNrRGl2IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uZHJvcGRvd25EaXYge1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmRyb3Bkb3duIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBtaW4td2lkdGg6IDUwcHg7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbmRpdi5zaG93TWVudSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uZHJvcGRvd24gYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y0RUVFRDtcXG4gICAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsMCwwLDAuMik7XFxufVxcbi50YXNrRGl2IC5kcm9wZG93bi5zaG93TWVudSB7XFxuICAgIHRvcDogNDRweDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcmlnaHQ6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xcbiAgICBsZWZ0OiAwO1xcbn1cXG5cXG4jcHJvamVjdEZvcm0ge1xcbiAgICBtYXJnaW46IDFyZW0gM3JlbSAwIDNyZW07XFxuICAgIGZvbnQtc2l6ZTogMTVwdDtcXG59XFxuI3Byb2plY3ROYW1lIHtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgfVxcbiNwcm9qZWN0Rm9ybSAuc2F2ZSB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5zYXZlIGJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxMDBweDtcXG59XFxuLnNhdmVOZXdOYW1lIHtcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKSBuby1yZXBlYXQ7XFxufVxcbi5jYW5jZWxDaGFuZ2Uge1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fICsgXCIpIG5vLXJlcGVhdDtcXG59XFxuYnV0dG9uLmNhbmNlbFByb2plY3QsIGJ1dHRvbi5hZGRQcm9qZWN0IHtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxuICAgIHdpZHRoOiA4cmVtO1xcbiAgICBtYXJnaW46IDAuNXJlbTtcXG4gICAgcGFkZGluZzogMC4ycmVtIDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBmb250LXNpemU6IDE1cHQ7XFxufVxcbmlucHV0LCB0ZXh0YXJlYSB7XFxuICAgIHBhZGRpbmc6IDJweCAxZW07XFxuICAgIGZvbnQtc2l6ZTogMTVwdDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y0RUVFRDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxufVxcblxcbi5wcm9qZWN0VGl0bGUge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIGZvbnQtc2l6ZTogNDBwdDtcXG4gICAgcGFkZGluZzogNDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uZGlzcGxheSBidXR0b24ge1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDE2cHQ7XFxuICAgIGJvcmRlcjogMXB0IHNvbGlkO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNEVFRUQ7XFxufVxcbi5kaXNwbGF5IC5hZGRBVGFzayB7XFxuICAgIG1hcmdpbjogMCAwIDIwcHggODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMCAxNXB4O1xcbn1cXG5cXG4uZGlzcGxheSBidXR0b246aG92ZXIsICNhZGRUYXNrIGJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNEOEFDOUM7XFxufVxcbi5zYXZlIHtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4jdGFza0Zvcm0ge1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDE2cHQ7XFxufVxcbmZpZWxkc2V0IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBtYXJnaW46IDAgNXJlbTtcXG59XFxuaW5wdXRbaWQ9J25ld1Rhc2snXTpjaGVja2VkfmxpLnR0aXRsZSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbiAgICBjb2xvcjpibGFjaztcXG59XFxuXFxuLnRhc2tMaXN0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcbn1cXG4udGFza0RpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMjBweDtcXG4gICAgcGFkZGluZzogMCA0MHB4O1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLnRhc2sge1xcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdhcDogMjBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IDE4MHB4IDZmciAzZnIgMWZyO1xcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICAgICAgXFxcIm9uZSB0d28gZm91ciBmaXZlIHNpeFxcXCJcXG4gICAgICAgIFxcXCJ0aHJlZSB0aHJlZSB0aHJlZSB0aHJlZSB0aHJlZVxcXCI7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleDogMTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbiAgICBtYXJnaW46IDA7XFxufVxcbi5hZGRBVGFzayBzdmcge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpO1xcbn1cXG4jbmV3VGFzayB7XFxuICAgIGdyaWQtYXJlYTogb25lO1xcbn1cXG4udHRpdGxlIHtcXG4gICAgZ3JpZC1hcmVhOiB0d287XFxufVxcbi50ZGVzY3JpcHRpb24ge1xcbiAgICBncmlkLWFyZWE6IHRocmVlO1xcbiAgICBwYWRkaW5nLWxlZnQ6IDNyZW07XFxuICAgIGNvbG9yOiByZ2IoOTcsIDk1LCA5NSk7XFxufVxcbi50ZHVlIHtcXG4gICAgZ3JpZC1hcmVhOiBmb3VyO1xcbn1cXG4udHByaW9yaXR5IHtcXG4gICAgZ3JpZC1hcmVhOiBmaXZlO1xcbn1cXG4udHN0YXIge1xcbiAgICBncmlkLWFyZWE6IHNpeDtcXG59XFxuLnRydWUge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgd2lkdGg6IDIwcHg7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsOEJBQThCO0FBQzlCO0lBQ0ksMkJBQTJCO0lBQzNCOytEQUN3RDtJQUN4RCxtQkFBbUI7SUFDbkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksU0FBUztJQUNULHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixpQ0FBaUM7SUFDakMsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixrQkFBa0I7SUFDbEIsMkJBQTJCO0FBQy9CO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsZUFBZTtBQUNuQjtBQUNBO0lBQ0ksY0FBYztJQUNkLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGtC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QUNiLDhCQUE4QjtBQUNsQztBQUNBO0lBQ0ksYUFBYTtJQUNiLFNBQVM7SUFDVCxlQUFlO0lBQ2YsdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxxQkFBcUI7SUFDckIsYUFBYTtJQUNiLFNBQVM7SUFDVCw2Q0FBNkM7SUFDN0M7O3VDQUVtQztJQUNuQywyQkFBMkI7SUFDM0IsbUJBQW1CO0lBQ25CLE9BQU87SUFDUCxlQUFlO0lBQ2YsU0FBUztBQUNiO0FBQ0E7SUFDSSxzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsc0JBQXNCO0FBQzFCO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxjQUFjO0FBQ2xCO0FBQ0E7SUFDSSx5REFBcUM7SUFDckMsd0JBQXdCO0lBQ3hCLDRCQUE0QjtJQUM1QixZQUFZO0lBQ1osV0FBVztBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGZpeCBkcm9wZG93bm1lbnUgcG9zaXRpb24gKi9cXG5AZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBzcmM6IHVybCgnLi9mb250cy9mZmZfdHVzai13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICAgICAgIHVybCgnLi9mb250cy9mZmZfdHVzai13ZWJmb250LndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBjb2xvcjogYmxhY2s7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxuICAgIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5oZWFkZXIsIC5mb290ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiM5OTlCODQ7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbn1cXG4udGl0bGUge1xcbiAgICBmb250LXNpemU6IDUwcHQ7XFxuICAgIHBhZGRpbmc6IDMwcHggMDtcXG59XFxuLmZvb3RlciB7XFxuICAgIGNvbG9yOiAjRjRFRUVEO1xcbiAgICBwYWRkaW5nOiA4cHggMCAxNXB4IDA7XFxufVxcbmEgPiBzdmcge1xcbiAgICBzdHJva2U6ICNGNEVFRUQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA0cHg7XFxuICAgIGxlZnQ6IDJweDtcXG59XFxuYSA+IHN2ZyA6aG92ZXIge1xcbiAgICBzdHJva2U6ICNEOEFDOUM7XFxuICAgIGZpbGw6ICNEOEFDOUM7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLnBhbmVsIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0VGRDlEMTtcXG4gICAgZmxleDogMTtcXG59XFxuLnRhc2tzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuLmRpc3BsYXkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjRFRUVEO1xcbiAgICBmbGV4OiAzO1xcbn1cXG50ZXh0YXJlYSB7XFxuICAgIHJlc2l6ZTogbm9uZTtcXG59XFxuLnBhbmVsIGltZyB7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiAwLjRyZW07XFxufVxcbi5wYW5lbCBidXR0b24ge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZEOUQxO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBmb250LXNpemU6IDIwcHQ7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAycmVtO1xcbn1cXG5cXG5idXR0b246aG92ZXIsIC5wcm9qZWN0QnRuOmhvdmVyLCAucHJvamVjdEJ0bjpob3ZlciAuZHJvcGRvd25idG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDhBQzlDO1xcbn1cXG5cXG4ucHJvamVjdEhlYWRpbmcge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIGZvbnQtc2l6ZTogMzBwdDtcXG4gICAgcGFkZGluZzogMnJlbSAwIDJyZW0gMnJlbTtcXG59XFxuLnRhc2tIZWFkaW5nIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBmb250LXNpemU6IDQwcHQ7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIG1hcmdpbjogNTVweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ucHJvamVjdEJ0biB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNGZyIDFmcjtcXG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgICBmb250LXNpemU6IDIwcHQ7XFxuICAgIHBhZGRpbmctbGVmdDogMnJlbTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4uZHJvcGRvd25idG4ge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltZy9kb3RNZW51LnN2Zyk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgZGlzcGxheTogaW5oZXJpdDtcXG59XFxuZm9ybS5yZW5hbWVGb3JtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLnJlbmFtZUJveCB7XFxuICAgIGZvbnQtc2l6ZTogMTVwdDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y0RUVFRDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxufVxcbi5zdWJtaXRFZGl0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDUwcHg7XFxufVxcbi5zdWJtaXRFZGl0IGJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNEVFRUQ7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgfVxcbi5zdWJtaXRFZGl0IGJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNEOEFDOUM7XFxufVxcbi50YXNrRGl2IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uZHJvcGRvd25EaXYge1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmRyb3Bkb3duIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBtaW4td2lkdGg6IDUwcHg7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbmRpdi5zaG93TWVudSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uZHJvcGRvd24gYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y0RUVFRDtcXG4gICAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsMCwwLDAuMik7XFxufVxcbi50YXNrRGl2IC5kcm9wZG93bi5zaG93TWVudSB7XFxuICAgIHRvcDogNDRweDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcmlnaHQ6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xcbiAgICBsZWZ0OiAwO1xcbn1cXG5cXG4jcHJvamVjdEZvcm0ge1xcbiAgICBtYXJnaW46IDFyZW0gM3JlbSAwIDNyZW07XFxuICAgIGZvbnQtc2l6ZTogMTVwdDtcXG59XFxuI3Byb2plY3ROYW1lIHtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgfVxcbiNwcm9qZWN0Rm9ybSAuc2F2ZSB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5zYXZlIGJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxMDBweDtcXG59XFxuLnNhdmVOZXdOYW1lIHtcXG4gICAgYmFja2dyb3VuZDogdXJsKC4vaW1nL2NoZWNrLnN2Zykgbm8tcmVwZWF0O1xcbn1cXG4uY2FuY2VsQ2hhbmdlIHtcXG4gICAgYmFja2dyb3VuZDogdXJsKC4vaW1nL3guc3ZnKSBuby1yZXBlYXQ7XFxufVxcbmJ1dHRvbi5jYW5jZWxQcm9qZWN0LCBidXR0b24uYWRkUHJvamVjdCB7XFxuICAgIGJvcmRlcjogc29saWQgMXB4IGJsYWNrO1xcbiAgICB3aWR0aDogOHJlbTtcXG4gICAgbWFyZ2luOiAwLjVyZW07XFxuICAgIHBhZGRpbmc6IDAuMnJlbSAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgZm9udC1zaXplOiAxNXB0O1xcbn1cXG5pbnB1dCwgdGV4dGFyZWEge1xcbiAgICBwYWRkaW5nOiAycHggMWVtO1xcbiAgICBmb250LXNpemU6IDE1cHQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNEVFRUQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4IGJsYWNrO1xcbn1cXG5cXG4ucHJvamVjdFRpdGxlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBmb250LXNpemU6IDQwcHQ7XFxuICAgIHBhZGRpbmc6IDQwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmRpc3BsYXkgYnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbiAgICBib3JkZXI6IDFwdCBzb2xpZDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjRFRUVEO1xcbn1cXG4uZGlzcGxheSAuYWRkQVRhc2sge1xcbiAgICBtYXJnaW46IDAgMCAyMHB4IDgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDAgMTVweDtcXG59XFxuXFxuLmRpc3BsYXkgYnV0dG9uOmhvdmVyLCAjYWRkVGFzayBidXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDhBQzlDO1xcbn1cXG4uc2F2ZSB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG59XFxuI3Rhc2tGb3JtIHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbn1cXG5maWVsZHNldCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdhcDogMTBweDtcXG4gICAgbWFyZ2luOiAwIDVyZW07XFxufVxcbmlucHV0W2lkPSduZXdUYXNrJ106Y2hlY2tlZH5saS50dGl0bGUge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG4gICAgY29sb3I6YmxhY2s7XFxufVxcblxcbi50YXNrTGlzdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG59XFxuLnRhc2tEaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIHBhZGRpbmc6IDAgNDBweDtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcbi50YXNrIHtcXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCAxODBweCA2ZnIgM2ZyIDFmcjtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgICAgIFxcXCJvbmUgdHdvIGZvdXIgZml2ZSBzaXhcXFwiXFxuICAgICAgICBcXFwidGhyZWUgdGhyZWUgdGhyZWUgdGhyZWUgdGhyZWVcXFwiO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXg6IDE7XFxuICAgIGZvbnQtc2l6ZTogMTZwdDtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG4uYWRkQVRhc2sgc3ZnIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KTtcXG59XFxuI25ld1Rhc2sge1xcbiAgICBncmlkLWFyZWE6IG9uZTtcXG59XFxuLnR0aXRsZSB7XFxuICAgIGdyaWQtYXJlYTogdHdvO1xcbn1cXG4udGRlc2NyaXB0aW9uIHtcXG4gICAgZ3JpZC1hcmVhOiB0aHJlZTtcXG4gICAgcGFkZGluZy1sZWZ0OiAzcmVtO1xcbiAgICBjb2xvcjogcmdiKDk3LCA5NSwgOTUpO1xcbn1cXG4udGR1ZSB7XFxuICAgIGdyaWQtYXJlYTogZm91cjtcXG59XFxuLnRwcmlvcml0eSB7XFxuICAgIGdyaWQtYXJlYTogZml2ZTtcXG59XFxuLnRzdGFyIHtcXG4gICAgZ3JpZC1hcmVhOiBzaXg7XFxufVxcbi50cnVlIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1nL3N0YXIuc3ZnKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIHdpZHRoOiAyMHB4O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0ludGVnZXIoZGlydHlOdW1iZXIpIHtcbiAgaWYgKGRpcnR5TnVtYmVyID09PSBudWxsIHx8IGRpcnR5TnVtYmVyID09PSB0cnVlIHx8IGRpcnR5TnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXI7XG4gIH1cblxuICByZXR1cm4gbnVtYmVyIDwgMCA/IE1hdGguY2VpbChudW1iZXIpIDogTWF0aC5mbG9vcihudW1iZXIpO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgY29tcGFyZUFzY1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAtMSwgMCBvciAxLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kLFxuICogLTEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmQgb3IgMCBpZiBkYXRlcyBhcmUgZXF1YWwuXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgcmVzdWx0IG9mIHRoZSBjb21wYXJpc29uXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbXBhcmUgMTEgRmVicnVhcnkgMTk4NyBhbmQgMTAgSnVseSAxOTg5OlxuICogY29uc3QgcmVzdWx0ID0gY29tcGFyZUFzYyhuZXcgRGF0ZSgxOTg3LCAxLCAxMSksIG5ldyBEYXRlKDE5ODksIDYsIDEwKSlcbiAqIC8vPT4gLTFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXM6XG4gKiBjb25zdCByZXN1bHQgPSBbXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogXS5zb3J0KGNvbXBhcmVBc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICogLy8gXVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBhcmVBc2MoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eURhdGVMZWZ0KTtcbiAgdmFyIGRhdGVSaWdodCA9IHRvRGF0ZShkaXJ0eURhdGVSaWdodCk7XG4gIHZhciBkaWZmID0gZGF0ZUxlZnQuZ2V0VGltZSgpIC0gZGF0ZVJpZ2h0LmdldFRpbWUoKTtcblxuICBpZiAoZGlmZiA8IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICByZXR1cm4gMTsgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cbn0iLCIvKipcbiAqIERheXMgaW4gMSB3ZWVrLlxuICpcbiAqIEBuYW1lIGRheXNJbldlZWtcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cbmV4cG9ydCB2YXIgZGF5c0luV2VlayA9IDc7XG4vKipcbiAqIE1heGltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBuYW1lIG1heFRpbWVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtYXhUaW1lID0gTWF0aC5wb3coMTAsIDgpICogMjQgKiA2MCAqIDYwICogMTAwMDtcbi8qKlxuICogTWlsbGlzZWNvbmRzIGluIDEgbWludXRlXG4gKlxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5NaW51dGVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaWxsaXNlY29uZHNJbk1pbnV0ZSA9IDYwMDAwO1xuLyoqXG4gKiBNaWxsaXNlY29uZHMgaW4gMSBob3VyXG4gKlxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5Ib3VyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5Ib3VyID0gMzYwMDAwMDtcbi8qKlxuICogTWlsbGlzZWNvbmRzIGluIDEgc2Vjb25kXG4gKlxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5TZWNvbmRcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaWxsaXNlY29uZHNJblNlY29uZCA9IDEwMDA7XG4vKipcbiAqIE1pbmltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBuYW1lIG1pblRpbWVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaW5UaW1lID0gLW1heFRpbWU7XG4vKipcbiAqIE1pbnV0ZXMgaW4gMSBob3VyXG4gKlxuICogQG5hbWUgbWludXRlc0luSG91clxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pbnV0ZXNJbkhvdXIgPSA2MDtcbi8qKlxuICogTW9udGhzIGluIDEgcXVhcnRlclxuICpcbiAqIEBuYW1lIG1vbnRoc0luUXVhcnRlclxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1vbnRoc0luUXVhcnRlciA9IDM7XG4vKipcbiAqIE1vbnRocyBpbiAxIHllYXJcbiAqXG4gKiBAbmFtZSBtb250aHNJblllYXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtb250aHNJblllYXIgPSAxMjtcbi8qKlxuICogUXVhcnRlcnMgaW4gMSB5ZWFyXG4gKlxuICogQG5hbWUgcXVhcnRlcnNJblllYXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBxdWFydGVyc0luWWVhciA9IDQ7XG4vKipcbiAqIFNlY29uZHMgaW4gMSBob3VyXG4gKlxuICogQG5hbWUgc2Vjb25kc0luSG91clxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIHNlY29uZHNJbkhvdXIgPSAzNjAwO1xuLyoqXG4gKiBTZWNvbmRzIGluIDEgbWludXRlXG4gKlxuICogQG5hbWUgc2Vjb25kc0luTWludXRlXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgc2Vjb25kc0luTWludXRlID0gNjA7IiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5Ib3VyLCBtaWxsaXNlY29uZHNJbk1pbnV0ZSB9IGZyb20gXCIuLi9jb25zdGFudHMvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBwYXJzZUlTT1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBQYXJzZSBJU08gc3RyaW5nXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gc3RyaW5nIGluIElTTyA4NjAxIGZvcm1hdCBhbmQgcmV0dXJuIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpc24ndCBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIGNhbm5vdCBwYXJzZSB0aGUgc3RyaW5nIG9yXG4gKiB0aGUgdmFsdWVzIGFyZSBpbnZhbGlkLCBpdCByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIC0gVGhlIHByZXZpb3VzIGBwYXJzZWAgaW1wbGVtZW50YXRpb24gd2FzIHJlbmFtZWQgdG8gYHBhcnNlSVNPYC5cbiAqXG4gKiAgIGBgYGphdmFzY3JpcHRcbiAqICAgLy8gQmVmb3JlIHYyLjAuMFxuICogICBwYXJzZSgnMjAxNi0wMS0wMScpXG4gKlxuICogICAvLyB2Mi4wLjAgb253YXJkXG4gKiAgIHBhcnNlSVNPKCcyMDE2LTAxLTAxJylcbiAqICAgYGBgXG4gKlxuICogLSBgcGFyc2VJU09gIG5vdyB2YWxpZGF0ZXMgc2VwYXJhdGUgZGF0ZSBhbmQgdGltZSB2YWx1ZXMgaW4gSVNPLTg2MDEgc3RyaW5nc1xuICogICBhbmQgcmV0dXJucyBgSW52YWxpZCBEYXRlYCBpZiB0aGUgZGF0ZSBpcyBpbnZhbGlkLlxuICpcbiAqICAgYGBgamF2YXNjcmlwdFxuICogICBwYXJzZUlTTygnMjAxOC0xMy0zMicpXG4gKiAgIC8vPT4gSW52YWxpZCBEYXRlXG4gKiAgIGBgYFxuICpcbiAqIC0gYHBhcnNlSVNPYCBub3cgZG9lc24ndCBmYWxsIGJhY2sgdG8gYG5ldyBEYXRlYCBjb25zdHJ1Y3RvclxuICogICBpZiBpdCBmYWlscyB0byBwYXJzZSBhIHN0cmluZyBhcmd1bWVudC4gSW5zdGVhZCwgaXQgcmV0dXJucyBgSW52YWxpZCBEYXRlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHBhcnNlSVNPKCcyMDE0LTAyLTExVDExOjMwOjMwJylcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgc3RyaW5nICcrMDIwMTQxMDEnIHRvIGRhdGUsXG4gKiAvLyBpZiB0aGUgYWRkaXRpb25hbCBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBleHRlbmRlZCB5ZWFyIGZvcm1hdCBpcyAxOlxuICogY29uc3QgcmVzdWx0ID0gcGFyc2VJU08oJyswMjAxNDEwMScsIHsgYWRkaXRpb25hbERpZ2l0czogMSB9KVxuICogLy89PiBGcmkgQXByIDExIDIwMTQgMDA6MDA6MDBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUlTTyhhcmd1bWVudCwgZGlydHlPcHRpb25zKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fTtcbiAgdmFyIGFkZGl0aW9uYWxEaWdpdHMgPSBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHMgPT0gbnVsbCA/IDIgOiB0b0ludGVnZXIob3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzKTtcblxuICBpZiAoYWRkaXRpb25hbERpZ2l0cyAhPT0gMiAmJiBhZGRpdGlvbmFsRGlnaXRzICE9PSAxICYmIGFkZGl0aW9uYWxEaWdpdHMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignYWRkaXRpb25hbERpZ2l0cyBtdXN0IGJlIDAsIDEgb3IgMicpO1xuICB9XG5cbiAgaWYgKCEodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpID09PSAnW29iamVjdCBTdHJpbmddJykpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIHZhciBkYXRlU3RyaW5ncyA9IHNwbGl0RGF0ZVN0cmluZyhhcmd1bWVudCk7XG4gIHZhciBkYXRlO1xuXG4gIGlmIChkYXRlU3RyaW5ncy5kYXRlKSB7XG4gICAgdmFyIHBhcnNlWWVhclJlc3VsdCA9IHBhcnNlWWVhcihkYXRlU3RyaW5ncy5kYXRlLCBhZGRpdGlvbmFsRGlnaXRzKTtcbiAgICBkYXRlID0gcGFyc2VEYXRlKHBhcnNlWWVhclJlc3VsdC5yZXN0RGF0ZVN0cmluZywgcGFyc2VZZWFyUmVzdWx0LnllYXIpO1xuICB9XG5cbiAgaWYgKCFkYXRlIHx8IGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICB2YXIgdGltZSA9IDA7XG4gIHZhciBvZmZzZXQ7XG5cbiAgaWYgKGRhdGVTdHJpbmdzLnRpbWUpIHtcbiAgICB0aW1lID0gcGFyc2VUaW1lKGRhdGVTdHJpbmdzLnRpbWUpO1xuXG4gICAgaWYgKGlzTmFOKHRpbWUpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGF0ZVN0cmluZ3MudGltZXpvbmUpIHtcbiAgICBvZmZzZXQgPSBwYXJzZVRpbWV6b25lKGRhdGVTdHJpbmdzLnRpbWV6b25lKTtcblxuICAgIGlmIChpc05hTihvZmZzZXQpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRpcnR5RGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUpOyAvLyBqcyBwYXJzZWQgc3RyaW5nIGFzc3VtaW5nIGl0J3MgaW4gVVRDIHRpbWV6b25lXG4gICAgLy8gYnV0IHdlIG5lZWQgaXQgdG8gYmUgcGFyc2VkIGluIG91ciB0aW1lem9uZVxuICAgIC8vIHNvIHdlIHVzZSB1dGMgdmFsdWVzIHRvIGJ1aWxkIGRhdGUgaW4gb3VyIHRpbWV6b25lLlxuICAgIC8vIFllYXIgdmFsdWVzIGZyb20gMCB0byA5OSBtYXAgdG8gdGhlIHllYXJzIDE5MDAgdG8gMTk5OVxuICAgIC8vIHNvIHNldCB5ZWFyIGV4cGxpY2l0bHkgd2l0aCBzZXRGdWxsWWVhci5cblxuICAgIHZhciByZXN1bHQgPSBuZXcgRGF0ZSgwKTtcbiAgICByZXN1bHQuc2V0RnVsbFllYXIoZGlydHlEYXRlLmdldFVUQ0Z1bGxZZWFyKCksIGRpcnR5RGF0ZS5nZXRVVENNb250aCgpLCBkaXJ0eURhdGUuZ2V0VVRDRGF0ZSgpKTtcbiAgICByZXN1bHQuc2V0SG91cnMoZGlydHlEYXRlLmdldFVUQ0hvdXJzKCksIGRpcnR5RGF0ZS5nZXRVVENNaW51dGVzKCksIGRpcnR5RGF0ZS5nZXRVVENTZWNvbmRzKCksIGRpcnR5RGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0KTtcbn1cbnZhciBwYXR0ZXJucyA9IHtcbiAgZGF0ZVRpbWVEZWxpbWl0ZXI6IC9bVCBdLyxcbiAgdGltZVpvbmVEZWxpbWl0ZXI6IC9bWiBdL2ksXG4gIHRpbWV6b25lOiAvKFtaKy1dLiopJC9cbn07XG52YXIgZGF0ZVJlZ2V4ID0gL14tPyg/OihcXGR7M30pfChcXGR7Mn0pKD86LT8oXFxkezJ9KSk/fFcoXFxkezJ9KSg/Oi0/KFxcZHsxfSkpP3wpJC87XG52YXIgdGltZVJlZ2V4ID0gL14oXFxkezJ9KD86Wy4sXVxcZCopPykoPzo6PyhcXGR7Mn0oPzpbLixdXFxkKik/KSk/KD86Oj8oXFxkezJ9KD86Wy4sXVxcZCopPykpPyQvO1xudmFyIHRpbWV6b25lUmVnZXggPSAvXihbKy1dKShcXGR7Mn0pKD86Oj8oXFxkezJ9KSk/JC87XG5cbmZ1bmN0aW9uIHNwbGl0RGF0ZVN0cmluZyhkYXRlU3RyaW5nKSB7XG4gIHZhciBkYXRlU3RyaW5ncyA9IHt9O1xuICB2YXIgYXJyYXkgPSBkYXRlU3RyaW5nLnNwbGl0KHBhdHRlcm5zLmRhdGVUaW1lRGVsaW1pdGVyKTtcbiAgdmFyIHRpbWVTdHJpbmc7IC8vIFRoZSByZWdleCBtYXRjaCBzaG91bGQgb25seSByZXR1cm4gYXQgbWF4aW11bSB0d28gYXJyYXkgZWxlbWVudHMuXG4gIC8vIFtkYXRlXSwgW3RpbWVdLCBvciBbZGF0ZSwgdGltZV0uXG5cbiAgaWYgKGFycmF5Lmxlbmd0aCA+IDIpIHtcbiAgICByZXR1cm4gZGF0ZVN0cmluZ3M7XG4gIH1cblxuICBpZiAoLzovLnRlc3QoYXJyYXlbMF0pKSB7XG4gICAgdGltZVN0cmluZyA9IGFycmF5WzBdO1xuICB9IGVsc2Uge1xuICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBhcnJheVswXTtcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMV07XG5cbiAgICBpZiAocGF0dGVybnMudGltZVpvbmVEZWxpbWl0ZXIudGVzdChkYXRlU3RyaW5ncy5kYXRlKSkge1xuICAgICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IGRhdGVTdHJpbmcuc3BsaXQocGF0dGVybnMudGltZVpvbmVEZWxpbWl0ZXIpWzBdO1xuICAgICAgdGltZVN0cmluZyA9IGRhdGVTdHJpbmcuc3Vic3RyKGRhdGVTdHJpbmdzLmRhdGUubGVuZ3RoLCBkYXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcpIHtcbiAgICB2YXIgdG9rZW4gPSBwYXR0ZXJucy50aW1lem9uZS5leGVjKHRpbWVTdHJpbmcpO1xuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZy5yZXBsYWNlKHRva2VuWzFdLCAnJyk7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lem9uZSA9IHRva2VuWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0ZVN0cmluZ3M7XG59XG5cbmZ1bmN0aW9uIHBhcnNlWWVhcihkYXRlU3RyaW5nLCBhZGRpdGlvbmFsRGlnaXRzKSB7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJ14oPzooXFxcXGR7NH18WystXVxcXFxkeycgKyAoNCArIGFkZGl0aW9uYWxEaWdpdHMpICsgJ30pfChcXFxcZHsyfXxbKy1dXFxcXGR7JyArICgyICsgYWRkaXRpb25hbERpZ2l0cykgKyAnfSkkKScpO1xuICB2YXIgY2FwdHVyZXMgPSBkYXRlU3RyaW5nLm1hdGNoKHJlZ2V4KTsgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcblxuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4ge1xuICAgIHllYXI6IE5hTixcbiAgICByZXN0RGF0ZVN0cmluZzogJydcbiAgfTtcbiAgdmFyIHllYXIgPSBjYXB0dXJlc1sxXSA/IHBhcnNlSW50KGNhcHR1cmVzWzFdKSA6IG51bGw7XG4gIHZhciBjZW50dXJ5ID0gY2FwdHVyZXNbMl0gPyBwYXJzZUludChjYXB0dXJlc1syXSkgOiBudWxsOyAvLyBlaXRoZXIgeWVhciBvciBjZW50dXJ5IGlzIG51bGwsIG5vdCBib3RoXG5cbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBjZW50dXJ5ID09PSBudWxsID8geWVhciA6IGNlbnR1cnkgKiAxMDAsXG4gICAgcmVzdERhdGVTdHJpbmc6IGRhdGVTdHJpbmcuc2xpY2UoKGNhcHR1cmVzWzFdIHx8IGNhcHR1cmVzWzJdKS5sZW5ndGgpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlU3RyaW5nLCB5ZWFyKSB7XG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIGlmICh5ZWFyID09PSBudWxsKSByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgdmFyIGNhcHR1cmVzID0gZGF0ZVN0cmluZy5tYXRjaChkYXRlUmVnZXgpOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgc3RyaW5nXG5cbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIHZhciBpc1dlZWtEYXRlID0gISFjYXB0dXJlc1s0XTtcbiAgdmFyIGRheU9mWWVhciA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbMV0pO1xuICB2YXIgbW9udGggPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzJdKSAtIDE7XG4gIHZhciBkYXkgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzNdKTtcbiAgdmFyIHdlZWsgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzRdKTtcbiAgdmFyIGRheU9mV2VlayA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbNV0pIC0gMTtcblxuICBpZiAoaXNXZWVrRGF0ZSkge1xuICAgIGlmICghdmFsaWRhdGVXZWVrRGF0ZSh5ZWFyLCB3ZWVrLCBkYXlPZldlZWspKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF5T2ZJU09XZWVrWWVhcih5ZWFyLCB3ZWVrLCBkYXlPZldlZWspO1xuICB9IGVsc2Uge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMCk7XG5cbiAgICBpZiAoIXZhbGlkYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF5KSB8fCAhdmFsaWRhdGVEYXlPZlllYXJEYXRlKHllYXIsIGRheU9mWWVhcikpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cblxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgbW9udGgsIE1hdGgubWF4KGRheU9mWWVhciwgZGF5KSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlVW5pdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPyBwYXJzZUludCh2YWx1ZSkgOiAxO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWUodGltZVN0cmluZykge1xuICB2YXIgY2FwdHVyZXMgPSB0aW1lU3RyaW5nLm1hdGNoKHRpbWVSZWdleCk7XG4gIGlmICghY2FwdHVyZXMpIHJldHVybiBOYU47IC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB0aW1lXG5cbiAgdmFyIGhvdXJzID0gcGFyc2VUaW1lVW5pdChjYXB0dXJlc1sxXSk7XG4gIHZhciBtaW51dGVzID0gcGFyc2VUaW1lVW5pdChjYXB0dXJlc1syXSk7XG4gIHZhciBzZWNvbmRzID0gcGFyc2VUaW1lVW5pdChjYXB0dXJlc1szXSk7XG5cbiAgaWYgKCF2YWxpZGF0ZVRpbWUoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuXG4gIHJldHVybiBob3VycyAqIG1pbGxpc2Vjb25kc0luSG91ciArIG1pbnV0ZXMgKiBtaWxsaXNlY29uZHNJbk1pbnV0ZSArIHNlY29uZHMgKiAxMDAwO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWVVbml0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiBwYXJzZUZsb2F0KHZhbHVlLnJlcGxhY2UoJywnLCAnLicpKSB8fCAwO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWV6b25lKHRpbWV6b25lU3RyaW5nKSB7XG4gIGlmICh0aW1lem9uZVN0cmluZyA9PT0gJ1onKSByZXR1cm4gMDtcbiAgdmFyIGNhcHR1cmVzID0gdGltZXpvbmVTdHJpbmcubWF0Y2godGltZXpvbmVSZWdleCk7XG4gIGlmICghY2FwdHVyZXMpIHJldHVybiAwO1xuICB2YXIgc2lnbiA9IGNhcHR1cmVzWzFdID09PSAnKycgPyAtMSA6IDE7XG4gIHZhciBob3VycyA9IHBhcnNlSW50KGNhcHR1cmVzWzJdKTtcbiAgdmFyIG1pbnV0ZXMgPSBjYXB0dXJlc1szXSAmJiBwYXJzZUludChjYXB0dXJlc1szXSkgfHwgMDtcblxuICBpZiAoIXZhbGlkYXRlVGltZXpvbmUoaG91cnMsIG1pbnV0ZXMpKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuXG4gIHJldHVybiBzaWduICogKGhvdXJzICogbWlsbGlzZWNvbmRzSW5Ib3VyICsgbWludXRlcyAqIG1pbGxpc2Vjb25kc0luTWludXRlKTtcbn1cblxuZnVuY3Rpb24gZGF5T2ZJU09XZWVrWWVhcihpc29XZWVrWWVhciwgd2VlaywgZGF5KSB7XG4gIHZhciBkYXRlID0gbmV3IERhdGUoMCk7XG4gIGRhdGUuc2V0VVRDRnVsbFllYXIoaXNvV2Vla1llYXIsIDAsIDQpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5RGF5ID0gZGF0ZS5nZXRVVENEYXkoKSB8fCA3O1xuICB2YXIgZGlmZiA9ICh3ZWVrIC0gMSkgKiA3ICsgZGF5ICsgMSAtIGZvdXJ0aE9mSmFudWFyeURheTtcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgZGlmZik7XG4gIHJldHVybiBkYXRlO1xufSAvLyBWYWxpZGF0aW9uIGZ1bmN0aW9uc1xuLy8gRmVicnVhcnkgaXMgbnVsbCB0byBoYW5kbGUgdGhlIGxlYXAgeWVhciAodXNpbmcgfHwpXG5cblxudmFyIGRheXNJbk1vbnRocyA9IFszMSwgbnVsbCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xuXG5mdW5jdGlvbiBpc0xlYXBZZWFySW5kZXgoeWVhcikge1xuICByZXR1cm4geWVhciAlIDQwMCA9PT0gMCB8fCB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZURhdGUoeWVhciwgbW9udGgsIGRhdGUpIHtcbiAgcmV0dXJuIG1vbnRoID49IDAgJiYgbW9udGggPD0gMTEgJiYgZGF0ZSA+PSAxICYmIGRhdGUgPD0gKGRheXNJbk1vbnRoc1ttb250aF0gfHwgKGlzTGVhcFllYXJJbmRleCh5ZWFyKSA/IDI5IDogMjgpKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXlPZlllYXJEYXRlKHllYXIsIGRheU9mWWVhcikge1xuICByZXR1cm4gZGF5T2ZZZWFyID49IDEgJiYgZGF5T2ZZZWFyIDw9IChpc0xlYXBZZWFySW5kZXgoeWVhcikgPyAzNjYgOiAzNjUpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdlZWtEYXRlKF95ZWFyLCB3ZWVrLCBkYXkpIHtcbiAgcmV0dXJuIHdlZWsgPj0gMSAmJiB3ZWVrIDw9IDUzICYmIGRheSA+PSAwICYmIGRheSA8PSA2O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVRpbWUoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpIHtcbiAgaWYgKGhvdXJzID09PSAyNCkge1xuICAgIHJldHVybiBtaW51dGVzID09PSAwICYmIHNlY29uZHMgPT09IDA7XG4gIH1cblxuICByZXR1cm4gc2Vjb25kcyA+PSAwICYmIHNlY29uZHMgPCA2MCAmJiBtaW51dGVzID49IDAgJiYgbWludXRlcyA8IDYwICYmIGhvdXJzID49IDAgJiYgaG91cnMgPCAyNTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVUaW1lem9uZShfaG91cnMsIG1pbnV0ZXMpIHtcbiAgcmV0dXJuIG1pbnV0ZXMgPj0gMCAmJiBtaW51dGVzIDw9IDU5O1xufSIsImltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpOyAvLyBDbG9uZSB0aGUgZGF0ZVxuXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIGFyZ3VtZW50ID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdC5pby9manVsZVwiKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgY29uc29sZS53YXJuKG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBcbiAgICBDcmVhdGVUYXNrLCBcbiAgICBuZXdUYXNrVGl0bGUsIFxuICAgIG5ld1Rhc2tEZXMsIFxuICAgIG5ld1Rhc2tEdWUsIFxuICAgIG5ld1Rhc2tQcmlvcml0eSwgXG4gICAgbmV3VGFza1N0YXIsIFxuICAgIGxpc3RBbGxUYXNrc1xufSBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCB7IExpc3RzT2ZUYXNrcyB9IGZyb20gJy4vbGlzdHMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCB0YXNrTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza0xpc3QnKTtcbnRhc2tMaXN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkQVRhc2snKSkge1xuICAgICAgICBDcmVhdGVUYXNrLnNob3dBZGRUYXNrKCk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIGFkZFRhc2tzKCkge1xuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb2plY3RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChwcm9qZWN0c1tqXS5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgICAgIGxldCBkaXNwbGF5ZWRQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cHJvamVjdHNbal0uaWR9YCk7XG4gICAgICAgICAgICBjb25zdCBhZGRUYXNrID0gbmV3IENyZWF0ZVRhc2soKTtcbiAgICAgICAgICAgIGFkZFRhc2suc2F2ZVRhc2soZGlzcGxheWVkUHJvamVjdCwgYCR7cHJvamVjdHNbal0uaWR9YCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGFzayA9IGRpc3BsYXllZFByb2plY3QubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lVGFzayA9IGN1cnJlbnRUYXNrLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGxpc3RBbGxUYXNrcy5hcHBlbmRDaGlsZChjbG9uZVRhc2spO1xuICAgICAgICAgICAgTGlzdHNPZlRhc2tzLmNsZWFyVGFza0Rpc3BsYXkoKTtcbiAgICAgICAgICAgIGRpc3BsYXllZFByb2plY3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gXG4gICAgICAgIC8qXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGlua2VkUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Rhc2tGb3JtLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2syID0gbmV3IENyZWF0ZVRhc2soKTtcbiAgICAgICAgICAgIGFkZFRhc2syLnNhdmVUYXNrKGxpbmtlZFByb2plY3QsIGAke3Rhc2tGb3JtLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lVGFzazIgPSBsaW5rZWRQcm9qZWN0Lmxhc3RFbGVtZW50Q2hpbGQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgbGlzdEFsbFRhc2tzLmFwcGVuZENoaWxkKGNsb25lVGFzazIpO1xuICAgICAgICB9ICovXG4gICAgfSAgXG4gICAgdGFza0Zvcm0ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xufVxudGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhZGRUYXNrcygpO1xufSk7XG5cbmNvbnN0IGNhbmNlbFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsYnRuJyk7XG5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIENyZWF0ZVRhc2suY2FuY2VsQWRkVGFzaygpO1xufSk7XG5cbmZ1bmN0aW9uIHNob3dEcm9wZG93bk1lbnUoZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duYnRuJykpIHtcbiAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3dNZW51Jyk7XG4gICAgfVxufVxudGFza0xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0Ryb3Bkb3duTWVudSk7XG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKCcuZHJvcGRvd25idG4nKSkge1xuICAgICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wZG93bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICAgICAgICBpZiAob3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnc2hvd01lbnUnKSkge1xuICAgICAgICAgICAgICAgIG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93TWVudScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWwnKSkge1xuICAgICAgICBjb25zdCB0b0RlbFRhc2sgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IHRvRGVsVGFza0lkID0gdG9EZWxUYXNrLmNsYXNzTGlzdC5pdGVtKDApO1xuICAgICAgICBjb25zdCB0b0RlbEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dG9EZWxUYXNrSWR9YCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRvRGVsVGFza0lkKTtcbiAgICAgICAgdG9EZWxJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxudGFza0xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlVGFzayk7XG5cbmZ1bmN0aW9uIGVkaXRUYXNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0JykpIHtcbiAgICAgICAgQ3JlYXRlVGFzay5zaG93QWRkVGFzaygpO1xuICAgICAgICBjb25zdCB0b0VkaXQgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIG5ld1Rhc2tUaXRsZS52YWx1ZSA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlblsyXS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza0Rlcy52YWx1ZSA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza0R1ZS52YWx1ZSA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlbls0XS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza1N0YXIuY2hlY2tlZCA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlbls1XS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza1ByaW9yaXR5LnZhbHVlID0gdG9FZGl0LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzZdLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBpblByb2plY3QgPSB0b0VkaXQuY2xhc3NMaXN0Lml0ZW0oMSk7XG4gICAgICAgIHRhc2tGb3JtLmNsYXNzTGlzdC5hZGQoYCR7aW5Qcm9qZWN0fWApO1xuXG4gICAgICAgIGNvbnN0IHRvRWRpdFRhc2tJZCA9IHRvRWRpdC5jbGFzc0xpc3QuaXRlbSgwKTtcbiAgICAgICAgY29uc3QgZGVsSXRlbXNUb0VkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0b0VkaXRUYXNrSWR9YCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRvRWRpdFRhc2tJZCk7XG4gICAgICAgIGRlbEl0ZW1zVG9FZGl0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWxidG4nKS50eXBlID0gJ3N1Ym1pdCc7XG4gICAgfVxufVxudGFza0xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdFRhc2spO1xuXG5jb25zdCB0YXNrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrYnRuJyk7XG50YXNrQnRucy5mb3JFYWNoKHRCdG4gPT4ge1xuICAgIHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBMaXN0c09mVGFza3MuZGlzcGxheVRhc2tzKGUpO1xuICAgIH0pXG59KVxuXG4vL1Byb2plY3RcbmNvbnN0IGFkZEFQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3RCdG4nKTtcbmFkZEFQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIFByb2plY3Quc2hvd0FkZFByb2plY3QoKTtcbn0pO1xuXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Rm9ybScpO1xucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBhZGRBUHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG4gICAgYWRkQVByb2plY3QuYWRkUHJvamVjdCgpO1xufSk7XG5cbmNvbnN0IGNhbmNlbEFQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbFByb2plY3QnKTtcbmNhbmNlbEFQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIFByb2plY3QuY2FuY2VsQWRkUHJvamVjdCgpO1xufSk7XG5cbmNvbnN0IHByb2plY3RNZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0TGlzdCcpO1xucHJvamVjdE1lbnVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBQcm9qZWN0LmRpc3BsYXlQcm9qZWN0KGUpO1xuICAgIFByb2plY3QuZWRpdFByb2plY3QoZSk7XG4gICAgUHJvamVjdC5zYXZlUHJvamVjdEVkaXQoZSk7XG4gICAgUHJvamVjdC5jYW5jZWxQcm9qZWN0RWRpdChlKTtcbiAgICBQcm9qZWN0LmRlbGV0ZVByb2plY3QoZSk7XG4gICAgc2hvd0Ryb3Bkb3duTWVudShlKTtcbn0pO1xuXG4iXSwibmFtZXMiOlsiVGFzayIsImxpc3RBbGxUYXNrcyIsImxpc3RUb2RheSIsImxpc3RVcGNvbWluZyIsImxpc3RTdGFycmVkIiwiTGlzdHNPZlRhc2tzIiwiY2xlYXJUYXNrRGlzcGxheSIsImFsbExpc3RzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImxpc3QiLCJzdHlsZSIsImRpc3BsYXkiLCJkaXNwbGF5VGFza3MiLCJlIiwidGFza2J0bnMiLCJ0YnRuIiwiY2xhc3NOYW1lIiwicmVwbGFjZSIsImN1cnJlbnRUYXJnZXQiLCJxdWVyeVNlbGVjdG9yIiwicHJvamVjdElkIiwiUHJvamVjdCIsImNvbnN0cnVjdG9yIiwicHJvamVjdE5hbWUiLCJzaG93QWRkUHJvamVjdCIsImFkZEFQcm9qZWN0Rm9ybSIsImNhbmNlbEFkZFByb2plY3QiLCJ2YWx1ZSIsImFkZFByb2plY3QiLCJwcm9qZWN0Rm9ybSIsImxlbmd0aCIsImFQcm9qZWN0IiwiYVByb2plY3Rfc2VyaWFsIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJuZXdQcm9qZWN0RGl2IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlkIiwiaW5uZXJIVE1MIiwicHJvamVjdExpc3QiLCJhcHBlbmRDaGlsZCIsIm5ld1Byb2plY3RMaXN0IiwiZGlzcGxheVByb2plY3QiLCJ0YXJnZXQiLCJjb250YWlucyIsInByb2plY3RCdG5zIiwicEJ0biIsInByb2plY3ROIiwiZ2V0RWxlbWVudEJ5SWQiLCJlZGl0UHJvamVjdCIsInRvUmVuYW1lIiwicGFyZW50Tm9kZSIsImVkaXRGb3JtIiwic2V0QXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsInRleHRDb250ZW50IiwidHJpbSIsInJlcGxhY2VDaGlsZCIsInNhdmVQcm9qZWN0RWRpdCIsIm5ld1Byb2plY3ROYW1lIiwibmV3UHJvamVjdE5hbWVOb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJyZW5hbWVGb3JtIiwicHJvamVjdE9uRGlzcGxheSIsImNhbmNlbFByb2plY3RFZGl0IiwiY3VycmVudFByb2plY3QiLCJvcmlnaW5hbFByb2plY3ROYW1lIiwib3JpZ2luYWxQcm9qZWN0Tm9kZSIsImRlbGV0ZVByb2plY3QiLCJ0b0RlbFByb2plY3QiLCJ0b0RlbFByb2plY3RJZCIsInJlbW92ZUl0ZW0iLCJyZW1vdmUiLCJ0b0RlbFRhc2tzQWxsIiwidG9EZWxUYXNrc0xpc3QiLCJ0YXNrIiwidCIsInRTdG9yYWdlTmFtZSIsIml0ZW0iLCJjb21wYXJlQXNjIiwicGFyc2VJU08iLCJ0YXNrVGl0bGUiLCJ0YXNrRGVzY3JpcHRpb24iLCJkdWVEYXRlIiwicHJpb3JpdHkiLCJzdGFycmVkIiwibmV3VGFza1RpdGxlIiwibmV3VGFza0RlcyIsIm5ld1Rhc2tEdWUiLCJuZXdUYXNrU3RhciIsIm5ld1Rhc2tQcmlvcml0eSIsInRJdGVtSWQiLCJDcmVhdGVUYXNrIiwic2hvd0FkZFRhc2siLCJ0YXNrRm9ybSIsImNhbmNlbEFkZFRhc2siLCJmb3JtYXR0ZWRUb2RheSIsInRvZGF5IiwiRGF0ZSIsInNldEhvdXJzIiwiZm9ybWF0dGVkRHVlIiwiZm9ybWF0RHVlIiwidGFza0xpc3QiLCJsaXN0RG9tIiwidEl0ZW0iLCJwcm9qZWN0SUQiLCJjYXRlZ29yaXplVGFzayIsIm4iLCJjaGVja2VkIiwic2F2ZVRhc2siLCJhVGFzayIsImFUYXNrX3NlcmlhbCIsInRhc2tMaXN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRUYXNrcyIsInByb2plY3RzIiwiaiIsImRpc3BsYXllZFByb2plY3QiLCJhZGRUYXNrIiwiY3VycmVudFRhc2siLCJsYXN0RWxlbWVudENoaWxkIiwiY2xvbmVUYXNrIiwiY2xvbmVOb2RlIiwicmVtb3ZlQXR0cmlidXRlIiwicHJldmVudERlZmF1bHQiLCJjYW5jZWxUYXNrQnRuIiwic2hvd0Ryb3Bkb3duTWVudSIsIm5leHRFbGVtZW50U2libGluZyIsInRvZ2dsZSIsIndpbmRvdyIsIm9uY2xpY2siLCJtYXRjaGVzIiwiZHJvcGRvd25zIiwiaSIsIm9wZW5Ecm9wZG93biIsImRlbGV0ZVRhc2siLCJ0b0RlbFRhc2siLCJ0b0RlbFRhc2tJZCIsInRvRGVsSXRlbXMiLCJlZGl0VGFzayIsInRvRWRpdCIsImNoaWxkcmVuIiwiaW5Qcm9qZWN0IiwidG9FZGl0VGFza0lkIiwiZGVsSXRlbXNUb0VkaXQiLCJ0eXBlIiwidGFza0J0bnMiLCJ0QnRuIiwiYWRkQVByb2plY3RCdG4iLCJhZGRBUHJvamVjdCIsImNhbmNlbEFQcm9qZWN0QnRuIiwicHJvamVjdE1lbnVzIl0sInNvdXJjZVJvb3QiOiIifQ==