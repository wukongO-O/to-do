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
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lists */ "./src/lists.js");


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
    projectList.appendChild(newProjectDiv);
    const newProjectList = document.createElement('div');
    newProjectList.classList.add('project');
    newProjectList.id = "project".concat(projectId);
    _lists__WEBPACK_IMPORTED_MODULE_1__.ListsOfTasks.clearTaskDisplay();
    newProjectList.innerHTML = "\n            <div class=projectTitle>".concat(projectForm, "</div>\n            <button class=\"addATask\"><img src=\"../src/img/add.svg\" alt=\"add project icon\"> Add a task</button>\n        ");
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
      _lists__WEBPACK_IMPORTED_MODULE_1__.ListsOfTasks.clearTaskDisplay();
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
      const toRename = e.target.parentNode.parentNode;
      document.getElementById('projectForm').style.display = 'block';
      document.querySelector('#projectName').value = toRename.firstChild.textContent;
      const toRenameProjectId = toRename.id;
      localStorage.removeItem("project".concat(toRenameProjectId));
      document.getElementById("".concat(toRenameProjectId)).remove();
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
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./img/star.svg */ "./src/img/star.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: 'fff_tusjbold';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\nbody {\n    margin: 0;\n    font-family: monospace;\n}\n\n.container {\n    min-height: 100%;\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n    height: 100vh;\n}\n\n.header, .footer {\n    background-color:rgb(250, 218, 215);\n    text-align: center;\n    font-family: 'fff_tusjbold';\n}\n.title {\n    font-size: 50pt;\n    padding: 30px 0;\n}\n.footer {\n    color: black;\n    padding: 8px 0 15px 0;\n}\na > svg {\n    stroke: black;\n    position: relative;\n    top: 4px;\n    left: 2px;\n}\na > svg :hover {\n    fill: black;\n}\n\n.main {\n    display: flex;\n}\n.panel {\n    background-color: rgb(255, 242, 127);\n    flex: 1;\n}\n.tasks {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n}\n.display {\n    background-color: azure;\n    flex: 3;\n}\ntextarea {\n    resize: none;\n}\n.panel img {\n    height: 30px;\n    width: 30px;\n    position: relative;\n    top: 0.4rem;\n}\n.panel button {\n    border: none;\n    width: 100%;\n    background-color: rgb(255, 242, 127);\n    text-align: left;\n    font-size: 20pt;\n    font-family: monospace;\n    padding: 0.5rem 0 0.5rem 5rem;\n}\n\nbutton:hover, .projectBtn:hover, .projectBtn:hover .dropdownbtn {\n    background-color: azure;\n}\n\n.projectHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 30pt;\n    padding: 2rem 0 2rem 5rem;\n}\n.taskHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 20px;\n    margin: 55px;\n    text-align: center;\n}\n\n.projectBtn {\n    display: grid;\n    grid-template-columns: 4fr 1fr;\n    align-items: baseline;\n    font-size: 20pt;\n    padding-left: 5rem;\n    position: relative;\n    margin-bottom: 1rem;\n}\n.dropdownbtn {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 30px;\n    width: 30px;\n}\n\n.taskDiv {\n    position: relative;\n}\n.dropdownDiv {\n    float: right;\n    position: relative;\n}\n.dropdown {\n    display: none;\n    position: absolute;\n    min-width: 50px;\n    z-index: 1;\n    right: 0;\n    top: -5.5rem;\n}\n\ndiv.showMenu {\n    display: block;\n}\n.dropdown button {\n    background-color: azure;\n}\n.taskDiv .dropdown.showMenu {\n    top: 44px;\n    display: grid;\n    right: 10px;\n    justify-content: end;\n    left: 0;\n}\n\n#projectForm {\n    margin: 1rem 0 0 5rem;\n    font-size: 20pt;\n}\nbutton.cancelProject, button.addProject {\n    border: solid 1px;\n    width: 8rem;\n    margin: 0.5rem;\n    padding: 0.2rem 0;\n    text-align: center;\n    border-radius: 5px;\n}\ninput, textarea {\n    padding: 0.5em 2em;\n}\n\n.projectTitle {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 40px;\n    text-align: center;\n}\n.display button {\n    font-family: monospace;\n    font-size: 16pt;\n    border: 1pt solid;\n    border-radius: 5px;\n    background-color: azure;\n}\n.display .addATask {\n    margin: 0 0 20px 80px;\n    display: flex;\n    align-items: center;\n    padding: 0 15px;\n}\n\n.display button:hover, #addTask button:hover {\n    background-color: rgb(255, 242, 127);\n}\n.save {\n    margin-top: 5px;\n}\n#taskForm {\n    font-family: monospace;\n    font-size: 16pt;\n}\nfieldset {\n    display: grid;\n    gap: 10px;\n    margin: 0 5rem;\n}\ninput[id='newTask']:checked~li.ttitle {\n    text-decoration: line-through;\n    color:black;\n}\n\n.taskList {\n    display: flex;\n    flex-direction: column-reverse;\n}\n.taskDiv {\n    display: flex;\n    gap: 20px;\n    padding: 0 40px;\n    align-items: baseline;\n}\n.task {\n    list-style-type: none;\n    display: grid;\n    gap: 20px;\n    grid-template-columns: 30px 180px 6fr 3fr 1fr;\n    grid-template-areas:\n        \"one two four five six\"\n        \"three three three three three\";\n    justify-content: flex-start;\n    align-items: center;\n    flex: 1;\n    font-size: 16pt;\n}\n#newTask {\n    grid-area: one;\n}\n.ttitle {\n    grid-area: two;\n}\n.tdescription {\n    grid-area: three;\n}\n.tdue {\n    grid-area: four;\n}\n.tpriority {\n    grid-area: five;\n}\n.tstar {\n    grid-area: six;\n}\n.true {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 20px;\n    width: 20px;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,2BAA2B;IAC3B;+DACwD;IACxD,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,SAAS;IACT,sBAAsB;AAC1B;;AAEA;IACI,gBAAgB;IAChB,aAAa;IACb,iCAAiC;IACjC,aAAa;AACjB;;AAEA;IACI,mCAAmC;IACnC,kBAAkB;IAClB,2BAA2B;AAC/B;AACA;IACI,eAAe;IACf,eAAe;AACnB;AACA;IACI,YAAY;IACZ,qBAAqB;AACzB;AACA;IACI,aAAa;IACb,kBAAkB;IAClB,QAAQ;IACR,SAAS;AACb;AACA;IACI,WAAW;AACf;;AAEA;IACI,aAAa;AACjB;AACA;IACI,oCAAoC;IACpC,OAAO;AACX;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;AAC3B;AACA;IACI,uBAAuB;IACvB,OAAO;AACX;AACA;IACI,YAAY;AAChB;AACA;IACI,YAAY;IACZ,WAAW;IACX,kBAAkB;IAClB,WAAW;AACf;AACA;IACI,YAAY;IACZ,WAAW;IACX,oCAAoC;IACpC,gBAAgB;IAChB,eAAe;IACf,sBAAsB;IACtB,6BAA6B;AACjC;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,2BAA2B;IAC3B,eAAe;IACf,yBAAyB;AAC7B;AACA;IACI,2BAA2B;IAC3B,eAAe;IACf,aAAa;IACb,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,qBAAqB;IACrB,eAAe;IACf,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;AACvB;AACA;IACI,yDAA6C;IAC7C,wBAAwB;IACxB,4BAA4B;IAC5B,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,kBAAkB;AACtB;AACA;IACI,YAAY;IACZ,kBAAkB;AACtB;AACA;IACI,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,UAAU;IACV,QAAQ;IACR,YAAY;AAChB;;AAEA;IACI,cAAc;AAClB;AACA;IACI,uBAAuB;AAC3B;AACA;IACI,SAAS;IACT,aAAa;IACb,WAAW;IACX,oBAAoB;IACpB,OAAO;AACX;;AAEA;IACI,qBAAqB;IACrB,eAAe;AACnB;AACA;IACI,iBAAiB;IACjB,WAAW;IACX,cAAc;IACd,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;AACtB;AACA;IACI,kBAAkB;AACtB;;AAEA;IACI,2BAA2B;IAC3B,eAAe;IACf,aAAa;IACb,kBAAkB;AACtB;AACA;IACI,sBAAsB;IACtB,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,uBAAuB;AAC3B;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,oCAAoC;AACxC;AACA;IACI,eAAe;AACnB;AACA;IACI,sBAAsB;IACtB,eAAe;AACnB;AACA;IACI,aAAa;IACb,SAAS;IACT,cAAc;AAClB;AACA;IACI,6BAA6B;IAC7B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;AACA;IACI,aAAa;IACb,SAAS;IACT,eAAe;IACf,qBAAqB;AACzB;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,SAAS;IACT,6CAA6C;IAC7C;;uCAEmC;IACnC,2BAA2B;IAC3B,mBAAmB;IACnB,OAAO;IACP,eAAe;AACnB;AACA;IACI,cAAc;AAClB;AACA;IACI,cAAc;AAClB;AACA;IACI,gBAAgB;AACpB;AACA;IACI,eAAe;AACnB;AACA;IACI,eAAe;AACnB;AACA;IACI,cAAc;AAClB;AACA;IACI,yDAAqC;IACrC,wBAAwB;IACxB,4BAA4B;IAC5B,YAAY;IACZ,WAAW;AACf","sourcesContent":["@font-face {\n    font-family: 'fff_tusjbold';\n    src: url('./fonts/fff_tusj-webfont.woff2') format('woff2'),\n         url('./fonts/fff_tusj-webfont.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\nbody {\n    margin: 0;\n    font-family: monospace;\n}\n\n.container {\n    min-height: 100%;\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n    height: 100vh;\n}\n\n.header, .footer {\n    background-color:rgb(250, 218, 215);\n    text-align: center;\n    font-family: 'fff_tusjbold';\n}\n.title {\n    font-size: 50pt;\n    padding: 30px 0;\n}\n.footer {\n    color: black;\n    padding: 8px 0 15px 0;\n}\na > svg {\n    stroke: black;\n    position: relative;\n    top: 4px;\n    left: 2px;\n}\na > svg :hover {\n    fill: black;\n}\n\n.main {\n    display: flex;\n}\n.panel {\n    background-color: rgb(255, 242, 127);\n    flex: 1;\n}\n.tasks {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n}\n.display {\n    background-color: azure;\n    flex: 3;\n}\ntextarea {\n    resize: none;\n}\n.panel img {\n    height: 30px;\n    width: 30px;\n    position: relative;\n    top: 0.4rem;\n}\n.panel button {\n    border: none;\n    width: 100%;\n    background-color: rgb(255, 242, 127);\n    text-align: left;\n    font-size: 20pt;\n    font-family: monospace;\n    padding: 0.5rem 0 0.5rem 5rem;\n}\n\nbutton:hover, .projectBtn:hover, .projectBtn:hover .dropdownbtn {\n    background-color: azure;\n}\n\n.projectHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 30pt;\n    padding: 2rem 0 2rem 5rem;\n}\n.taskHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 20px;\n    margin: 55px;\n    text-align: center;\n}\n\n.projectBtn {\n    display: grid;\n    grid-template-columns: 4fr 1fr;\n    align-items: baseline;\n    font-size: 20pt;\n    padding-left: 5rem;\n    position: relative;\n    margin-bottom: 1rem;\n}\n.dropdownbtn {\n    background-image: url(../src/img/dotMenu.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 30px;\n    width: 30px;\n}\n\n.taskDiv {\n    position: relative;\n}\n.dropdownDiv {\n    float: right;\n    position: relative;\n}\n.dropdown {\n    display: none;\n    position: absolute;\n    min-width: 50px;\n    z-index: 1;\n    right: 0;\n    top: -5.5rem;\n}\n\ndiv.showMenu {\n    display: block;\n}\n.dropdown button {\n    background-color: azure;\n}\n.taskDiv .dropdown.showMenu {\n    top: 44px;\n    display: grid;\n    right: 10px;\n    justify-content: end;\n    left: 0;\n}\n\n#projectForm {\n    margin: 1rem 0 0 5rem;\n    font-size: 20pt;\n}\nbutton.cancelProject, button.addProject {\n    border: solid 1px;\n    width: 8rem;\n    margin: 0.5rem;\n    padding: 0.2rem 0;\n    text-align: center;\n    border-radius: 5px;\n}\ninput, textarea {\n    padding: 0.5em 2em;\n}\n\n.projectTitle {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 40px;\n    text-align: center;\n}\n.display button {\n    font-family: monospace;\n    font-size: 16pt;\n    border: 1pt solid;\n    border-radius: 5px;\n    background-color: azure;\n}\n.display .addATask {\n    margin: 0 0 20px 80px;\n    display: flex;\n    align-items: center;\n    padding: 0 15px;\n}\n\n.display button:hover, #addTask button:hover {\n    background-color: rgb(255, 242, 127);\n}\n.save {\n    margin-top: 5px;\n}\n#taskForm {\n    font-family: monospace;\n    font-size: 16pt;\n}\nfieldset {\n    display: grid;\n    gap: 10px;\n    margin: 0 5rem;\n}\ninput[id='newTask']:checked~li.ttitle {\n    text-decoration: line-through;\n    color:black;\n}\n\n.taskList {\n    display: flex;\n    flex-direction: column-reverse;\n}\n.taskDiv {\n    display: flex;\n    gap: 20px;\n    padding: 0 40px;\n    align-items: baseline;\n}\n.task {\n    list-style-type: none;\n    display: grid;\n    gap: 20px;\n    grid-template-columns: 30px 180px 6fr 3fr 1fr;\n    grid-template-areas:\n        \"one two four five six\"\n        \"three three three three three\";\n    justify-content: flex-start;\n    align-items: center;\n    flex: 1;\n    font-size: 16pt;\n}\n#newTask {\n    grid-area: one;\n}\n.ttitle {\n    grid-area: two;\n}\n.tdescription {\n    grid-area: three;\n}\n.tdue {\n    grid-area: four;\n}\n.tpriority {\n    grid-area: five;\n}\n.tstar {\n    grid-area: six;\n}\n.true {\n    background-image: url(./img/star.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 20px;\n    width: 20px;\n}"],"sourceRoot":""}]);
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
    } else {
      const linkedProject = document.getElementById("".concat(taskForm.className));
      const addTask2 = new _tasks__WEBPACK_IMPORTED_MODULE_1__.CreateTask();
      addTask2.saveTask(linkedProject, "".concat(taskForm.className));
      const cloneTask2 = linkedProject.lastElementChild.cloneNode(true);
      _tasks__WEBPACK_IMPORTED_MODULE_1__.listAllTasks.appendChild(cloneTask2);
    }
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
  _projects__WEBPACK_IMPORTED_MODULE_3__.Project.deleteProject(e);
  showDropdownMenu(e);
}); //to-do/bugs:  4)readme 6)localStorage set w hierarchy
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBbUMsbUJBQW1CLGtCQUFrQixHQUFHLE9BQU8sZ0ZBQWdGLFlBQVksTUFBTSxPQUFPLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsS0FBSyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFB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QXRCO0VBQ0EyRyxnQkFBZ0IsQ0FBQzNHLENBQUQsQ0FBaEI7QUFDSCxDQUxELEdBT0Esc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9saXN0cy5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi90b0ludGVnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2NvbXBhcmVBc2MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2NvbnN0YW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vcGFyc2VJU08vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFzaywgbGlzdEFsbFRhc2tzLCBsaXN0VG9kYXksIGxpc3RVcGNvbWluZywgbGlzdFN0YXJyZWQgfSBmcm9tICcuL3Rhc2tzJztcblxuXG5jbGFzcyBMaXN0c09mVGFza3MgZXh0ZW5kcyBUYXNrIHtcblxuICAgIHN0YXRpYyBjbGVhclRhc2tEaXNwbGF5ICgpIHtcbiAgICAgICAgY29uc3QgYWxsTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza0xpc3QgPiBkaXYnKTtcbiAgICAgICAgYWxsTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIGxpc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG4gICAgfSBcblxuICAgIHN0YXRpYyBkaXNwbGF5VGFza3MoZSkge1xuICAgICAgICB0aGlzLmNsZWFyVGFza0Rpc3BsYXkoKTtcblxuICAgICAgICBjb25zdCB0YXNrYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrYnRuJyk7XG4gICAgICAgIHRhc2tidG5zLmZvckVhY2godGJ0biA9PiB7XG4gICAgICAgICAgICB0YnRuLmNsYXNzTmFtZSA9IHRidG4uY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQgPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbCcpKSB7XG4gICAgICAgICAgICBsaXN0QWxsVGFza3Muc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RheScpKSB7XG4gICAgICAgICAgICBsaXN0VG9kYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cGNvbWluZycpKSB7XG4gICAgICAgICAgICBsaXN0VXBjb21pbmcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFyJykpIHtcbiAgICAgICAgICAgIGxpc3RTdGFycmVkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgfVxuICAgIFxuICAgIH1cblxuZXhwb3J0IHsgTGlzdHNPZlRhc2tzIH0iLCJpbXBvcnQgeyBDcmVhdGVUYXNrIH0gZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgeyBMaXN0c09mVGFza3MgfSBmcm9tICcuL2xpc3RzJztcblxubGV0IHByb2plY3RJZCA9IDA7XG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9qZWN0TmFtZSkge1xuICAgICAgICB0aGlzLnByb2plY3ROYW1lID0gcHJvamVjdE5hbWU7XG4gICAgfVxuICAgIHN0YXRpYyBzaG93QWRkUHJvamVjdCgpIHtcbiAgICAgICAgY29uc3QgYWRkQVByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RGb3JtJyk7XG4gICAgICAgIHJldHVybiBhZGRBUHJvamVjdEZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuICAgIHN0YXRpYyBjYW5jZWxBZGRQcm9qZWN0KCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdE5hbWUnKS52YWx1ZSA9ICcnO1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RGb3JtJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgXG4gICAgYWRkUHJvamVjdCgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdE5hbWUnKS52YWx1ZTtcbiAgICAgICAgaWYgKHByb2plY3RGb3JtLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICAgICAgcHJvamVjdElkICs9IDE7XG5cbiAgICAgICAgbGV0IGFQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdEZvcm0pO1xuICAgICAgICBsZXQgYVByb2plY3Rfc2VyaWFsID0gSlNPTi5zdHJpbmdpZnkoYVByb2plY3QpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgcHJvamVjdCR7cHJvamVjdElkfWAsIGFQcm9qZWN0X3NlcmlhbCk7XG5cbiAgICAgICAgY29uc3QgbmV3UHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdQcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RCdG4nKTtcbiAgICAgICAgbmV3UHJvamVjdERpdi5pZCA9IGAke3Byb2plY3RJZH1gO1xuICAgICAgICBuZXdQcm9qZWN0RGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICR7cHJvamVjdEZvcm19XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9ICdkcm9wZG93bkRpdic+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2Ryb3Bkb3duYnRuJz48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZHJvcGRvd24nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0ncmVuYW1lJz5SZW5hbWU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2RlbFByb2plY3QnPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0TGlzdCcpO1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChuZXdQcm9qZWN0RGl2KTtcblxuICAgICAgICBjb25zdCBuZXdQcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdQcm9qZWN0TGlzdC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgICAgIG5ld1Byb2plY3RMaXN0LmlkID0gYHByb2plY3Qke3Byb2plY3RJZH1gO1xuXG4gICAgICAgIExpc3RzT2ZUYXNrcy5jbGVhclRhc2tEaXNwbGF5KCk7XG4gICAgICAgIG5ld1Byb2plY3RMaXN0LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9cHJvamVjdFRpdGxlPiR7cHJvamVjdEZvcm19PC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkQVRhc2tcIj48aW1nIHNyYz1cIi4uL3NyYy9pbWcvYWRkLnN2Z1wiIGFsdD1cImFkZCBwcm9qZWN0IGljb25cIj4gQWRkIGEgdGFzazwvYnV0dG9uPlxuICAgICAgICBgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrTGlzdCcpLmFwcGVuZENoaWxkKG5ld1Byb2plY3RMaXN0KTtcbiAgICAgICAgXG4gICAgICAgIG5ld1Byb2plY3RMaXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdEZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3ROYW1lJykudmFsdWUgPSAnJztcbiAgICB9XG4vKlxuICAgIGFkZFRhc2tUb1Byb2plY3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBhZGRUYXNrVG9Qcm9qZWN0ID0gbmV3IENyZWF0ZVRhc2soKTtcbiAgICAgICAgYWRkVGFza1RvUHJvamVjdC5zYXZlVGFzayhwcm9qZWN0KTtcbiAgICB9ICovXG5cbiAgICBzdGF0aWMgZGlzcGxheVByb2plY3QoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0QnRuJykpIHtcbiAgICAgICAgICAgIExpc3RzT2ZUYXNrcy5jbGVhclRhc2tEaXNwbGF5KCk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0QnRuJyk7XG4gICAgICAgICAgICBwcm9qZWN0QnRucy5mb3JFYWNoKHBCdG4gPT4ge1xuICAgICAgICAgICAgICAgIHBCdG4uY2xhc3NOYW1lID0gcEJ0bi5jbGFzc05hbWUucmVwbGFjZSgnIGFjdGl2ZScsICcnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsZXQgcHJvamVjdE4gPSBlLnRhcmdldC5pZDtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcm9qZWN0JHtwcm9qZWN0Tn1gKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgc3RhdGljIGVkaXRQcm9qZWN0KGUpIHtcbiAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZW5hbWUnKSkge1xuICAgICAgICAgICAgY29uc3QgdG9SZW5hbWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0TmFtZScpLnZhbHVlID0gdG9SZW5hbWUuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcblxuICAgICAgICAgICAgY29uc3QgdG9SZW5hbWVQcm9qZWN0SWQgPSB0b1JlbmFtZS5pZDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBwcm9qZWN0JHt0b1JlbmFtZVByb2plY3RJZH1gKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RvUmVuYW1lUHJvamVjdElkfWApLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZVByb2plY3QoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxQcm9qZWN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvRGVsUHJvamVjdCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgY29uc3QgdG9EZWxQcm9qZWN0SWQgPSB0b0RlbFByb2plY3QuaWQ7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdCR7dG9EZWxQcm9qZWN0SWR9YCk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0b0RlbFByb2plY3RJZH1gKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgdGFza3MgaW4gbGlzdHNcbiAgICAgICAgICAgIGNvbnN0IHRvRGVsVGFza3NBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJvamVjdCR7dG9EZWxQcm9qZWN0SWR9YCk7XG4gICAgICAgICAgICBjb25zdCB0b0RlbFRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCNwcm9qZWN0JHt0b0RlbFByb2plY3RJZH0gLnByb2plY3Qke3RvRGVsUHJvamVjdElkfWApO1xuICAgICAgICAgICAgdG9EZWxUYXNrc0FsbC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9EZWxUYXNrc0xpc3QuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRTdG9yYWdlTmFtZSA9IHQuY2xhc3NMaXN0Lml0ZW0oMCk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odFN0b3JhZ2VOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBQcm9qZWN0IH07IiwiaW1wb3J0IHsgXG4gICAgY29tcGFyZUFzYywgXG4gICAgcGFyc2VJU08gXG59IGZyb20gJ2RhdGUtZm5zJztcblxuY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBzdGFycmVkKSB7XG4gICAgICAgIHRoaXMudGFza1RpdGxlID0gdGFza1RpdGxlXG4gICAgICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gdGFza0Rlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgICAgIHRoaXMuc3RhcnJlZCA9IHN0YXJyZWRcbiAgICB9XG59XG5cbmNvbnN0IG5ld1Rhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrVGl0bGUnKTtcbmNvbnN0IG5ld1Rhc2tEZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0RlcycpO1xuY29uc3QgbmV3VGFza0R1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG5jb25zdCBuZXdUYXNrU3RhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFycmVkVGFzaycpXG5jb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpb3JpdHknKTtcblxuY29uc3QgbGlzdEFsbFRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RBbGwnKTtcbmNvbnN0IGxpc3RUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0VG9kYXknKTtcbmNvbnN0IGxpc3RVcGNvbWluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0VXBjb21pbmcnKTtcbmNvbnN0IGxpc3RTdGFycmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RTdGFycmVkJyk7XG5cbmxldCB0SXRlbUlkID0gMDtcblxuY2xhc3MgQ3JlYXRlVGFzayBleHRlbmRzIFRhc2t7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBzdGFycmVkKSB7XG4gICAgICAgIHN1cGVyKHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgc3RhcnJlZClcbiAgICB9XG4gICAgc3RhdGljIHNob3dBZGRUYXNrKCkge1xuICAgICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRm9ybScpO1xuICAgICAgICByZXR1cm4gdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2FuY2VsQWRkVGFzaygpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICBmb3JtYXR0ZWRUb2RheSgpIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgIHJldHVybiB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICB9XG5cbiAgICBmb3JtYXR0ZWREdWUoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdER1ZSA9IHBhcnNlSVNPKGAke25ld1Rhc2tEdWUudmFsdWV9YCk7XG4gICAgICAgIHJldHVybiBmb3JtYXREdWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgfVxuXG4gICAgdGFza0xpc3QgKGxpc3REb20sIHRJdGVtLCB0SXRlbUlkLCBwcm9qZWN0SUQpIHsgIFxuICAgICAgICBsaXN0RG9tLmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9J3Rhc2ske3RJdGVtSWR9ICR7cHJvamVjdElEfSB0YXNrRGl2Jz5cbiAgICAgICAgICAgIDx1bCBjbGFzcz0ndGFzayc+XG4gICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9J25ld1QnIHR5cGU9J2NoZWNrYm94JyBpZD0nbmV3VGFzayc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj0nbmV3VGFzayc+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9J3R0aXRsZSc+JHt0SXRlbS50YXNrVGl0bGV9PC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9J3RkZXNjcmlwdGlvbic+JHt0SXRlbS50YXNrRGVzY3JpcHRpb259PC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9J3RkdWUnPiR7dEl0ZW0uZHVlRGF0ZX08L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz0ndHByaW9yaXR5Jz4ke3RJdGVtLnByaW9yaXR5fTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSd0c3RhciAke3RJdGVtLnN0YXJyZWR9Jz48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2Ryb3Bkb3duYnRuJz48L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Ryb3Bkb3duJz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZWRpdCc+IEVkaXQgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2RlbCc+IERlbGV0ZSA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH1cblxuICAgIGNhdGVnb3JpemVUYXNrKHQsIG4sIGlkKSB7XG4gICAgICAgIGlmIChjb21wYXJlQXNjKHRoaXMuZm9ybWF0dGVkRHVlKCksIHRoaXMuZm9ybWF0dGVkVG9kYXkoKSkgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy50YXNrTGlzdChsaXN0VG9kYXksIHQsIG4sIGlkKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wYXJlQXNjKHRoaXMuZm9ybWF0dGVkRHVlKCksIHRoaXMuZm9ybWF0dGVkVG9kYXkoKSkgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy50YXNrTGlzdChsaXN0VXBjb21pbmcsIHQsIG4sIGlkKTtcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKG5ld1Rhc2tTdGFyLmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy50YXNrTGlzdChsaXN0U3RhcnJlZCwgdCwgbiwgaWQpO1xuICAgICAgICB9IFxufVxuXG4gICAgc2F2ZVRhc2sobGlzdERvbSwgcHJvamVjdElEKSB7XG4gICAgICAgIGlmIChuZXdUYXNrVGl0bGUudmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFUYXNrID0gbmV3IFRhc2sobmV3VGFza1RpdGxlLnZhbHVlLCBuZXdUYXNrRGVzLnZhbHVlLCBuZXdUYXNrRHVlLnZhbHVlLCBuZXdUYXNrUHJpb3JpdHkudmFsdWUsIG5ld1Rhc2tTdGFyLmNoZWNrZWQpO1xuXG4gICAgICAgIHRJdGVtSWQgKz0xO1xuICAgICAgICB0aGlzLnRhc2tMaXN0KGxpc3REb20sIGFUYXNrLCB0SXRlbUlkLCBwcm9qZWN0SUQpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFUYXNrX3NlcmlhbCA9IEpTT04uc3RyaW5naWZ5KGFUYXNrKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHRhc2ske3RJdGVtSWR9YCwgYVRhc2tfc2VyaWFsKTtcblxuICAgICAgICB0aGlzLmNhdGVnb3JpemVUYXNrKGFUYXNrLCB0SXRlbUlkLCBwcm9qZWN0SUQpO1xuXG4gICAgICAgIG5ld1Rhc2tUaXRsZS52YWx1ZSA9ICcnO1xuICAgICAgICBuZXdUYXNrRGVzLnZhbHVlID0gJyc7XG4gICAgICAgIG5ld1Rhc2tEdWUudmFsdWUgPSAnJztcbiAgICAgICAgbmV3VGFza1N0YXIuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICBuZXdUYXNrUHJpb3JpdHkudmFsdWUgPSAnJztcblxuICAgICAgICB0YXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgVGFzaywgQ3JlYXRlVGFzaywgbmV3VGFza1RpdGxlLCBuZXdUYXNrRGVzLCBuZXdUYXNrRHVlLCBuZXdUYXNrUHJpb3JpdHksIG5ld1Rhc2tTdGFyLCBsaXN0QWxsVGFza3MsIGxpc3RUb2RheSwgbGlzdFVwY29taW5nLCBsaXN0U3RhcnJlZCB9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udHMvZmZmX3R1c2otd2ViZm9udC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZm9udHMvZmZmX3R1c2otd2ViZm9udC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltZy9kb3RNZW51LnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vaW1nL3N0YXIuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdCgnd29mZicpO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbmJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxuICAgIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5oZWFkZXIsIC5mb290ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYigyNTAsIDIxOCwgMjE1KTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxufVxcbi50aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogNTBwdDtcXG4gICAgcGFkZGluZzogMzBweCAwO1xcbn1cXG4uZm9vdGVyIHtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBwYWRkaW5nOiA4cHggMCAxNXB4IDA7XFxufVxcbmEgPiBzdmcge1xcbiAgICBzdHJva2U6IGJsYWNrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogNHB4O1xcbiAgICBsZWZ0OiAycHg7XFxufVxcbmEgPiBzdmcgOmhvdmVyIHtcXG4gICAgZmlsbDogYmxhY2s7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLnBhbmVsIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjQyLCAxMjcpO1xcbiAgICBmbGV4OiAxO1xcbn1cXG4udGFza3Mge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLmRpc3BsYXkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG4gICAgZmxleDogMztcXG59XFxudGV4dGFyZWEge1xcbiAgICByZXNpemU6IG5vbmU7XFxufVxcbi5wYW5lbCBpbWcge1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogMC40cmVtO1xcbn1cXG4ucGFuZWwgYnV0dG9uIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjQyLCAxMjcpO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBmb250LXNpemU6IDIwcHQ7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAwIDAuNXJlbSA1cmVtO1xcbn1cXG5cXG5idXR0b246aG92ZXIsIC5wcm9qZWN0QnRuOmhvdmVyLCAucHJvamVjdEJ0bjpob3ZlciAuZHJvcGRvd25idG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG59XFxuXFxuLnByb2plY3RIZWFkaW5nIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBmb250LXNpemU6IDMwcHQ7XFxuICAgIHBhZGRpbmc6IDJyZW0gMCAycmVtIDVyZW07XFxufVxcbi50YXNrSGVhZGluZyB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgZm9udC1zaXplOiA0MHB0O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBtYXJnaW46IDU1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnByb2plY3RCdG4ge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDRmciAxZnI7XFxuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gICAgZm9udC1zaXplOiAyMHB0O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDVyZW07XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuLmRyb3Bkb3duYnRuIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG4udGFza0RpdiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmRyb3Bkb3duRGl2IHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5kcm9wZG93biB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWluLXdpZHRoOiA1MHB4O1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiAtNS41cmVtO1xcbn1cXG5cXG5kaXYuc2hvd01lbnUge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuLmRyb3Bkb3duIGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcbn1cXG4udGFza0RpdiAuZHJvcGRvd24uc2hvd01lbnUge1xcbiAgICB0b3A6IDQ0cHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHJpZ2h0OiAxMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgbGVmdDogMDtcXG59XFxuXFxuI3Byb2plY3RGb3JtIHtcXG4gICAgbWFyZ2luOiAxcmVtIDAgMCA1cmVtO1xcbiAgICBmb250LXNpemU6IDIwcHQ7XFxufVxcbmJ1dHRvbi5jYW5jZWxQcm9qZWN0LCBidXR0b24uYWRkUHJvamVjdCB7XFxuICAgIGJvcmRlcjogc29saWQgMXB4O1xcbiAgICB3aWR0aDogOHJlbTtcXG4gICAgbWFyZ2luOiAwLjVyZW07XFxuICAgIHBhZGRpbmc6IDAuMnJlbSAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuaW5wdXQsIHRleHRhcmVhIHtcXG4gICAgcGFkZGluZzogMC41ZW0gMmVtO1xcbn1cXG5cXG4ucHJvamVjdFRpdGxlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBmb250LXNpemU6IDQwcHQ7XFxuICAgIHBhZGRpbmc6IDQwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmRpc3BsYXkgYnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbiAgICBib3JkZXI6IDFwdCBzb2xpZDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG59XFxuLmRpc3BsYXkgLmFkZEFUYXNrIHtcXG4gICAgbWFyZ2luOiAwIDAgMjBweCA4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxufVxcblxcbi5kaXNwbGF5IGJ1dHRvbjpob3ZlciwgI2FkZFRhc2sgYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjQyLCAxMjcpO1xcbn1cXG4uc2F2ZSB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG59XFxuI3Rhc2tGb3JtIHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbn1cXG5maWVsZHNldCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdhcDogMTBweDtcXG4gICAgbWFyZ2luOiAwIDVyZW07XFxufVxcbmlucHV0W2lkPSduZXdUYXNrJ106Y2hlY2tlZH5saS50dGl0bGUge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG4gICAgY29sb3I6YmxhY2s7XFxufVxcblxcbi50YXNrTGlzdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG59XFxuLnRhc2tEaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIHBhZGRpbmc6IDAgNDBweDtcXG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbn1cXG4udGFzayB7XFxuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ2FwOiAyMHB4O1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggMTgwcHggNmZyIDNmciAxZnI7XFxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICAgICBcXFwib25lIHR3byBmb3VyIGZpdmUgc2l4XFxcIlxcbiAgICAgICAgXFxcInRocmVlIHRocmVlIHRocmVlIHRocmVlIHRocmVlXFxcIjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4OiAxO1xcbiAgICBmb250LXNpemU6IDE2cHQ7XFxufVxcbiNuZXdUYXNrIHtcXG4gICAgZ3JpZC1hcmVhOiBvbmU7XFxufVxcbi50dGl0bGUge1xcbiAgICBncmlkLWFyZWE6IHR3bztcXG59XFxuLnRkZXNjcmlwdGlvbiB7XFxuICAgIGdyaWQtYXJlYTogdGhyZWU7XFxufVxcbi50ZHVlIHtcXG4gICAgZ3JpZC1hcmVhOiBmb3VyO1xcbn1cXG4udHByaW9yaXR5IHtcXG4gICAgZ3JpZC1hcmVhOiBmaXZlO1xcbn1cXG4udHN0YXIge1xcbiAgICBncmlkLWFyZWE6IHNpeDtcXG59XFxuLnRydWUge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgd2lkdGg6IDIwcHg7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSwyQkFBMkI7SUFDM0I7K0RBQ3dEO0lBQ3hELG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxTQUFTO0lBQ1Qsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixpQ0FBaUM7SUFDakMsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLG1DQUFtQztJQUNuQyxrQkFBa0I7SUFDbEIsMkJBQTJCO0FBQy9CO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsZUFBZTtBQUNuQjtBQUNBO0lBQ0ksWUFBWTtJQUNaLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztBQUNiO0FBQ0E7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxvQ0FBb0M7SUFDcEMsT0FBTztBQUNYO0FBQ0E7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtBQUMzQjtBQUNBO0lBQ0ksdUJBQXVCO0lBQ3ZCLE9BQU87QUFDWDtBQUNBO0lBQ0ksWUFBWTtBQUNoQjtBQUNBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsV0FBVztBQUNmO0FBQ0E7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLG9DQUFvQztJQUNwQyxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLHNCQUFzQjtJQUN0Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSwyQkFBMkI7SUFDM0IsZUFBZTtJQUNmLHlCQUF5QjtBQUM3QjtBQUNBO0lBQ0ksMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0kseURBQTZDO0lBQzdDLHdCQUF3QjtJQUN4Qiw0QkFBNEI7SUFDNUIsWUFBWTtJQUNaLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksWUFBWTtJQUNaLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsVUFBVTtJQUNWLFFBQVE7SUFDUixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxTQUFTO0lBQ1QsYUFBYTtJQUNiLFdBQVc7SUFDWCxvQkFBb0I7SUFDcEIsT0FBTztBQUNYOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsY0FBYztJQUNkLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSwyQkFBMkI7SUFDM0IsZUFBZTtJQUNmLGFBQWE7SUFDYixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQix1QkFBdUI7QUFDM0I7QUFDQTtJQUNJLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLHNCQUFzQjtJQUN0QixlQUFlO0FBQ25CO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsU0FBUztJQUNULGNBQWM7QUFDbEI7QUFDQTtJQUNJLDZCQUE2QjtJQUM3QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0FBQ2xDO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsU0FBUztJQUNULGVBQWU7SUFDZixxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsU0FBUztJQUNULDZDQUE2QztJQUM3Qzs7dUNBRW1DO0lBQ25DLDJCQUEyQjtJQUMzQixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksZUFBZTtBQUNuQjtBQUNBO0lBQ0ksZUFBZTtBQUNuQjtBQUNBO0lBQ0ksY0FBYztBQUNsQjtBQUNBO0lBQ0kseURBQXFDO0lBQ3JDLHdCQUF3QjtJQUN4Qiw0QkFBNEI7SUFDNUIsWUFBWTtJQUNaLFdBQVc7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBzcmM6IHVybCgnLi9mb250cy9mZmZfdHVzai13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICAgICAgIHVybCgnLi9mb250cy9mZmZfdHVzai13ZWJmb250LndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgbWluLWhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uaGVhZGVyLCAuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjpyZ2IoMjUwLCAyMTgsIDIxNSk7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbn1cXG4udGl0bGUge1xcbiAgICBmb250LXNpemU6IDUwcHQ7XFxuICAgIHBhZGRpbmc6IDMwcHggMDtcXG59XFxuLmZvb3RlciB7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgcGFkZGluZzogOHB4IDAgMTVweCAwO1xcbn1cXG5hID4gc3ZnIHtcXG4gICAgc3Ryb2tlOiBibGFjaztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDRweDtcXG4gICAgbGVmdDogMnB4O1xcbn1cXG5hID4gc3ZnIDpob3ZlciB7XFxuICAgIGZpbGw6IGJsYWNrO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5wYW5lbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI0MiwgMTI3KTtcXG4gICAgZmxleDogMTtcXG59XFxuLnRhc2tzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcbi5kaXNwbGF5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxuICAgIGZsZXg6IDM7XFxufVxcbnRleHRhcmVhIHtcXG4gICAgcmVzaXplOiBub25lO1xcbn1cXG4ucGFuZWwgaW1nIHtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDAuNHJlbTtcXG59XFxuLnBhbmVsIGJ1dHRvbiB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI0MiwgMTI3KTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgZm9udC1zaXplOiAyMHB0O1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMCAwLjVyZW0gNXJlbTtcXG59XFxuXFxuYnV0dG9uOmhvdmVyLCAucHJvamVjdEJ0bjpob3ZlciwgLnByb2plY3RCdG46aG92ZXIgLmRyb3Bkb3duYnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxufVxcblxcbi5wcm9qZWN0SGVhZGluZyB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgZm9udC1zaXplOiAzMHB0O1xcbiAgICBwYWRkaW5nOiAycmVtIDAgMnJlbSA1cmVtO1xcbn1cXG4udGFza0hlYWRpbmcge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIGZvbnQtc2l6ZTogNDBwdDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgbWFyZ2luOiA1NXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0QnRuIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA0ZnIgMWZyO1xcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICAgIGZvbnQtc2l6ZTogMjBwdDtcXG4gICAgcGFkZGluZy1sZWZ0OiA1cmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5kcm9wZG93bmJ0biB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1nL2RvdE1lbnUuc3ZnKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG4udGFza0RpdiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmRyb3Bkb3duRGl2IHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5kcm9wZG93biB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWluLXdpZHRoOiA1MHB4O1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiAtNS41cmVtO1xcbn1cXG5cXG5kaXYuc2hvd01lbnUge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuLmRyb3Bkb3duIGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcbn1cXG4udGFza0RpdiAuZHJvcGRvd24uc2hvd01lbnUge1xcbiAgICB0b3A6IDQ0cHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHJpZ2h0OiAxMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICAgbGVmdDogMDtcXG59XFxuXFxuI3Byb2plY3RGb3JtIHtcXG4gICAgbWFyZ2luOiAxcmVtIDAgMCA1cmVtO1xcbiAgICBmb250LXNpemU6IDIwcHQ7XFxufVxcbmJ1dHRvbi5jYW5jZWxQcm9qZWN0LCBidXR0b24uYWRkUHJvamVjdCB7XFxuICAgIGJvcmRlcjogc29saWQgMXB4O1xcbiAgICB3aWR0aDogOHJlbTtcXG4gICAgbWFyZ2luOiAwLjVyZW07XFxuICAgIHBhZGRpbmc6IDAuMnJlbSAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuaW5wdXQsIHRleHRhcmVhIHtcXG4gICAgcGFkZGluZzogMC41ZW0gMmVtO1xcbn1cXG5cXG4ucHJvamVjdFRpdGxlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBmb250LXNpemU6IDQwcHQ7XFxuICAgIHBhZGRpbmc6IDQwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmRpc3BsYXkgYnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbiAgICBib3JkZXI6IDFwdCBzb2xpZDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG59XFxuLmRpc3BsYXkgLmFkZEFUYXNrIHtcXG4gICAgbWFyZ2luOiAwIDAgMjBweCA4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxufVxcblxcbi5kaXNwbGF5IGJ1dHRvbjpob3ZlciwgI2FkZFRhc2sgYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjQyLCAxMjcpO1xcbn1cXG4uc2F2ZSB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG59XFxuI3Rhc2tGb3JtIHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbn1cXG5maWVsZHNldCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdhcDogMTBweDtcXG4gICAgbWFyZ2luOiAwIDVyZW07XFxufVxcbmlucHV0W2lkPSduZXdUYXNrJ106Y2hlY2tlZH5saS50dGl0bGUge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG4gICAgY29sb3I6YmxhY2s7XFxufVxcblxcbi50YXNrTGlzdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG59XFxuLnRhc2tEaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIHBhZGRpbmc6IDAgNDBweDtcXG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbn1cXG4udGFzayB7XFxuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ2FwOiAyMHB4O1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggMTgwcHggNmZyIDNmciAxZnI7XFxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICAgICBcXFwib25lIHR3byBmb3VyIGZpdmUgc2l4XFxcIlxcbiAgICAgICAgXFxcInRocmVlIHRocmVlIHRocmVlIHRocmVlIHRocmVlXFxcIjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4OiAxO1xcbiAgICBmb250LXNpemU6IDE2cHQ7XFxufVxcbiNuZXdUYXNrIHtcXG4gICAgZ3JpZC1hcmVhOiBvbmU7XFxufVxcbi50dGl0bGUge1xcbiAgICBncmlkLWFyZWE6IHR3bztcXG59XFxuLnRkZXNjcmlwdGlvbiB7XFxuICAgIGdyaWQtYXJlYTogdGhyZWU7XFxufVxcbi50ZHVlIHtcXG4gICAgZ3JpZC1hcmVhOiBmb3VyO1xcbn1cXG4udHByaW9yaXR5IHtcXG4gICAgZ3JpZC1hcmVhOiBmaXZlO1xcbn1cXG4udHN0YXIge1xcbiAgICBncmlkLWFyZWE6IHNpeDtcXG59XFxuLnRydWUge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWcvc3Rhci5zdmcpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgd2lkdGg6IDIwcHg7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVpcmVkQXJncyhyZXF1aXJlZCwgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocmVxdWlyZWQgKyAnIGFyZ3VtZW50JyArIChyZXF1aXJlZCA+IDEgPyAncycgOiAnJykgKyAnIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJncy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvSW50ZWdlcihkaXJ0eU51bWJlcikge1xuICBpZiAoZGlydHlOdW1iZXIgPT09IG51bGwgfHwgZGlydHlOdW1iZXIgPT09IHRydWUgfHwgZGlydHlOdW1iZXIgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuXG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuXG4gIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfVxuXG4gIHJldHVybiBudW1iZXIgPCAwID8gTWF0aC5jZWlsKG51bWJlcikgOiBNYXRoLmZsb29yKG51bWJlcik7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBjb21wYXJlQXNjXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiBjb25zdCByZXN1bHQgPSBjb21wYXJlQXNjKG5ldyBEYXRlKDE5ODcsIDEsIDExKSwgbmV3IERhdGUoMTk4OSwgNiwgMTApKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIGNvbnN0IHJlc3VsdCA9IFtcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiBdLnNvcnQoY29tcGFyZUFzYylcbiAqIC8vPT4gW1xuICogLy8gICBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDAsXG4gKiAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbiAqIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGFyZUFzYyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZVJpZ2h0KTtcbiAgdmFyIGRpZmYgPSBkYXRlTGVmdC5nZXRUaW1lKCkgLSBkYXRlUmlnaHQuZ2V0VGltZSgpO1xuXG4gIGlmIChkaWZmIDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgIHJldHVybiAxOyAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGlmZjtcbiAgfVxufSIsIi8qKlxuICogRGF5cyBpbiAxIHdlZWsuXG4gKlxuICogQG5hbWUgZGF5c0luV2Vla1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuZXhwb3J0IHZhciBkYXlzSW5XZWVrID0gNztcbi8qKlxuICogTWF4aW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQG5hbWUgbWF4VGltZVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1heFRpbWUgPSBNYXRoLnBvdygxMCwgOCkgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xuLyoqXG4gKiBNaWxsaXNlY29uZHMgaW4gMSBtaW51dGVcbiAqXG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbk1pbnV0ZVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pbGxpc2Vjb25kc0luTWludXRlID0gNjAwMDA7XG4vKipcbiAqIE1pbGxpc2Vjb25kcyBpbiAxIGhvdXJcbiAqXG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkhvdXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaWxsaXNlY29uZHNJbkhvdXIgPSAzNjAwMDAwO1xuLyoqXG4gKiBNaWxsaXNlY29uZHMgaW4gMSBzZWNvbmRcbiAqXG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJblNlY29uZFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pbGxpc2Vjb25kc0luU2Vjb25kID0gMTAwMDtcbi8qKlxuICogTWluaW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQG5hbWUgbWluVGltZVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pblRpbWUgPSAtbWF4VGltZTtcbi8qKlxuICogTWludXRlcyBpbiAxIGhvdXJcbiAqXG4gKiBAbmFtZSBtaW51dGVzSW5Ib3VyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWludXRlc0luSG91ciA9IDYwO1xuLyoqXG4gKiBNb250aHMgaW4gMSBxdWFydGVyXG4gKlxuICogQG5hbWUgbW9udGhzSW5RdWFydGVyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbW9udGhzSW5RdWFydGVyID0gMztcbi8qKlxuICogTW9udGhzIGluIDEgeWVhclxuICpcbiAqIEBuYW1lIG1vbnRoc0luWWVhclxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1vbnRoc0luWWVhciA9IDEyO1xuLyoqXG4gKiBRdWFydGVycyBpbiAxIHllYXJcbiAqXG4gKiBAbmFtZSBxdWFydGVyc0luWWVhclxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIHF1YXJ0ZXJzSW5ZZWFyID0gNDtcbi8qKlxuICogU2Vjb25kcyBpbiAxIGhvdXJcbiAqXG4gKiBAbmFtZSBzZWNvbmRzSW5Ib3VyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgc2Vjb25kc0luSG91ciA9IDM2MDA7XG4vKipcbiAqIFNlY29uZHMgaW4gMSBtaW51dGVcbiAqXG4gKiBAbmFtZSBzZWNvbmRzSW5NaW51dGVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBzZWNvbmRzSW5NaW51dGUgPSA2MDsiLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbkhvdXIsIG1pbGxpc2Vjb25kc0luTWludXRlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHBhcnNlSVNPXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFBhcnNlIElTTyBzdHJpbmdcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFBhcnNlIHRoZSBnaXZlbiBzdHJpbmcgaW4gSVNPIDg2MDEgZm9ybWF0IGFuZCByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBGdW5jdGlvbiBhY2NlcHRzIGNvbXBsZXRlIElTTyA4NjAxIGZvcm1hdHMgYXMgd2VsbCBhcyBwYXJ0aWFsIGltcGxlbWVudGF0aW9ucy5cbiAqIElTTyA4NjAxOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzbid0IGEgc3RyaW5nLCB0aGUgZnVuY3Rpb24gY2Fubm90IHBhcnNlIHRoZSBzdHJpbmcgb3JcbiAqIHRoZSB2YWx1ZXMgYXJlIGludmFsaWQsIGl0IHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogLSBUaGUgcHJldmlvdXMgYHBhcnNlYCBpbXBsZW1lbnRhdGlvbiB3YXMgcmVuYW1lZCB0byBgcGFyc2VJU09gLlxuICpcbiAqICAgYGBgamF2YXNjcmlwdFxuICogICAvLyBCZWZvcmUgdjIuMC4wXG4gKiAgIHBhcnNlKCcyMDE2LTAxLTAxJylcbiAqXG4gKiAgIC8vIHYyLjAuMCBvbndhcmRcbiAqICAgcGFyc2VJU08oJzIwMTYtMDEtMDEnKVxuICogICBgYGBcbiAqXG4gKiAtIGBwYXJzZUlTT2Agbm93IHZhbGlkYXRlcyBzZXBhcmF0ZSBkYXRlIGFuZCB0aW1lIHZhbHVlcyBpbiBJU08tODYwMSBzdHJpbmdzXG4gKiAgIGFuZCByZXR1cm5zIGBJbnZhbGlkIERhdGVgIGlmIHRoZSBkYXRlIGlzIGludmFsaWQuXG4gKlxuICogICBgYGBqYXZhc2NyaXB0XG4gKiAgIHBhcnNlSVNPKCcyMDE4LTEzLTMyJylcbiAqICAgLy89PiBJbnZhbGlkIERhdGVcbiAqICAgYGBgXG4gKlxuICogLSBgcGFyc2VJU09gIG5vdyBkb2Vzbid0IGZhbGwgYmFjayB0byBgbmV3IERhdGVgIGNvbnN0cnVjdG9yXG4gKiAgIGlmIGl0IGZhaWxzIHRvIHBhcnNlIGEgc3RyaW5nIGFyZ3VtZW50LiBJbnN0ZWFkLCBpdCByZXR1cm5zIGBJbnZhbGlkIERhdGVgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSB0aGUgYWRkaXRpb25hbCBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBleHRlbmRlZCB5ZWFyIGZvcm1hdFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgc3RyaW5nICcyMDE0LTAyLTExVDExOjMwOjMwJyB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gcGFyc2VJU08oJzIwMTQtMDItMTFUMTE6MzA6MzAnKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJyswMjAxNDEwMScgdG8gZGF0ZSxcbiAqIC8vIGlmIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0IGlzIDE6XG4gKiBjb25zdCByZXN1bHQgPSBwYXJzZUlTTygnKzAyMDE0MTAxJywgeyBhZGRpdGlvbmFsRGlnaXRzOiAxIH0pXG4gKiAvLz0+IEZyaSBBcHIgMTEgMjAxNCAwMDowMDowMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlSVNPKGFyZ3VtZW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICB2YXIgYWRkaXRpb25hbERpZ2l0cyA9IG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0cyA9PSBudWxsID8gMiA6IHRvSW50ZWdlcihvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHMpO1xuXG4gIGlmIChhZGRpdGlvbmFsRGlnaXRzICE9PSAyICYmIGFkZGl0aW9uYWxEaWdpdHMgIT09IDEgJiYgYWRkaXRpb25hbERpZ2l0cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdhZGRpdGlvbmFsRGlnaXRzIG11c3QgYmUgMCwgMSBvciAyJyk7XG4gIH1cblxuICBpZiAoISh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCkgPT09ICdbb2JqZWN0IFN0cmluZ10nKSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgdmFyIGRhdGVTdHJpbmdzID0gc3BsaXREYXRlU3RyaW5nKGFyZ3VtZW50KTtcbiAgdmFyIGRhdGU7XG5cbiAgaWYgKGRhdGVTdHJpbmdzLmRhdGUpIHtcbiAgICB2YXIgcGFyc2VZZWFyUmVzdWx0ID0gcGFyc2VZZWFyKGRhdGVTdHJpbmdzLmRhdGUsIGFkZGl0aW9uYWxEaWdpdHMpO1xuICAgIGRhdGUgPSBwYXJzZURhdGUocGFyc2VZZWFyUmVzdWx0LnJlc3REYXRlU3RyaW5nLCBwYXJzZVllYXJSZXN1bHQueWVhcik7XG4gIH1cblxuICBpZiAoIWRhdGUgfHwgaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gIHZhciB0aW1lID0gMDtcbiAgdmFyIG9mZnNldDtcblxuICBpZiAoZGF0ZVN0cmluZ3MudGltZSkge1xuICAgIHRpbWUgPSBwYXJzZVRpbWUoZGF0ZVN0cmluZ3MudGltZSk7XG5cbiAgICBpZiAoaXNOYU4odGltZSkpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lem9uZSkge1xuICAgIG9mZnNldCA9IHBhcnNlVGltZXpvbmUoZGF0ZVN0cmluZ3MudGltZXpvbmUpO1xuXG4gICAgaWYgKGlzTmFOKG9mZnNldCkpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgZGlydHlEYXRlID0gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSk7IC8vIGpzIHBhcnNlZCBzdHJpbmcgYXNzdW1pbmcgaXQncyBpbiBVVEMgdGltZXpvbmVcbiAgICAvLyBidXQgd2UgbmVlZCBpdCB0byBiZSBwYXJzZWQgaW4gb3VyIHRpbWV6b25lXG4gICAgLy8gc28gd2UgdXNlIHV0YyB2YWx1ZXMgdG8gYnVpbGQgZGF0ZSBpbiBvdXIgdGltZXpvbmUuXG4gICAgLy8gWWVhciB2YWx1ZXMgZnJvbSAwIHRvIDk5IG1hcCB0byB0aGUgeWVhcnMgMTkwMCB0byAxOTk5XG4gICAgLy8gc28gc2V0IHllYXIgZXhwbGljaXRseSB3aXRoIHNldEZ1bGxZZWFyLlxuXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRGdWxsWWVhcihkaXJ0eURhdGUuZ2V0VVRDRnVsbFllYXIoKSwgZGlydHlEYXRlLmdldFVUQ01vbnRoKCksIGRpcnR5RGF0ZS5nZXRVVENEYXRlKCkpO1xuICAgIHJlc3VsdC5zZXRIb3VycyhkaXJ0eURhdGUuZ2V0VVRDSG91cnMoKSwgZGlydHlEYXRlLmdldFVUQ01pbnV0ZXMoKSwgZGlydHlEYXRlLmdldFVUQ1NlY29uZHMoKSwgZGlydHlEYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUgKyBvZmZzZXQpO1xufVxudmFyIHBhdHRlcm5zID0ge1xuICBkYXRlVGltZURlbGltaXRlcjogL1tUIF0vLFxuICB0aW1lWm9uZURlbGltaXRlcjogL1taIF0vaSxcbiAgdGltZXpvbmU6IC8oW1orLV0uKikkL1xufTtcbnZhciBkYXRlUmVnZXggPSAvXi0/KD86KFxcZHszfSl8KFxcZHsyfSkoPzotPyhcXGR7Mn0pKT98VyhcXGR7Mn0pKD86LT8oXFxkezF9KSk/fCkkLztcbnZhciB0aW1lUmVnZXggPSAvXihcXGR7Mn0oPzpbLixdXFxkKik/KSg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8oPzo6PyhcXGR7Mn0oPzpbLixdXFxkKik/KSk/JC87XG52YXIgdGltZXpvbmVSZWdleCA9IC9eKFsrLV0pKFxcZHsyfSkoPzo6PyhcXGR7Mn0pKT8kLztcblxuZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nKGRhdGVTdHJpbmcpIHtcbiAgdmFyIGRhdGVTdHJpbmdzID0ge307XG4gIHZhciBhcnJheSA9IGRhdGVTdHJpbmcuc3BsaXQocGF0dGVybnMuZGF0ZVRpbWVEZWxpbWl0ZXIpO1xuICB2YXIgdGltZVN0cmluZzsgLy8gVGhlIHJlZ2V4IG1hdGNoIHNob3VsZCBvbmx5IHJldHVybiBhdCBtYXhpbXVtIHR3byBhcnJheSBlbGVtZW50cy5cbiAgLy8gW2RhdGVdLCBbdGltZV0sIG9yIFtkYXRlLCB0aW1lXS5cblxuICBpZiAoYXJyYXkubGVuZ3RoID4gMikge1xuICAgIHJldHVybiBkYXRlU3RyaW5ncztcbiAgfVxuXG4gIGlmICgvOi8udGVzdChhcnJheVswXSkpIHtcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMF07XG4gIH0gZWxzZSB7XG4gICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IGFycmF5WzBdO1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVsxXTtcblxuICAgIGlmIChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlci50ZXN0KGRhdGVTdHJpbmdzLmRhdGUpKSB7XG4gICAgICBkYXRlU3RyaW5ncy5kYXRlID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlcilbMF07XG4gICAgICB0aW1lU3RyaW5nID0gZGF0ZVN0cmluZy5zdWJzdHIoZGF0ZVN0cmluZ3MuZGF0ZS5sZW5ndGgsIGRhdGVTdHJpbmcubGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICBpZiAodGltZVN0cmluZykge1xuICAgIHZhciB0b2tlbiA9IHBhdHRlcm5zLnRpbWV6b25lLmV4ZWModGltZVN0cmluZyk7XG5cbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nLnJlcGxhY2UodG9rZW5bMV0sICcnKTtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWV6b25lID0gdG9rZW5bMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlU3RyaW5ncztcbn1cblxuZnVuY3Rpb24gcGFyc2VZZWFyKGRhdGVTdHJpbmcsIGFkZGl0aW9uYWxEaWdpdHMpIHtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXig/OihcXFxcZHs0fXxbKy1dXFxcXGR7JyArICg0ICsgYWRkaXRpb25hbERpZ2l0cykgKyAnfSl8KFxcXFxkezJ9fFsrLV1cXFxcZHsnICsgKDIgKyBhZGRpdGlvbmFsRGlnaXRzKSArICd9KSQpJyk7XG4gIHZhciBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2gocmVnZXgpOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuXG4gIGlmICghY2FwdHVyZXMpIHJldHVybiB7XG4gICAgeWVhcjogTmFOLFxuICAgIHJlc3REYXRlU3RyaW5nOiAnJ1xuICB9O1xuICB2YXIgeWVhciA9IGNhcHR1cmVzWzFdID8gcGFyc2VJbnQoY2FwdHVyZXNbMV0pIDogbnVsbDtcbiAgdmFyIGNlbnR1cnkgPSBjYXB0dXJlc1syXSA/IHBhcnNlSW50KGNhcHR1cmVzWzJdKSA6IG51bGw7IC8vIGVpdGhlciB5ZWFyIG9yIGNlbnR1cnkgaXMgbnVsbCwgbm90IGJvdGhcblxuICByZXR1cm4ge1xuICAgIHllYXI6IGNlbnR1cnkgPT09IG51bGwgPyB5ZWFyIDogY2VudHVyeSAqIDEwMCxcbiAgICByZXN0RGF0ZVN0cmluZzogZGF0ZVN0cmluZy5zbGljZSgoY2FwdHVyZXNbMV0gfHwgY2FwdHVyZXNbMl0pLmxlbmd0aClcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGVTdHJpbmcsIHllYXIpIHtcbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcbiAgaWYgKHllYXIgPT09IG51bGwpIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB2YXIgY2FwdHVyZXMgPSBkYXRlU3RyaW5nLm1hdGNoKGRhdGVSZWdleCk7IC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCBzdHJpbmdcblxuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgdmFyIGlzV2Vla0RhdGUgPSAhIWNhcHR1cmVzWzRdO1xuICB2YXIgZGF5T2ZZZWFyID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1sxXSk7XG4gIHZhciBtb250aCA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbMl0pIC0gMTtcbiAgdmFyIGRheSA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbM10pO1xuICB2YXIgd2VlayA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbNF0pO1xuICB2YXIgZGF5T2ZXZWVrID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1s1XSkgLSAxO1xuXG4gIGlmIChpc1dlZWtEYXRlKSB7XG4gICAgaWYgKCF2YWxpZGF0ZVdlZWtEYXRlKHllYXIsIHdlZWssIGRheU9mV2VlaykpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cblxuICAgIHJldHVybiBkYXlPZklTT1dlZWtZZWFyKHllYXIsIHdlZWssIGRheU9mV2Vlayk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKTtcblxuICAgIGlmICghdmFsaWRhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXkpIHx8ICF2YWxpZGF0ZURheU9mWWVhckRhdGUoeWVhciwgZGF5T2ZZZWFyKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuXG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCBtb250aCwgTWF0aC5tYXgoZGF5T2ZZZWFyLCBkYXkpKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZURhdGVVbml0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA/IHBhcnNlSW50KHZhbHVlKSA6IDE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZSh0aW1lU3RyaW5nKSB7XG4gIHZhciBjYXB0dXJlcyA9IHRpbWVTdHJpbmcubWF0Y2godGltZVJlZ2V4KTtcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIE5hTjsgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHRpbWVcblxuICB2YXIgaG91cnMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzFdKTtcbiAgdmFyIG1pbnV0ZXMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzJdKTtcbiAgdmFyIHNlY29uZHMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzNdKTtcblxuICBpZiAoIXZhbGlkYXRlVGltZShob3VycywgbWludXRlcywgc2Vjb25kcykpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIGhvdXJzICogbWlsbGlzZWNvbmRzSW5Ib3VyICsgbWludXRlcyAqIG1pbGxpc2Vjb25kc0luTWludXRlICsgc2Vjb25kcyAqIDEwMDA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZVVuaXQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZSgnLCcsICcuJykpIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZXpvbmUodGltZXpvbmVTdHJpbmcpIHtcbiAgaWYgKHRpbWV6b25lU3RyaW5nID09PSAnWicpIHJldHVybiAwO1xuICB2YXIgY2FwdHVyZXMgPSB0aW1lem9uZVN0cmluZy5tYXRjaCh0aW1lem9uZVJlZ2V4KTtcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIDA7XG4gIHZhciBzaWduID0gY2FwdHVyZXNbMV0gPT09ICcrJyA/IC0xIDogMTtcbiAgdmFyIGhvdXJzID0gcGFyc2VJbnQoY2FwdHVyZXNbMl0pO1xuICB2YXIgbWludXRlcyA9IGNhcHR1cmVzWzNdICYmIHBhcnNlSW50KGNhcHR1cmVzWzNdKSB8fCAwO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lem9uZShob3VycywgbWludXRlcykpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIHNpZ24gKiAoaG91cnMgKiBtaWxsaXNlY29uZHNJbkhvdXIgKyBtaW51dGVzICogbWlsbGlzZWNvbmRzSW5NaW51dGUpO1xufVxuXG5mdW5jdGlvbiBkYXlPZklTT1dlZWtZZWFyKGlzb1dlZWtZZWFyLCB3ZWVrLCBkYXkpIHtcbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgZGF0ZS5zZXRVVENGdWxsWWVhcihpc29XZWVrWWVhciwgMCwgNCk7XG4gIHZhciBmb3VydGhPZkphbnVhcnlEYXkgPSBkYXRlLmdldFVUQ0RheSgpIHx8IDc7XG4gIHZhciBkaWZmID0gKHdlZWsgLSAxKSAqIDcgKyBkYXkgKyAxIC0gZm91cnRoT2ZKYW51YXJ5RGF5O1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKTtcbiAgcmV0dXJuIGRhdGU7XG59IC8vIFZhbGlkYXRpb24gZnVuY3Rpb25zXG4vLyBGZWJydWFyeSBpcyBudWxsIHRvIGhhbmRsZSB0aGUgbGVhcCB5ZWFyICh1c2luZyB8fClcblxuXG52YXIgZGF5c0luTW9udGhzID0gWzMxLCBudWxsLCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG5cbmZ1bmN0aW9uIGlzTGVhcFllYXJJbmRleCh5ZWFyKSB7XG4gIHJldHVybiB5ZWFyICUgNDAwID09PSAwIHx8IHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDA7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSkge1xuICByZXR1cm4gbW9udGggPj0gMCAmJiBtb250aCA8PSAxMSAmJiBkYXRlID49IDEgJiYgZGF0ZSA8PSAoZGF5c0luTW9udGhzW21vbnRoXSB8fCAoaXNMZWFwWWVhckluZGV4KHllYXIpID8gMjkgOiAyOCkpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZURheU9mWWVhckRhdGUoeWVhciwgZGF5T2ZZZWFyKSB7XG4gIHJldHVybiBkYXlPZlllYXIgPj0gMSAmJiBkYXlPZlllYXIgPD0gKGlzTGVhcFllYXJJbmRleCh5ZWFyKSA/IDM2NiA6IDM2NSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlV2Vla0RhdGUoX3llYXIsIHdlZWssIGRheSkge1xuICByZXR1cm4gd2VlayA+PSAxICYmIHdlZWsgPD0gNTMgJiYgZGF5ID49IDAgJiYgZGF5IDw9IDY7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVGltZShob3VycywgbWludXRlcywgc2Vjb25kcykge1xuICBpZiAoaG91cnMgPT09IDI0KSB7XG4gICAgcmV0dXJuIG1pbnV0ZXMgPT09IDAgJiYgc2Vjb25kcyA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiBzZWNvbmRzID49IDAgJiYgc2Vjb25kcyA8IDYwICYmIG1pbnV0ZXMgPj0gMCAmJiBtaW51dGVzIDwgNjAgJiYgaG91cnMgPj0gMCAmJiBob3VycyA8IDI1O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVRpbWV6b25lKF9ob3VycywgbWludXRlcykge1xuICByZXR1cm4gbWludXRlcyA+PSAwICYmIG1pbnV0ZXMgPD0gNTk7XG59IiwiaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgYXJndW1lbnQgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0LmlvL2ZqdWxlXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IFxuICAgIENyZWF0ZVRhc2ssIFxuICAgIG5ld1Rhc2tUaXRsZSwgXG4gICAgbmV3VGFza0RlcywgXG4gICAgbmV3VGFza0R1ZSwgXG4gICAgbmV3VGFza1ByaW9yaXR5LCBcbiAgICBuZXdUYXNrU3RhciwgXG4gICAgbGlzdEFsbFRhc2tzXG59IGZyb20gJy4vdGFza3MnO1xuaW1wb3J0IHsgTGlzdHNPZlRhc2tzIH0gZnJvbSAnLi9saXN0cyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cyc7XG5cblxuY29uc3QgdGFza0xpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tMaXN0Jyk7XG50YXNrTGlzdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZEFUYXNrJykpIHtcbiAgICAgICAgQ3JlYXRlVGFzay5zaG93QWRkVGFzaygpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBhZGRUYXNrcygpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocHJvamVjdHNbal0uc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICBsZXQgZGlzcGxheWVkUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Byb2plY3RzW2pdLmlkfWApO1xuICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IG5ldyBDcmVhdGVUYXNrKCk7XG4gICAgICAgICAgICBhZGRUYXNrLnNhdmVUYXNrKGRpc3BsYXllZFByb2plY3QsIGAke3Byb2plY3RzW2pdLmlkfWApO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2sgPSBkaXNwbGF5ZWRQcm9qZWN0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCBjbG9uZVRhc2sgPSBjdXJyZW50VGFzay5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBsaXN0QWxsVGFza3MuYXBwZW5kQ2hpbGQoY2xvbmVUYXNrKTtcbiAgICAgICAgICAgIExpc3RzT2ZUYXNrcy5jbGVhclRhc2tEaXNwbGF5KCk7XG4gICAgICAgICAgICBkaXNwbGF5ZWRQcm9qZWN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGlua2VkUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Rhc2tGb3JtLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2syID0gbmV3IENyZWF0ZVRhc2soKTtcbiAgICAgICAgICAgIGFkZFRhc2syLnNhdmVUYXNrKGxpbmtlZFByb2plY3QsIGAke3Rhc2tGb3JtLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lVGFzazIgPSBsaW5rZWRQcm9qZWN0Lmxhc3RFbGVtZW50Q2hpbGQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgbGlzdEFsbFRhc2tzLmFwcGVuZENoaWxkKGNsb25lVGFzazIpO1xuICAgICAgICB9XG4gICAgfSAgXG4gICAgdGFza0Zvcm0ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xufVxudGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhZGRUYXNrcygpO1xufSk7XG5cbmNvbnN0IGNhbmNlbFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsYnRuJyk7XG5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIENyZWF0ZVRhc2suY2FuY2VsQWRkVGFzaygpO1xufSk7XG5cbmZ1bmN0aW9uIHNob3dEcm9wZG93bk1lbnUoZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duYnRuJykpIHtcbiAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3dNZW51Jyk7XG4gICAgfVxufVxudGFza0xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0Ryb3Bkb3duTWVudSk7XG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKCcuZHJvcGRvd25idG4nKSkge1xuICAgICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wZG93bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICAgICAgICBpZiAob3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnc2hvd01lbnUnKSkge1xuICAgICAgICAgICAgICAgIG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93TWVudScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbCcpKSB7XG4gICAgICAgIGNvbnN0IHRvRGVsVGFzayA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgY29uc3QgdG9EZWxUYXNrSWQgPSB0b0RlbFRhc2suY2xhc3NMaXN0Lml0ZW0oMCk7XG4gICAgICAgIGNvbnN0IHRvRGVsSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0b0RlbFRhc2tJZH1gKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odG9EZWxUYXNrSWQpO1xuICAgICAgICB0b0RlbEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG50YXNrTGlzdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVUYXNrKTtcblxuZnVuY3Rpb24gZWRpdFRhc2soZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQnKSkge1xuICAgICAgICBDcmVhdGVUYXNrLnNob3dBZGRUYXNrKCk7XG4gICAgICAgIGNvbnN0IHRvRWRpdCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgbmV3VGFza1RpdGxlLnZhbHVlID0gdG9FZGl0LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzJdLnRleHRDb250ZW50O1xuICAgICAgICBuZXdUYXNrRGVzLnZhbHVlID0gdG9FZGl0LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzNdLnRleHRDb250ZW50O1xuICAgICAgICBuZXdUYXNrRHVlLnZhbHVlID0gdG9FZGl0LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzRdLnRleHRDb250ZW50O1xuICAgICAgICBuZXdUYXNrU3Rhci5jaGVja2VkID0gdG9FZGl0LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzVdLnRleHRDb250ZW50O1xuICAgICAgICBuZXdUYXNrUHJpb3JpdHkudmFsdWUgPSB0b0VkaXQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bNl0udGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IGluUHJvamVjdCA9IHRvRWRpdC5jbGFzc0xpc3QuaXRlbSgxKTtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NMaXN0LmFkZChgJHtpblByb2plY3R9YCk7XG5cbiAgICAgICAgY29uc3QgdG9FZGl0VGFza0lkID0gdG9FZGl0LmNsYXNzTGlzdC5pdGVtKDApO1xuICAgICAgICBjb25zdCBkZWxJdGVtc1RvRWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RvRWRpdFRhc2tJZH1gKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odG9FZGl0VGFza0lkKTtcbiAgICAgICAgZGVsSXRlbXNUb0VkaXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbGJ0bicpLnR5cGUgPSAnc3VibWl0JztcbiAgICB9XG59XG50YXNrTGlzdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0VGFzayk7XG5cbmNvbnN0IHRhc2tCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tidG4nKTtcbnRhc2tCdG5zLmZvckVhY2godEJ0biA9PiB7XG4gICAgdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIExpc3RzT2ZUYXNrcy5kaXNwbGF5VGFza3MoZSk7XG4gICAgfSlcbn0pXG5cbi8vUHJvamVjdFxuY29uc3QgYWRkQVByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdEJ0bicpO1xuYWRkQVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgUHJvamVjdC5zaG93QWRkUHJvamVjdCgpO1xufSk7XG5cbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RGb3JtJyk7XG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGFkZEFQcm9qZWN0ID0gbmV3IFByb2plY3QoKTtcbiAgICBhZGRBUHJvamVjdC5hZGRQcm9qZWN0KCk7XG59KTtcblxuY29uc3QgY2FuY2VsQVByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsUHJvamVjdCcpO1xuY2FuY2VsQVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgUHJvamVjdC5jYW5jZWxBZGRQcm9qZWN0KCk7XG59KTtcblxuY29uc3QgcHJvamVjdE1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RMaXN0Jyk7XG5wcm9qZWN0TWVudXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIFByb2plY3QuZGlzcGxheVByb2plY3QoZSk7XG4gICAgUHJvamVjdC5lZGl0UHJvamVjdChlKTtcbiAgICBQcm9qZWN0LmRlbGV0ZVByb2plY3QoZSk7XG4gICAgc2hvd0Ryb3Bkb3duTWVudShlKTtcbn0pO1xuXG4vL3RvLWRvL2J1Z3M6ICA0KXJlYWRtZSA2KWxvY2FsU3RvcmFnZSBzZXQgdyBoaWVyYXJjaHlcblxuIl0sIm5hbWVzIjpbIlRhc2siLCJsaXN0QWxsVGFza3MiLCJsaXN0VG9kYXkiLCJsaXN0VXBjb21pbmciLCJsaXN0U3RhcnJlZCIsIkxpc3RzT2ZUYXNrcyIsImNsZWFyVGFza0Rpc3BsYXkiLCJhbGxMaXN0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJsaXN0Iiwic3R5bGUiLCJkaXNwbGF5IiwiZGlzcGxheVRhc2tzIiwiZSIsInRhc2tidG5zIiwidGJ0biIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJjdXJyZW50VGFyZ2V0IiwicXVlcnlTZWxlY3RvciIsIkNyZWF0ZVRhc2siLCJwcm9qZWN0SWQiLCJQcm9qZWN0IiwiY29uc3RydWN0b3IiLCJwcm9qZWN0TmFtZSIsInNob3dBZGRQcm9qZWN0IiwiYWRkQVByb2plY3RGb3JtIiwiY2FuY2VsQWRkUHJvamVjdCIsInZhbHVlIiwiYWRkUHJvamVjdCIsInByb2plY3RGb3JtIiwibGVuZ3RoIiwiYVByb2plY3QiLCJhUHJvamVjdF9zZXJpYWwiLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIm5ld1Byb2plY3REaXYiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaWQiLCJpbm5lckhUTUwiLCJwcm9qZWN0TGlzdCIsImFwcGVuZENoaWxkIiwibmV3UHJvamVjdExpc3QiLCJkaXNwbGF5UHJvamVjdCIsInRhcmdldCIsImNvbnRhaW5zIiwicHJvamVjdEJ0bnMiLCJwQnRuIiwicHJvamVjdE4iLCJnZXRFbGVtZW50QnlJZCIsImVkaXRQcm9qZWN0IiwidG9SZW5hbWUiLCJwYXJlbnROb2RlIiwiZmlyc3RDaGlsZCIsInRleHRDb250ZW50IiwidG9SZW5hbWVQcm9qZWN0SWQiLCJyZW1vdmVJdGVtIiwicmVtb3ZlIiwiZGVsZXRlUHJvamVjdCIsInRvRGVsUHJvamVjdCIsInRvRGVsUHJvamVjdElkIiwidG9EZWxUYXNrc0FsbCIsInRvRGVsVGFza3NMaXN0IiwidGFzayIsInQiLCJ0U3RvcmFnZU5hbWUiLCJpdGVtIiwiY29tcGFyZUFzYyIsInBhcnNlSVNPIiwidGFza1RpdGxlIiwidGFza0Rlc2NyaXB0aW9uIiwiZHVlRGF0ZSIsInByaW9yaXR5Iiwic3RhcnJlZCIsIm5ld1Rhc2tUaXRsZSIsIm5ld1Rhc2tEZXMiLCJuZXdUYXNrRHVlIiwibmV3VGFza1N0YXIiLCJuZXdUYXNrUHJpb3JpdHkiLCJ0SXRlbUlkIiwic2hvd0FkZFRhc2siLCJ0YXNrRm9ybSIsImNhbmNlbEFkZFRhc2siLCJmb3JtYXR0ZWRUb2RheSIsInRvZGF5IiwiRGF0ZSIsInNldEhvdXJzIiwiZm9ybWF0dGVkRHVlIiwiZm9ybWF0RHVlIiwidGFza0xpc3QiLCJsaXN0RG9tIiwidEl0ZW0iLCJwcm9qZWN0SUQiLCJjYXRlZ29yaXplVGFzayIsIm4iLCJjaGVja2VkIiwic2F2ZVRhc2siLCJhVGFzayIsImFUYXNrX3NlcmlhbCIsInRhc2tMaXN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRUYXNrcyIsInByb2plY3RzIiwiaiIsImRpc3BsYXllZFByb2plY3QiLCJhZGRUYXNrIiwiY3VycmVudFRhc2siLCJsYXN0RWxlbWVudENoaWxkIiwiY2xvbmVUYXNrIiwiY2xvbmVOb2RlIiwibGlua2VkUHJvamVjdCIsImFkZFRhc2syIiwiY2xvbmVUYXNrMiIsInJlbW92ZUF0dHJpYnV0ZSIsInByZXZlbnREZWZhdWx0IiwiY2FuY2VsVGFza0J0biIsInNob3dEcm9wZG93bk1lbnUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0b2dnbGUiLCJ3aW5kb3ciLCJvbmNsaWNrIiwibWF0Y2hlcyIsImRyb3Bkb3ducyIsImkiLCJvcGVuRHJvcGRvd24iLCJkZWxldGVUYXNrIiwidG9EZWxUYXNrIiwidG9EZWxUYXNrSWQiLCJ0b0RlbEl0ZW1zIiwiZWRpdFRhc2siLCJ0b0VkaXQiLCJjaGlsZHJlbiIsImluUHJvamVjdCIsInRvRWRpdFRhc2tJZCIsImRlbEl0ZW1zVG9FZGl0IiwidHlwZSIsInRhc2tCdG5zIiwidEJ0biIsImFkZEFQcm9qZWN0QnRuIiwiYWRkQVByb2plY3QiLCJjYW5jZWxBUHJvamVjdEJ0biIsInByb2plY3RNZW51cyJdLCJzb3VyY2VSb290IjoiIn0=