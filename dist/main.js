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
    projectList.appendChild(newProjectDiv);
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: 'fff_tusjbold';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\n         url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\nbody {\n    margin: 0;\n    font-family: monospace;\n}\n\n.container {\n    min-height: 100%;\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n    height: 100vh;\n}\n\n.header, .footer {\n    background-color:rgb(250, 218, 215);\n    text-align: center;\n    font-family: 'fff_tusjbold';\n}\n.title {\n    font-size: 50pt;\n    padding: 30px 0;\n}\n.footer {\n    color: black;\n    padding: 8px 0 15px 0;\n}\na > svg {\n    stroke: black;\n    position: relative;\n    top: 4px;\n    left: 2px;\n}\na > svg :hover {\n    fill: black;\n}\n\n.main {\n    display: flex;\n}\n.panel {\n    background-color: rgb(255, 242, 127);\n    flex: 1;\n}\n.tasks {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n}\n.display {\n    background-color: azure;\n    flex: 3;\n}\ntextarea {\n    resize: none;\n}\n.panel img {\n    height: 30px;\n    width: 30px;\n    position: relative;\n    top: 0.4rem;\n}\n.panel button {\n    border: none;\n    width: 100%;\n    background-color: rgb(255, 242, 127);\n    text-align: left;\n    font-size: 20pt;\n    font-family: monospace;\n    padding: 0.5rem 0 0.5rem 5rem;\n}\n\nbutton:hover, .projectBtn:hover, .projectBtn:hover .dropdownbtn {\n    background-color: azure;\n}\n\n.projectHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 30pt;\n    padding: 2rem 0 2rem 5rem;\n}\n.taskHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 20px;\n    margin: 55px;\n    text-align: center;\n}\n\n.projectBtn {\n    display: grid;\n    grid-template-columns: 4fr 1fr;\n    align-items: baseline;\n    font-size: 20pt;\n    padding-left: 5rem;\n    position: relative;\n    margin-bottom: 1rem;\n}\n.dropdownbtn {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 30px;\n    width: 30px;\n}\n\n.taskDiv {\n    position: relative;\n}\n.dropdownDiv {\n    float: right;\n    position: relative;\n}\n.dropdown {\n    display: none;\n    position: absolute;\n    min-width: 50px;\n    z-index: 1;\n    right: 0;\n    top: -5.5rem;\n}\n\ndiv.showMenu {\n    display: block;\n}\n.dropdown button {\n    background-color: azure;\n}\n.taskDiv .dropdown.showMenu {\n    top: 44px;\n    display: grid;\n    right: 10px;\n    justify-content: end;\n    left: 0;\n}\n\n#projectForm {\n    margin: 1rem 0 0 5rem;\n    font-size: 20pt;\n}\nbutton.cancelProject, button.addProject {\n    border: solid 1px;\n    width: 8rem;\n    margin: 0.5rem;\n    padding: 0.2rem 0;\n    text-align: center;\n    border-radius: 5px;\n}\ninput, textarea {\n    padding: 0.5em 2em;\n}\n\n.projectTitle {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 40px;\n    text-align: center;\n}\n.display button {\n    font-family: monospace;\n    font-size: 16pt;\n    border: 1pt solid;\n    border-radius: 5px;\n    background-color: azure;\n}\n.display .addATask {\n    margin: 0 0 20px 80px;\n    display: flex;\n    align-items: center;\n    padding: 0 15px;\n}\n\n.display button:hover, #addTask button:hover {\n    background-color: rgb(255, 242, 127);\n}\n.save {\n    margin-top: 5px;\n}\n#taskForm {\n    font-family: monospace;\n    font-size: 16pt;\n}\nfieldset {\n    display: grid;\n    gap: 10px;\n    margin: 0 5rem;\n}\ninput[id='newTask']:checked~li.ttitle {\n    text-decoration: line-through;\n    color:black;\n}\n\n.taskList {\n    display: flex;\n    flex-direction: column-reverse;\n}\n.taskDiv {\n    display: flex;\n    gap: 20px;\n    padding: 0 40px;\n    align-items: baseline;\n}\n.task {\n    list-style-type: none;\n    display: grid;\n    gap: 20px;\n    grid-template-columns: 30px 180px 6fr 3fr 1fr;\n    grid-template-areas:\n        \"one two four five six\"\n        \"three three three three three\";\n    justify-content: flex-start;\n    align-items: center;\n    flex: 1;\n    font-size: 16pt;\n}\n.addATask svg {\n    transform: scale(0.75);\n}\n#newTask {\n    grid-area: one;\n}\n.ttitle {\n    grid-area: two;\n}\n.tdescription {\n    grid-area: three;\n    padding-left: 3rem;\n    color: rgb(97, 95, 95);\n}\n.tdue {\n    grid-area: four;\n}\n.tpriority {\n    grid-area: five;\n}\n.tstar {\n    grid-area: six;\n}\n.true {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 20px;\n    width: 20px;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,2BAA2B;IAC3B;+DACwD;IACxD,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,SAAS;IACT,sBAAsB;AAC1B;;AAEA;IACI,gBAAgB;IAChB,aAAa;IACb,iCAAiC;IACjC,aAAa;AACjB;;AAEA;IACI,mCAAmC;IACnC,kBAAkB;IAClB,2BAA2B;AAC/B;AACA;IACI,eAAe;IACf,eAAe;AACnB;AACA;IACI,YAAY;IACZ,qBAAqB;AACzB;AACA;IACI,aAAa;IACb,kBAAkB;IAClB,QAAQ;IACR,SAAS;AACb;AACA;IACI,WAAW;AACf;;AAEA;IACI,aAAa;AACjB;AACA;IACI,oCAAoC;IACpC,OAAO;AACX;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;AAC3B;AACA;IACI,uBAAuB;IACvB,OAAO;AACX;AACA;IACI,YAAY;AAChB;AACA;IACI,YAAY;IACZ,WAAW;IACX,kBAAkB;IAClB,WAAW;AACf;AACA;IACI,YAAY;IACZ,WAAW;IACX,oCAAoC;IACpC,gBAAgB;IAChB,eAAe;IACf,sBAAsB;IACtB,6BAA6B;AACjC;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,2BAA2B;IAC3B,eAAe;IACf,yBAAyB;AAC7B;AACA;IACI,2BAA2B;IAC3B,eAAe;IACf,aAAa;IACb,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,qBAAqB;IACrB,eAAe;IACf,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;AACvB;AACA;IACI,yDAA6C;IAC7C,wBAAwB;IACxB,4BAA4B;IAC5B,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,kBAAkB;AACtB;AACA;IACI,YAAY;IACZ,kBAAkB;AACtB;AACA;IACI,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,UAAU;IACV,QAAQ;IACR,YAAY;AAChB;;AAEA;IACI,cAAc;AAClB;AACA;IACI,uBAAuB;AAC3B;AACA;IACI,SAAS;IACT,aAAa;IACb,WAAW;IACX,oBAAoB;IACpB,OAAO;AACX;;AAEA;IACI,qBAAqB;IACrB,eAAe;AACnB;AACA;IACI,iBAAiB;IACjB,WAAW;IACX,cAAc;IACd,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;AACtB;AACA;IACI,kBAAkB;AACtB;;AAEA;IACI,2BAA2B;IAC3B,eAAe;IACf,aAAa;IACb,kBAAkB;AACtB;AACA;IACI,sBAAsB;IACtB,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,uBAAuB;AAC3B;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,oCAAoC;AACxC;AACA;IACI,eAAe;AACnB;AACA;IACI,sBAAsB;IACtB,eAAe;AACnB;AACA;IACI,aAAa;IACb,SAAS;IACT,cAAc;AAClB;AACA;IACI,6BAA6B;IAC7B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;AACA;IACI,aAAa;IACb,SAAS;IACT,eAAe;IACf,qBAAqB;AACzB;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,SAAS;IACT,6CAA6C;IAC7C;;uCAEmC;IACnC,2BAA2B;IAC3B,mBAAmB;IACnB,OAAO;IACP,eAAe;AACnB;AACA;IACI,sBAAsB;AAC1B;AACA;IACI,cAAc;AAClB;AACA;IACI,cAAc;AAClB;AACA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,sBAAsB;AAC1B;AACA;IACI,eAAe;AACnB;AACA;IACI,eAAe;AACnB;AACA;IACI,cAAc;AAClB;AACA;IACI,yDAAqC;IACrC,wBAAwB;IACxB,4BAA4B;IAC5B,YAAY;IACZ,WAAW;AACf","sourcesContent":["@font-face {\n    font-family: 'fff_tusjbold';\n    src: url('./fonts/fff_tusj-webfont.woff2') format('woff2'),\n         url('./fonts/fff_tusj-webfont.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\n\nbody {\n    margin: 0;\n    font-family: monospace;\n}\n\n.container {\n    min-height: 100%;\n    display: grid;\n    grid-template-rows: auto 1fr auto;\n    height: 100vh;\n}\n\n.header, .footer {\n    background-color:rgb(250, 218, 215);\n    text-align: center;\n    font-family: 'fff_tusjbold';\n}\n.title {\n    font-size: 50pt;\n    padding: 30px 0;\n}\n.footer {\n    color: black;\n    padding: 8px 0 15px 0;\n}\na > svg {\n    stroke: black;\n    position: relative;\n    top: 4px;\n    left: 2px;\n}\na > svg :hover {\n    fill: black;\n}\n\n.main {\n    display: flex;\n}\n.panel {\n    background-color: rgb(255, 242, 127);\n    flex: 1;\n}\n.tasks {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n}\n.display {\n    background-color: azure;\n    flex: 3;\n}\ntextarea {\n    resize: none;\n}\n.panel img {\n    height: 30px;\n    width: 30px;\n    position: relative;\n    top: 0.4rem;\n}\n.panel button {\n    border: none;\n    width: 100%;\n    background-color: rgb(255, 242, 127);\n    text-align: left;\n    font-size: 20pt;\n    font-family: monospace;\n    padding: 0.5rem 0 0.5rem 5rem;\n}\n\nbutton:hover, .projectBtn:hover, .projectBtn:hover .dropdownbtn {\n    background-color: azure;\n}\n\n.projectHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 30pt;\n    padding: 2rem 0 2rem 5rem;\n}\n.taskHeading {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 20px;\n    margin: 55px;\n    text-align: center;\n}\n\n.projectBtn {\n    display: grid;\n    grid-template-columns: 4fr 1fr;\n    align-items: baseline;\n    font-size: 20pt;\n    padding-left: 5rem;\n    position: relative;\n    margin-bottom: 1rem;\n}\n.dropdownbtn {\n    background-image: url(../src/img/dotMenu.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 30px;\n    width: 30px;\n}\n\n.taskDiv {\n    position: relative;\n}\n.dropdownDiv {\n    float: right;\n    position: relative;\n}\n.dropdown {\n    display: none;\n    position: absolute;\n    min-width: 50px;\n    z-index: 1;\n    right: 0;\n    top: -5.5rem;\n}\n\ndiv.showMenu {\n    display: block;\n}\n.dropdown button {\n    background-color: azure;\n}\n.taskDiv .dropdown.showMenu {\n    top: 44px;\n    display: grid;\n    right: 10px;\n    justify-content: end;\n    left: 0;\n}\n\n#projectForm {\n    margin: 1rem 0 0 5rem;\n    font-size: 20pt;\n}\nbutton.cancelProject, button.addProject {\n    border: solid 1px;\n    width: 8rem;\n    margin: 0.5rem;\n    padding: 0.2rem 0;\n    text-align: center;\n    border-radius: 5px;\n}\ninput, textarea {\n    padding: 0.5em 2em;\n}\n\n.projectTitle {\n    font-family: 'fff_tusjbold';\n    font-size: 40pt;\n    padding: 40px;\n    text-align: center;\n}\n.display button {\n    font-family: monospace;\n    font-size: 16pt;\n    border: 1pt solid;\n    border-radius: 5px;\n    background-color: azure;\n}\n.display .addATask {\n    margin: 0 0 20px 80px;\n    display: flex;\n    align-items: center;\n    padding: 0 15px;\n}\n\n.display button:hover, #addTask button:hover {\n    background-color: rgb(255, 242, 127);\n}\n.save {\n    margin-top: 5px;\n}\n#taskForm {\n    font-family: monospace;\n    font-size: 16pt;\n}\nfieldset {\n    display: grid;\n    gap: 10px;\n    margin: 0 5rem;\n}\ninput[id='newTask']:checked~li.ttitle {\n    text-decoration: line-through;\n    color:black;\n}\n\n.taskList {\n    display: flex;\n    flex-direction: column-reverse;\n}\n.taskDiv {\n    display: flex;\n    gap: 20px;\n    padding: 0 40px;\n    align-items: baseline;\n}\n.task {\n    list-style-type: none;\n    display: grid;\n    gap: 20px;\n    grid-template-columns: 30px 180px 6fr 3fr 1fr;\n    grid-template-areas:\n        \"one two four five six\"\n        \"three three three three three\";\n    justify-content: flex-start;\n    align-items: center;\n    flex: 1;\n    font-size: 16pt;\n}\n.addATask svg {\n    transform: scale(0.75);\n}\n#newTask {\n    grid-area: one;\n}\n.ttitle {\n    grid-area: two;\n}\n.tdescription {\n    grid-area: three;\n    padding-left: 3rem;\n    color: rgb(97, 95, 95);\n}\n.tdue {\n    grid-area: four;\n}\n.tpriority {\n    grid-area: five;\n}\n.tstar {\n    grid-area: six;\n}\n.true {\n    background-image: url(./img/star.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 20px;\n    width: 20px;\n}"],"sourceRoot":""}]);
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
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QW1DLG1CQUFtQixrQkFBa0IsR0FBRyxPQUFPLGdGQUFnRixZQUFZLE1BQU0sT0FBTyxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsS0FBSyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVks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QXVCUixDQUF2QjtFQUNBUSwwREFBQSxDQUFvQlIsQ0FBcEI7RUFDQVEsNERBQUEsQ0FBc0JSLENBQXRCO0VBQ0EyRyxnQkFBZ0IsQ0FBQzNHLENBQUQsQ0FBaEI7QUFDSCxDQUxELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9saXN0cy5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvLWRvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi90b0ludGVnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2NvbXBhcmVBc2MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2NvbnN0YW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vcGFyc2VJU08vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90by1kby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFzaywgbGlzdEFsbFRhc2tzLCBsaXN0VG9kYXksIGxpc3RVcGNvbWluZywgbGlzdFN0YXJyZWQgfSBmcm9tICcuL3Rhc2tzJztcblxuY2xhc3MgTGlzdHNPZlRhc2tzIGV4dGVuZHMgVGFzayB7XG4gICAgc3RhdGljIGNsZWFyVGFza0Rpc3BsYXkgKCkge1xuICAgICAgICBjb25zdCBhbGxMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrTGlzdCA+IGRpdicpO1xuICAgICAgICBhbGxMaXN0cy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgbGlzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcbiAgICB9IFxuICAgIHN0YXRpYyBkaXNwbGF5VGFza3MoZSkge1xuICAgICAgICB0aGlzLmNsZWFyVGFza0Rpc3BsYXkoKTtcblxuICAgICAgICBjb25zdCB0YXNrYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrYnRuJyk7XG4gICAgICAgIHRhc2tidG5zLmZvckVhY2godGJ0biA9PiB7XG4gICAgICAgICAgICB0YnRuLmNsYXNzTmFtZSA9IHRidG4uY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQgPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbCcpKSB7XG4gICAgICAgICAgICBsaXN0QWxsVGFza3Muc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RheScpKSB7XG4gICAgICAgICAgICBsaXN0VG9kYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cGNvbWluZycpKSB7XG4gICAgICAgICAgICBsaXN0VXBjb21pbmcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFyJykpIHtcbiAgICAgICAgICAgIGxpc3RTdGFycmVkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgfSAgIFxufVxuXG5leHBvcnQgeyBMaXN0c09mVGFza3MgfSIsImltcG9ydCB7IExpc3RzT2ZUYXNrcyB9IGZyb20gJy4vbGlzdHMnO1xuXG5sZXQgcHJvamVjdElkID0gMDtcbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHByb2plY3ROYW1lKSB7XG4gICAgICAgIHRoaXMucHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZTtcbiAgICB9XG4gICAgc3RhdGljIHNob3dBZGRQcm9qZWN0KCkge1xuICAgICAgICBjb25zdCBhZGRBUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdEZvcm0nKTtcbiAgICAgICAgcmV0dXJuIGFkZEFQcm9qZWN0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gICAgc3RhdGljIGNhbmNlbEFkZFByb2plY3QoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0TmFtZScpLnZhbHVlID0gJyc7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdEZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICBhZGRQcm9qZWN0KCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0TmFtZScpLnZhbHVlO1xuICAgICAgICBpZiAocHJvamVjdEZvcm0ubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgICAgICBwcm9qZWN0SWQgKz0gMTtcblxuICAgICAgICBsZXQgYVByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0Rm9ybSk7XG4gICAgICAgIGxldCBhUHJvamVjdF9zZXJpYWwgPSBKU09OLnN0cmluZ2lmeShhUHJvamVjdCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0JHtwcm9qZWN0SWR9YCwgYVByb2plY3Rfc2VyaWFsKTtcblxuICAgICAgICBjb25zdCBuZXdQcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld1Byb2plY3REaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdEJ0bicpO1xuICAgICAgICBuZXdQcm9qZWN0RGl2LmlkID0gYCR7cHJvamVjdElkfWA7XG4gICAgICAgIG5ld1Byb2plY3REaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgJHtwcm9qZWN0Rm9ybX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gJ2Ryb3Bkb3duRGl2Jz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZHJvcGRvd25idG4nPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdkcm9wZG93bic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdyZW5hbWUnPlJlbmFtZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nZGVsUHJvamVjdCc+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RMaXN0Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKG5ld1Byb2plY3REaXYpO1xuXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld1Byb2plY3RMaXN0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICAgICAgbmV3UHJvamVjdExpc3QuaWQgPSBgcHJvamVjdCR7cHJvamVjdElkfWA7XG5cbiAgICAgICAgTGlzdHNPZlRhc2tzLmNsZWFyVGFza0Rpc3BsYXkoKTtcbiAgICAgICAgbmV3UHJvamVjdExpc3QuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1wcm9qZWN0VGl0bGU+JHtwcm9qZWN0Rm9ybX08L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGRBVGFza1wiPjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjQ4XCIgd2lkdGg9XCI0OFwiPjxwYXRoIGQ9XCJNMjIuNSAzOFYyNS41SDEwdi0zaDEyLjVWMTBoM3YxMi41SDM4djNIMjUuNVYzOFpcIi8+PC9zdmc+IEFkZCBhIHRhc2s8L2J1dHRvbj5cbiAgICAgICAgYFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza0xpc3QnKS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0TGlzdCk7XG4gICAgICAgIFxuICAgICAgICBuZXdQcm9qZWN0TGlzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RGb3JtJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0TmFtZScpLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BsYXlQcm9qZWN0KGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdEJ0bicpKSB7XG4gICAgICAgICAgICBMaXN0c09mVGFza3MuY2xlYXJUYXNrRGlzcGxheSgpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdEJ0bicpO1xuICAgICAgICAgICAgcHJvamVjdEJ0bnMuZm9yRWFjaChwQnRuID0+IHtcbiAgICAgICAgICAgICAgICBwQnRuLmNsYXNzTmFtZSA9IHBCdG4uY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGV0IHByb2plY3ROID0gZS50YXJnZXQuaWQ7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvamVjdCR7cHJvamVjdE59YCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICB9IFxuICAgIH1cbiAgICBzdGF0aWMgZWRpdFByb2plY3QoZSkge1xuICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbmFtZScpKSB7XG4gICAgICAgICAgICBjb25zdCB0b1JlbmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0Rm9ybScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3ROYW1lJykudmFsdWUgPSB0b1JlbmFtZS5maXJzdENoaWxkLnRleHRDb250ZW50O1xuXG4gICAgICAgICAgICBjb25zdCB0b1JlbmFtZVByb2plY3RJZCA9IHRvUmVuYW1lLmlkO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHByb2plY3Qke3RvUmVuYW1lUHJvamVjdElkfWApO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dG9SZW5hbWVQcm9qZWN0SWR9YCkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZVByb2plY3QoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxQcm9qZWN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvRGVsUHJvamVjdCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgY29uc3QgdG9EZWxQcm9qZWN0SWQgPSB0b0RlbFByb2plY3QuaWQ7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdCR7dG9EZWxQcm9qZWN0SWR9YCk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0b0RlbFByb2plY3RJZH1gKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgdGFza3MgaW4gbGlzdHNcbiAgICAgICAgICAgIGNvbnN0IHRvRGVsVGFza3NBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJvamVjdCR7dG9EZWxQcm9qZWN0SWR9YCk7XG4gICAgICAgICAgICBjb25zdCB0b0RlbFRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCNwcm9qZWN0JHt0b0RlbFByb2plY3RJZH0gLnByb2plY3Qke3RvRGVsUHJvamVjdElkfWApO1xuICAgICAgICAgICAgdG9EZWxUYXNrc0FsbC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9EZWxUYXNrc0xpc3QuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRTdG9yYWdlTmFtZSA9IHQuY2xhc3NMaXN0Lml0ZW0oMCk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odFN0b3JhZ2VOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBQcm9qZWN0IH07IiwiaW1wb3J0IHsgXG4gICAgY29tcGFyZUFzYywgXG4gICAgcGFyc2VJU08gXG59IGZyb20gJ2RhdGUtZm5zJztcblxuY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBzdGFycmVkKSB7XG4gICAgICAgIHRoaXMudGFza1RpdGxlID0gdGFza1RpdGxlXG4gICAgICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gdGFza0Rlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgICAgIHRoaXMuc3RhcnJlZCA9IHN0YXJyZWRcbiAgICB9XG59XG5cbmNvbnN0IG5ld1Rhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrVGl0bGUnKTtcbmNvbnN0IG5ld1Rhc2tEZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0RlcycpO1xuY29uc3QgbmV3VGFza0R1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG5jb25zdCBuZXdUYXNrU3RhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFycmVkVGFzaycpXG5jb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpb3JpdHknKTtcblxuY29uc3QgbGlzdEFsbFRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RBbGwnKTtcbmNvbnN0IGxpc3RUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0VG9kYXknKTtcbmNvbnN0IGxpc3RVcGNvbWluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0VXBjb21pbmcnKTtcbmNvbnN0IGxpc3RTdGFycmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RTdGFycmVkJyk7XG5cbmxldCB0SXRlbUlkID0gMDtcblxuY2xhc3MgQ3JlYXRlVGFzayBleHRlbmRzIFRhc2t7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBzdGFycmVkKSB7XG4gICAgICAgIHN1cGVyKHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgc3RhcnJlZClcbiAgICB9XG4gICAgc3RhdGljIHNob3dBZGRUYXNrKCkge1xuICAgICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRm9ybScpO1xuICAgICAgICByZXR1cm4gdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgc3RhdGljIGNhbmNlbEFkZFRhc2soKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0Zvcm0nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGZvcm1hdHRlZFRvZGF5KCkge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICAgICAgcmV0dXJuIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIH1cbiAgICBmb3JtYXR0ZWREdWUoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdER1ZSA9IHBhcnNlSVNPKGAke25ld1Rhc2tEdWUudmFsdWV9YCk7XG4gICAgICAgIHJldHVybiBmb3JtYXREdWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgfVxuICAgIHRhc2tMaXN0IChsaXN0RG9tLCB0SXRlbSwgdEl0ZW1JZCwgcHJvamVjdElEKSB7ICBcbiAgICAgICAgbGlzdERvbS5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPSd0YXNrJHt0SXRlbUlkfSAke3Byb2plY3RJRH0gdGFza0Rpdic+XG4gICAgICAgICAgICA8dWwgY2xhc3M9J3Rhc2snPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPSduZXdUJyB0eXBlPSdjaGVja2JveCcgaWQ9J25ld1Rhc2snPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9J25ld1Rhc2snPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSd0dGl0bGUnPiR7dEl0ZW0udGFza1RpdGxlfTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSd0ZGVzY3JpcHRpb24nPiR7dEl0ZW0udGFza0Rlc2NyaXB0aW9ufTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSd0ZHVlJz4ke3RJdGVtLmR1ZURhdGV9PC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9J3Rwcmlvcml0eSc+JHt0SXRlbS5wcmlvcml0eX08L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz0ndHN0YXIgJHt0SXRlbS5zdGFycmVkfSc+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkcm9wZG93bmJ0bic+PC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdkcm9wZG93bic+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2VkaXQnPiBFZGl0IDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdkZWwnPiBEZWxldGUgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9XG4gICAgY2F0ZWdvcml6ZVRhc2sodCwgbiwgaWQpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVBc2ModGhpcy5mb3JtYXR0ZWREdWUoKSwgdGhpcy5mb3JtYXR0ZWRUb2RheSgpKSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0KGxpc3RUb2RheSwgdCwgbiwgaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXBhcmVBc2ModGhpcy5mb3JtYXR0ZWREdWUoKSwgdGhpcy5mb3JtYXR0ZWRUb2RheSgpKSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0KGxpc3RVcGNvbWluZywgdCwgbiwgaWQpO1xuICAgICAgICB9IFxuICAgICAgICBpZiAobmV3VGFza1N0YXIuY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0KGxpc3RTdGFycmVkLCB0LCBuLCBpZCk7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIHNhdmVUYXNrKGxpc3REb20sIHByb2plY3RJRCkge1xuICAgICAgICBpZiAobmV3VGFza1RpdGxlLnZhbHVlLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBhVGFzayA9IG5ldyBUYXNrKG5ld1Rhc2tUaXRsZS52YWx1ZSwgbmV3VGFza0Rlcy52YWx1ZSwgbmV3VGFza0R1ZS52YWx1ZSwgbmV3VGFza1ByaW9yaXR5LnZhbHVlLCBuZXdUYXNrU3Rhci5jaGVja2VkKTtcblxuICAgICAgICB0SXRlbUlkICs9MTtcbiAgICAgICAgdGhpcy50YXNrTGlzdChsaXN0RG9tLCBhVGFzaywgdEl0ZW1JZCwgcHJvamVjdElEKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBhVGFza19zZXJpYWwgPSBKU09OLnN0cmluZ2lmeShhVGFzayk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGB0YXNrJHt0SXRlbUlkfWAsIGFUYXNrX3NlcmlhbCk7XG5cbiAgICAgICAgdGhpcy5jYXRlZ29yaXplVGFzayhhVGFzaywgdEl0ZW1JZCwgcHJvamVjdElEKTtcblxuICAgICAgICBuZXdUYXNrVGl0bGUudmFsdWUgPSAnJztcbiAgICAgICAgbmV3VGFza0Rlcy52YWx1ZSA9ICcnO1xuICAgICAgICBuZXdUYXNrRHVlLnZhbHVlID0gJyc7XG4gICAgICAgIG5ld1Rhc2tTdGFyLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgbmV3VGFza1ByaW9yaXR5LnZhbHVlID0gJyc7XG5cbiAgICAgICAgdGFza0Zvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG59XG5cbmV4cG9ydCB7IFRhc2ssIENyZWF0ZVRhc2ssIG5ld1Rhc2tUaXRsZSwgbmV3VGFza0RlcywgbmV3VGFza0R1ZSwgbmV3VGFza1ByaW9yaXR5LCBuZXdUYXNrU3RhciwgbGlzdEFsbFRhc2tzLCBsaXN0VG9kYXksIGxpc3RVcGNvbWluZywgbGlzdFN0YXJyZWQgfSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL2ZmZl90dXNqLXdlYmZvbnQud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL2ZmZl90dXNqLXdlYmZvbnQud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL3NyYy9pbWcvZG90TWVudS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2ltZy9zdGFyLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgbWluLWhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uaGVhZGVyLCAuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjpyZ2IoMjUwLCAyMTgsIDIxNSk7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbn1cXG4udGl0bGUge1xcbiAgICBmb250LXNpemU6IDUwcHQ7XFxuICAgIHBhZGRpbmc6IDMwcHggMDtcXG59XFxuLmZvb3RlciB7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgcGFkZGluZzogOHB4IDAgMTVweCAwO1xcbn1cXG5hID4gc3ZnIHtcXG4gICAgc3Ryb2tlOiBibGFjaztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDRweDtcXG4gICAgbGVmdDogMnB4O1xcbn1cXG5hID4gc3ZnIDpob3ZlciB7XFxuICAgIGZpbGw6IGJsYWNrO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5wYW5lbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI0MiwgMTI3KTtcXG4gICAgZmxleDogMTtcXG59XFxuLnRhc2tzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcbi5kaXNwbGF5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxuICAgIGZsZXg6IDM7XFxufVxcbnRleHRhcmVhIHtcXG4gICAgcmVzaXplOiBub25lO1xcbn1cXG4ucGFuZWwgaW1nIHtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDAuNHJlbTtcXG59XFxuLnBhbmVsIGJ1dHRvbiB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI0MiwgMTI3KTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgZm9udC1zaXplOiAyMHB0O1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMCAwLjVyZW0gNXJlbTtcXG59XFxuXFxuYnV0dG9uOmhvdmVyLCAucHJvamVjdEJ0bjpob3ZlciwgLnByb2plY3RCdG46aG92ZXIgLmRyb3Bkb3duYnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxufVxcblxcbi5wcm9qZWN0SGVhZGluZyB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgZm9udC1zaXplOiAzMHB0O1xcbiAgICBwYWRkaW5nOiAycmVtIDAgMnJlbSA1cmVtO1xcbn1cXG4udGFza0hlYWRpbmcge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIGZvbnQtc2l6ZTogNDBwdDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgbWFyZ2luOiA1NXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0QnRuIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA0ZnIgMWZyO1xcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICAgIGZvbnQtc2l6ZTogMjBwdDtcXG4gICAgcGFkZGluZy1sZWZ0OiA1cmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5kcm9wZG93bmJ0biB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuLnRhc2tEaXYge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5kcm9wZG93bkRpdiB7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uZHJvcGRvd24ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG1pbi13aWR0aDogNTBweDtcXG4gICAgei1pbmRleDogMTtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogLTUuNXJlbTtcXG59XFxuXFxuZGl2LnNob3dNZW51IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5kcm9wZG93biBidXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG59XFxuLnRhc2tEaXYgLmRyb3Bkb3duLnNob3dNZW51IHtcXG4gICAgdG9wOiA0NHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICByaWdodDogMTBweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7XFxuICAgIGxlZnQ6IDA7XFxufVxcblxcbiNwcm9qZWN0Rm9ybSB7XFxuICAgIG1hcmdpbjogMXJlbSAwIDAgNXJlbTtcXG4gICAgZm9udC1zaXplOiAyMHB0O1xcbn1cXG5idXR0b24uY2FuY2VsUHJvamVjdCwgYnV0dG9uLmFkZFByb2plY3Qge1xcbiAgICBib3JkZXI6IHNvbGlkIDFweDtcXG4gICAgd2lkdGg6IDhyZW07XFxuICAgIG1hcmdpbjogMC41cmVtO1xcbiAgICBwYWRkaW5nOiAwLjJyZW0gMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbmlucHV0LCB0ZXh0YXJlYSB7XFxuICAgIHBhZGRpbmc6IDAuNWVtIDJlbTtcXG59XFxuXFxuLnByb2plY3RUaXRsZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgZm9udC1zaXplOiA0MHB0O1xcbiAgICBwYWRkaW5nOiA0MHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5kaXNwbGF5IGJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMTZwdDtcXG4gICAgYm9yZGVyOiAxcHQgc29saWQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxufVxcbi5kaXNwbGF5IC5hZGRBVGFzayB7XFxuICAgIG1hcmdpbjogMCAwIDIwcHggODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMCAxNXB4O1xcbn1cXG5cXG4uZGlzcGxheSBidXR0b246aG92ZXIsICNhZGRUYXNrIGJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI0MiwgMTI3KTtcXG59XFxuLnNhdmUge1xcbiAgICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcbiN0YXNrRm9ybSB7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMTZwdDtcXG59XFxuZmllbGRzZXQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIG1hcmdpbjogMCA1cmVtO1xcbn1cXG5pbnB1dFtpZD0nbmV3VGFzayddOmNoZWNrZWR+bGkudHRpdGxlIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICAgIGNvbG9yOmJsYWNrO1xcbn1cXG5cXG4udGFza0xpc3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxufVxcbi50YXNrRGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAyMHB4O1xcbiAgICBwYWRkaW5nOiAwIDQwcHg7XFxuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG59XFxuLnRhc2sge1xcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdhcDogMjBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IDE4MHB4IDZmciAzZnIgMWZyO1xcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICAgICAgXFxcIm9uZSB0d28gZm91ciBmaXZlIHNpeFxcXCJcXG4gICAgICAgIFxcXCJ0aHJlZSB0aHJlZSB0aHJlZSB0aHJlZSB0aHJlZVxcXCI7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleDogMTtcXG4gICAgZm9udC1zaXplOiAxNnB0O1xcbn1cXG4uYWRkQVRhc2sgc3ZnIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KTtcXG59XFxuI25ld1Rhc2sge1xcbiAgICBncmlkLWFyZWE6IG9uZTtcXG59XFxuLnR0aXRsZSB7XFxuICAgIGdyaWQtYXJlYTogdHdvO1xcbn1cXG4udGRlc2NyaXB0aW9uIHtcXG4gICAgZ3JpZC1hcmVhOiB0aHJlZTtcXG4gICAgcGFkZGluZy1sZWZ0OiAzcmVtO1xcbiAgICBjb2xvcjogcmdiKDk3LCA5NSwgOTUpO1xcbn1cXG4udGR1ZSB7XFxuICAgIGdyaWQtYXJlYTogZm91cjtcXG59XFxuLnRwcmlvcml0eSB7XFxuICAgIGdyaWQtYXJlYTogZml2ZTtcXG59XFxuLnRzdGFyIHtcXG4gICAgZ3JpZC1hcmVhOiBzaXg7XFxufVxcbi50cnVlIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIHdpZHRoOiAyMHB4O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksMkJBQTJCO0lBQzNCOytEQUN3RDtJQUN4RCxtQkFBbUI7SUFDbkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksU0FBUztJQUNULHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxtQ0FBbUM7SUFDbkMsa0JBQWtCO0lBQ2xCLDJCQUEyQjtBQUMvQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGVBQWU7QUFDbkI7QUFDQTtJQUNJLFlBQVk7SUFDWixxQkFBcUI7QUFDekI7QUFDQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7QUFDYjtBQUNBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjtBQUNBO0lBQ0ksb0NBQW9DO0lBQ3BDLE9BQU87QUFDWDtBQUNBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7QUFDM0I7QUFDQTtJQUNJLHVCQUF1QjtJQUN2QixPQUFPO0FBQ1g7QUFDQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLFdBQVc7QUFDZjtBQUNBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxvQ0FBb0M7SUFDcEMsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixzQkFBc0I7SUFDdEIsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLGVBQWU7SUFDZix5QkFBeUI7QUFDN0I7QUFDQTtJQUNJLDJCQUEyQjtJQUMzQixlQUFlO0lBQ2YsYUFBYTtJQUNiLFlBQVk7SUFDWixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLHlEQUE2QztJQUM3Qyx3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLFlBQVk7SUFDWixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLFVBQVU7SUFDVixRQUFRO0lBQ1IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQjtBQUNBO0lBQ0ksU0FBUztJQUNULGFBQWE7SUFDYixXQUFXO0lBQ1gsb0JBQW9CO0lBQ3BCLE9BQU87QUFDWDs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixlQUFlO0FBQ25CO0FBQ0E7SUFDSSxpQkFBaUI7SUFDakIsV0FBVztJQUNYLGNBQWM7SUFDZCxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixhQUFhO0lBQ2Isa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxxQkFBcUI7SUFDckIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLFNBQVM7SUFDVCxjQUFjO0FBQ2xCO0FBQ0E7SUFDSSw2QkFBNkI7SUFDN0IsV0FBVztBQUNmOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtBQUNsQztBQUNBO0lBQ0ksYUFBYTtJQUNiLFNBQVM7SUFDVCxlQUFlO0lBQ2YscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7SUFDckIsYUFBYTtJQUNiLFNBQVM7SUFDVCw2Q0FBNkM7SUFDN0M7O3VDQUVtQztJQUNuQywyQkFBMkI7SUFDM0IsbUJBQW1CO0lBQ25CLE9BQU87SUFDUCxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsc0JBQXNCO0FBQzFCO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxjQUFjO0FBQ2xCO0FBQ0E7SUFDSSx5REFBcUM7SUFDckMsd0JBQXdCO0lBQ3hCLDRCQUE0QjtJQUM1QixZQUFZO0lBQ1osV0FBVztBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIHNyYzogdXJsKCcuL2ZvbnRzL2ZmZl90dXNqLXdlYmZvbnQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgICAgICAgdXJsKCcuL2ZvbnRzL2ZmZl90dXNqLXdlYmZvbnQud29mZicpIGZvcm1hdCgnd29mZicpO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbmJvZHkge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxuICAgIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5oZWFkZXIsIC5mb290ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYigyNTAsIDIxOCwgMjE1KTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxufVxcbi50aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogNTBwdDtcXG4gICAgcGFkZGluZzogMzBweCAwO1xcbn1cXG4uZm9vdGVyIHtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBwYWRkaW5nOiA4cHggMCAxNXB4IDA7XFxufVxcbmEgPiBzdmcge1xcbiAgICBzdHJva2U6IGJsYWNrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogNHB4O1xcbiAgICBsZWZ0OiAycHg7XFxufVxcbmEgPiBzdmcgOmhvdmVyIHtcXG4gICAgZmlsbDogYmxhY2s7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLnBhbmVsIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjQyLCAxMjcpO1xcbiAgICBmbGV4OiAxO1xcbn1cXG4udGFza3Mge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLmRpc3BsYXkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG4gICAgZmxleDogMztcXG59XFxudGV4dGFyZWEge1xcbiAgICByZXNpemU6IG5vbmU7XFxufVxcbi5wYW5lbCBpbWcge1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogMC40cmVtO1xcbn1cXG4ucGFuZWwgYnV0dG9uIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjQyLCAxMjcpO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBmb250LXNpemU6IDIwcHQ7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAwIDAuNXJlbSA1cmVtO1xcbn1cXG5cXG5idXR0b246aG92ZXIsIC5wcm9qZWN0QnRuOmhvdmVyLCAucHJvamVjdEJ0bjpob3ZlciAuZHJvcGRvd25idG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG59XFxuXFxuLnByb2plY3RIZWFkaW5nIHtcXG4gICAgZm9udC1mYW1pbHk6ICdmZmZfdHVzamJvbGQnO1xcbiAgICBmb250LXNpemU6IDMwcHQ7XFxuICAgIHBhZGRpbmc6IDJyZW0gMCAycmVtIDVyZW07XFxufVxcbi50YXNrSGVhZGluZyB7XFxuICAgIGZvbnQtZmFtaWx5OiAnZmZmX3R1c2pib2xkJztcXG4gICAgZm9udC1zaXplOiA0MHB0O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBtYXJnaW46IDU1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnByb2plY3RCdG4ge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDRmciAxZnI7XFxuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gICAgZm9udC1zaXplOiAyMHB0O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDVyZW07XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuLmRyb3Bkb3duYnRuIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL3NyYy9pbWcvZG90TWVudS5zdmcpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IDMwcHg7XFxufVxcblxcbi50YXNrRGl2IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uZHJvcGRvd25EaXYge1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmRyb3Bkb3duIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBtaW4td2lkdGg6IDUwcHg7XFxuICAgIHotaW5kZXg6IDE7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IC01LjVyZW07XFxufVxcblxcbmRpdi5zaG93TWVudSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uZHJvcGRvd24gYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxufVxcbi50YXNrRGl2IC5kcm9wZG93bi5zaG93TWVudSB7XFxuICAgIHRvcDogNDRweDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcmlnaHQ6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xcbiAgICBsZWZ0OiAwO1xcbn1cXG5cXG4jcHJvamVjdEZvcm0ge1xcbiAgICBtYXJnaW46IDFyZW0gMCAwIDVyZW07XFxuICAgIGZvbnQtc2l6ZTogMjBwdDtcXG59XFxuYnV0dG9uLmNhbmNlbFByb2plY3QsIGJ1dHRvbi5hZGRQcm9qZWN0IHtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHg7XFxuICAgIHdpZHRoOiA4cmVtO1xcbiAgICBtYXJnaW46IDAuNXJlbTtcXG4gICAgcGFkZGluZzogMC4ycmVtIDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5pbnB1dCwgdGV4dGFyZWEge1xcbiAgICBwYWRkaW5nOiAwLjVlbSAyZW07XFxufVxcblxcbi5wcm9qZWN0VGl0bGUge1xcbiAgICBmb250LWZhbWlseTogJ2ZmZl90dXNqYm9sZCc7XFxuICAgIGZvbnQtc2l6ZTogNDBwdDtcXG4gICAgcGFkZGluZzogNDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uZGlzcGxheSBidXR0b24ge1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDE2cHQ7XFxuICAgIGJvcmRlcjogMXB0IHNvbGlkO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcbn1cXG4uZGlzcGxheSAuYWRkQVRhc2sge1xcbiAgICBtYXJnaW46IDAgMCAyMHB4IDgwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDAgMTVweDtcXG59XFxuXFxuLmRpc3BsYXkgYnV0dG9uOmhvdmVyLCAjYWRkVGFzayBidXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNDIsIDEyNyk7XFxufVxcbi5zYXZlIHtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4jdGFza0Zvcm0ge1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDE2cHQ7XFxufVxcbmZpZWxkc2V0IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBtYXJnaW46IDAgNXJlbTtcXG59XFxuaW5wdXRbaWQ9J25ld1Rhc2snXTpjaGVja2VkfmxpLnR0aXRsZSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbiAgICBjb2xvcjpibGFjaztcXG59XFxuXFxuLnRhc2tMaXN0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcbn1cXG4udGFza0RpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMjBweDtcXG4gICAgcGFkZGluZzogMCA0MHB4O1xcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcbi50YXNrIHtcXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCAxODBweCA2ZnIgM2ZyIDFmcjtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgICAgIFxcXCJvbmUgdHdvIGZvdXIgZml2ZSBzaXhcXFwiXFxuICAgICAgICBcXFwidGhyZWUgdGhyZWUgdGhyZWUgdGhyZWUgdGhyZWVcXFwiO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXg6IDE7XFxuICAgIGZvbnQtc2l6ZTogMTZwdDtcXG59XFxuLmFkZEFUYXNrIHN2ZyB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC43NSk7XFxufVxcbiNuZXdUYXNrIHtcXG4gICAgZ3JpZC1hcmVhOiBvbmU7XFxufVxcbi50dGl0bGUge1xcbiAgICBncmlkLWFyZWE6IHR3bztcXG59XFxuLnRkZXNjcmlwdGlvbiB7XFxuICAgIGdyaWQtYXJlYTogdGhyZWU7XFxuICAgIHBhZGRpbmctbGVmdDogM3JlbTtcXG4gICAgY29sb3I6IHJnYig5NywgOTUsIDk1KTtcXG59XFxuLnRkdWUge1xcbiAgICBncmlkLWFyZWE6IGZvdXI7XFxufVxcbi50cHJpb3JpdHkge1xcbiAgICBncmlkLWFyZWE6IGZpdmU7XFxufVxcbi50c3RhciB7XFxuICAgIGdyaWQtYXJlYTogc2l4O1xcbn1cXG4udHJ1ZSB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltZy9zdGFyLnN2Zyk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICB3aWR0aDogMjBweDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9JbnRlZ2VyKGRpcnR5TnVtYmVyKSB7XG4gIGlmIChkaXJ0eU51bWJlciA9PT0gbnVsbCB8fCBkaXJ0eU51bWJlciA9PT0gdHJ1ZSB8fCBkaXJ0eU51bWJlciA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgcmV0dXJuIG51bWJlciA8IDAgPyBNYXRoLmNlaWwobnVtYmVyKSA6IE1hdGguZmxvb3IobnVtYmVyKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGNvbXBhcmVBc2NcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvblxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb21wYXJlIDExIEZlYnJ1YXJ5IDE5ODcgYW5kIDEwIEp1bHkgMTk4OTpcbiAqIGNvbnN0IHJlc3VsdCA9IGNvbXBhcmVBc2MobmV3IERhdGUoMTk4NywgMSwgMTEpLCBuZXcgRGF0ZSgxOTg5LCA2LCAxMCkpXG4gKiAvLz0+IC0xXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNvcnQgdGhlIGFycmF5IG9mIGRhdGVzOlxuICogY29uc3QgcmVzdWx0ID0gW1xuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIF0uc29ydChjb21wYXJlQXNjKVxuICogLy89PiBbXG4gKiAvLyAgIFdlZCBGZWIgMTEgMTk4NyAwMDowMDowMCxcbiAqIC8vICAgTW9uIEp1bCAxMCAxOTg5IDAwOjAwOjAwLFxuICogLy8gICBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wYXJlQXNjKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlEYXRlTGVmdCk7XG4gIHZhciBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlEYXRlUmlnaHQpO1xuICB2YXIgZGlmZiA9IGRhdGVMZWZ0LmdldFRpbWUoKSAtIGRhdGVSaWdodC5nZXRUaW1lKCk7XG5cbiAgaWYgKGRpZmYgPCAwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgcmV0dXJuIDE7IC8vIFJldHVybiAwIGlmIGRpZmYgaXMgMDsgcmV0dXJuIE5hTiBpZiBkaWZmIGlzIE5hTlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkaWZmO1xuICB9XG59IiwiLyoqXG4gKiBEYXlzIGluIDEgd2Vlay5cbiAqXG4gKiBAbmFtZSBkYXlzSW5XZWVrXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5leHBvcnQgdmFyIGRheXNJbldlZWsgPSA3O1xuLyoqXG4gKiBNYXhpbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAbmFtZSBtYXhUaW1lXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWF4VGltZSA9IE1hdGgucG93KDEwLCA4KSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4vKipcbiAqIE1pbGxpc2Vjb25kcyBpbiAxIG1pbnV0ZVxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luTWludXRlXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5NaW51dGUgPSA2MDAwMDtcbi8qKlxuICogTWlsbGlzZWNvbmRzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luSG91clxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pbGxpc2Vjb25kc0luSG91ciA9IDM2MDAwMDA7XG4vKipcbiAqIE1pbGxpc2Vjb25kcyBpbiAxIHNlY29uZFxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luU2Vjb25kXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5TZWNvbmQgPSAxMDAwO1xuLyoqXG4gKiBNaW5pbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAbmFtZSBtaW5UaW1lXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWluVGltZSA9IC1tYXhUaW1lO1xuLyoqXG4gKiBNaW51dGVzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIG1pbnV0ZXNJbkhvdXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaW51dGVzSW5Ib3VyID0gNjA7XG4vKipcbiAqIE1vbnRocyBpbiAxIHF1YXJ0ZXJcbiAqXG4gKiBAbmFtZSBtb250aHNJblF1YXJ0ZXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtb250aHNJblF1YXJ0ZXIgPSAzO1xuLyoqXG4gKiBNb250aHMgaW4gMSB5ZWFyXG4gKlxuICogQG5hbWUgbW9udGhzSW5ZZWFyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbW9udGhzSW5ZZWFyID0gMTI7XG4vKipcbiAqIFF1YXJ0ZXJzIGluIDEgeWVhclxuICpcbiAqIEBuYW1lIHF1YXJ0ZXJzSW5ZZWFyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgcXVhcnRlcnNJblllYXIgPSA0O1xuLyoqXG4gKiBTZWNvbmRzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIHNlY29uZHNJbkhvdXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcbi8qKlxuICogU2Vjb25kcyBpbiAxIG1pbnV0ZVxuICpcbiAqIEBuYW1lIHNlY29uZHNJbk1pbnV0ZVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIHNlY29uZHNJbk1pbnV0ZSA9IDYwOyIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luSG91ciwgbWlsbGlzZWNvbmRzSW5NaW51dGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgcGFyc2VJU09cbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUGFyc2UgSVNPIHN0cmluZ1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUGFyc2UgdGhlIGdpdmVuIHN0cmluZyBpbiBJU08gODYwMSBmb3JtYXQgYW5kIHJldHVybiBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEZ1bmN0aW9uIGFjY2VwdHMgY29tcGxldGUgSVNPIDg2MDEgZm9ybWF0cyBhcyB3ZWxsIGFzIHBhcnRpYWwgaW1wbGVtZW50YXRpb25zLlxuICogSVNPIDg2MDE6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzg2MDFcbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXNuJ3QgYSBzdHJpbmcsIHRoZSBmdW5jdGlvbiBjYW5ub3QgcGFyc2UgdGhlIHN0cmluZyBvclxuICogdGhlIHZhbHVlcyBhcmUgaW52YWxpZCwgaXQgcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiAtIFRoZSBwcmV2aW91cyBgcGFyc2VgIGltcGxlbWVudGF0aW9uIHdhcyByZW5hbWVkIHRvIGBwYXJzZUlTT2AuXG4gKlxuICogICBgYGBqYXZhc2NyaXB0XG4gKiAgIC8vIEJlZm9yZSB2Mi4wLjBcbiAqICAgcGFyc2UoJzIwMTYtMDEtMDEnKVxuICpcbiAqICAgLy8gdjIuMC4wIG9ud2FyZFxuICogICBwYXJzZUlTTygnMjAxNi0wMS0wMScpXG4gKiAgIGBgYFxuICpcbiAqIC0gYHBhcnNlSVNPYCBub3cgdmFsaWRhdGVzIHNlcGFyYXRlIGRhdGUgYW5kIHRpbWUgdmFsdWVzIGluIElTTy04NjAxIHN0cmluZ3NcbiAqICAgYW5kIHJldHVybnMgYEludmFsaWQgRGF0ZWAgaWYgdGhlIGRhdGUgaXMgaW52YWxpZC5cbiAqXG4gKiAgIGBgYGphdmFzY3JpcHRcbiAqICAgcGFyc2VJU08oJzIwMTgtMTMtMzInKVxuICogICAvLz0+IEludmFsaWQgRGF0ZVxuICogICBgYGBcbiAqXG4gKiAtIGBwYXJzZUlTT2Agbm93IGRvZXNuJ3QgZmFsbCBiYWNrIHRvIGBuZXcgRGF0ZWAgY29uc3RydWN0b3JcbiAqICAgaWYgaXQgZmFpbHMgdG8gcGFyc2UgYSBzdHJpbmcgYXJndW1lbnQuIEluc3RlYWQsIGl0IHJldHVybnMgYEludmFsaWQgRGF0ZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHswfDF8Mn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c2AgbXVzdCBiZSAwLCAxIG9yIDJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJzIwMTQtMDItMTFUMTE6MzA6MzAnIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBwYXJzZUlTTygnMjAxNC0wMi0xMVQxMTozMDozMCcpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnKzAyMDE0MTAxJyB0byBkYXRlLFxuICogLy8gaWYgdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXQgaXMgMTpcbiAqIGNvbnN0IHJlc3VsdCA9IHBhcnNlSVNPKCcrMDIwMTQxMDEnLCB7IGFkZGl0aW9uYWxEaWdpdHM6IDEgfSlcbiAqIC8vPT4gRnJpIEFwciAxMSAyMDE0IDAwOjAwOjAwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VJU08oYXJndW1lbnQsIGRpcnR5T3B0aW9ucykge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gIHZhciBhZGRpdGlvbmFsRGlnaXRzID0gb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzID09IG51bGwgPyAyIDogdG9JbnRlZ2VyKG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0cyk7XG5cbiAgaWYgKGFkZGl0aW9uYWxEaWdpdHMgIT09IDIgJiYgYWRkaXRpb25hbERpZ2l0cyAhPT0gMSAmJiBhZGRpdGlvbmFsRGlnaXRzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2FkZGl0aW9uYWxEaWdpdHMgbXVzdCBiZSAwLCAxIG9yIDInKTtcbiAgfVxuXG4gIGlmICghKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICB2YXIgZGF0ZVN0cmluZ3MgPSBzcGxpdERhdGVTdHJpbmcoYXJndW1lbnQpO1xuICB2YXIgZGF0ZTtcblxuICBpZiAoZGF0ZVN0cmluZ3MuZGF0ZSkge1xuICAgIHZhciBwYXJzZVllYXJSZXN1bHQgPSBwYXJzZVllYXIoZGF0ZVN0cmluZ3MuZGF0ZSwgYWRkaXRpb25hbERpZ2l0cyk7XG4gICAgZGF0ZSA9IHBhcnNlRGF0ZShwYXJzZVllYXJSZXN1bHQucmVzdERhdGVTdHJpbmcsIHBhcnNlWWVhclJlc3VsdC55ZWFyKTtcbiAgfVxuXG4gIGlmICghZGF0ZSB8fCBpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgdmFyIHRpbWUgPSAwO1xuICB2YXIgb2Zmc2V0O1xuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lKSB7XG4gICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKTtcblxuICAgIGlmIChpc05hTih0aW1lKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGVTdHJpbmdzLnRpbWV6b25lKSB7XG4gICAgb2Zmc2V0ID0gcGFyc2VUaW1lem9uZShkYXRlU3RyaW5ncy50aW1lem9uZSk7XG5cbiAgICBpZiAoaXNOYU4ob2Zmc2V0KSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBkaXJ0eURhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lKTsgLy8ganMgcGFyc2VkIHN0cmluZyBhc3N1bWluZyBpdCdzIGluIFVUQyB0aW1lem9uZVxuICAgIC8vIGJ1dCB3ZSBuZWVkIGl0IHRvIGJlIHBhcnNlZCBpbiBvdXIgdGltZXpvbmVcbiAgICAvLyBzbyB3ZSB1c2UgdXRjIHZhbHVlcyB0byBidWlsZCBkYXRlIGluIG91ciB0aW1lem9uZS5cbiAgICAvLyBZZWFyIHZhbHVlcyBmcm9tIDAgdG8gOTkgbWFwIHRvIHRoZSB5ZWFycyAxOTAwIHRvIDE5OTlcbiAgICAvLyBzbyBzZXQgeWVhciBleHBsaWNpdGx5IHdpdGggc2V0RnVsbFllYXIuXG5cbiAgICB2YXIgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldEZ1bGxZZWFyKGRpcnR5RGF0ZS5nZXRVVENGdWxsWWVhcigpLCBkaXJ0eURhdGUuZ2V0VVRDTW9udGgoKSwgZGlydHlEYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgcmVzdWx0LnNldEhvdXJzKGRpcnR5RGF0ZS5nZXRVVENIb3VycygpLCBkaXJ0eURhdGUuZ2V0VVRDTWludXRlcygpLCBkaXJ0eURhdGUuZ2V0VVRDU2Vjb25kcygpLCBkaXJ0eURhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSArIG9mZnNldCk7XG59XG52YXIgcGF0dGVybnMgPSB7XG4gIGRhdGVUaW1lRGVsaW1pdGVyOiAvW1QgXS8sXG4gIHRpbWVab25lRGVsaW1pdGVyOiAvW1ogXS9pLFxuICB0aW1lem9uZTogLyhbWistXS4qKSQvXG59O1xudmFyIGRhdGVSZWdleCA9IC9eLT8oPzooXFxkezN9KXwoXFxkezJ9KSg/Oi0/KFxcZHsyfSkpP3xXKFxcZHsyfSkoPzotPyhcXGR7MX0pKT98KSQvO1xudmFyIHRpbWVSZWdleCA9IC9eKFxcZHsyfSg/OlsuLF1cXGQqKT8pKD86Oj8oXFxkezJ9KD86Wy4sXVxcZCopPykpPyg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8kLztcbnZhciB0aW1lem9uZVJlZ2V4ID0gL14oWystXSkoXFxkezJ9KSg/Ojo/KFxcZHsyfSkpPyQvO1xuXG5mdW5jdGlvbiBzcGxpdERhdGVTdHJpbmcoZGF0ZVN0cmluZykge1xuICB2YXIgZGF0ZVN0cmluZ3MgPSB7fTtcbiAgdmFyIGFycmF5ID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy5kYXRlVGltZURlbGltaXRlcik7XG4gIHZhciB0aW1lU3RyaW5nOyAvLyBUaGUgcmVnZXggbWF0Y2ggc2hvdWxkIG9ubHkgcmV0dXJuIGF0IG1heGltdW0gdHdvIGFycmF5IGVsZW1lbnRzLlxuICAvLyBbZGF0ZV0sIFt0aW1lXSwgb3IgW2RhdGUsIHRpbWVdLlxuXG4gIGlmIChhcnJheS5sZW5ndGggPiAyKSB7XG4gICAgcmV0dXJuIGRhdGVTdHJpbmdzO1xuICB9XG5cbiAgaWYgKC86Ly50ZXN0KGFycmF5WzBdKSkge1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVswXTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gYXJyYXlbMF07XG4gICAgdGltZVN0cmluZyA9IGFycmF5WzFdO1xuXG4gICAgaWYgKHBhdHRlcm5zLnRpbWVab25lRGVsaW1pdGVyLnRlc3QoZGF0ZVN0cmluZ3MuZGF0ZSkpIHtcbiAgICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBkYXRlU3RyaW5nLnNwbGl0KHBhdHRlcm5zLnRpbWVab25lRGVsaW1pdGVyKVswXTtcbiAgICAgIHRpbWVTdHJpbmcgPSBkYXRlU3RyaW5nLnN1YnN0cihkYXRlU3RyaW5ncy5kYXRlLmxlbmd0aCwgZGF0ZVN0cmluZy5sZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgdmFyIHRva2VuID0gcGF0dGVybnMudGltZXpvbmUuZXhlYyh0aW1lU3RyaW5nKTtcblxuICAgIGlmICh0b2tlbikge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmcucmVwbGFjZSh0b2tlblsxXSwgJycpO1xuICAgICAgZGF0ZVN0cmluZ3MudGltZXpvbmUgPSB0b2tlblsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGVTdHJpbmdzO1xufVxuXG5mdW5jdGlvbiBwYXJzZVllYXIoZGF0ZVN0cmluZywgYWRkaXRpb25hbERpZ2l0cykge1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdeKD86KFxcXFxkezR9fFsrLV1cXFxcZHsnICsgKDQgKyBhZGRpdGlvbmFsRGlnaXRzKSArICd9KXwoXFxcXGR7Mn18WystXVxcXFxkeycgKyAoMiArIGFkZGl0aW9uYWxEaWdpdHMpICsgJ30pJCknKTtcbiAgdmFyIGNhcHR1cmVzID0gZGF0ZVN0cmluZy5tYXRjaChyZWdleCk7IC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG5cbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIHtcbiAgICB5ZWFyOiBOYU4sXG4gICAgcmVzdERhdGVTdHJpbmc6ICcnXG4gIH07XG4gIHZhciB5ZWFyID0gY2FwdHVyZXNbMV0gPyBwYXJzZUludChjYXB0dXJlc1sxXSkgOiBudWxsO1xuICB2YXIgY2VudHVyeSA9IGNhcHR1cmVzWzJdID8gcGFyc2VJbnQoY2FwdHVyZXNbMl0pIDogbnVsbDsgLy8gZWl0aGVyIHllYXIgb3IgY2VudHVyeSBpcyBudWxsLCBub3QgYm90aFxuXG4gIHJldHVybiB7XG4gICAgeWVhcjogY2VudHVyeSA9PT0gbnVsbCA/IHllYXIgOiBjZW50dXJ5ICogMTAwLFxuICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKChjYXB0dXJlc1sxXSB8fCBjYXB0dXJlc1syXSkubGVuZ3RoKVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZVN0cmluZywgeWVhcikge1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICBpZiAoeWVhciA9PT0gbnVsbCkgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIHZhciBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2goZGF0ZVJlZ2V4KTsgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHN0cmluZ1xuXG4gIGlmICghY2FwdHVyZXMpIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB2YXIgaXNXZWVrRGF0ZSA9ICEhY2FwdHVyZXNbNF07XG4gIHZhciBkYXlPZlllYXIgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzFdKTtcbiAgdmFyIG1vbnRoID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1syXSkgLSAxO1xuICB2YXIgZGF5ID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1szXSk7XG4gIHZhciB3ZWVrID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1s0XSk7XG4gIHZhciBkYXlPZldlZWsgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzVdKSAtIDE7XG5cbiAgaWYgKGlzV2Vla0RhdGUpIHtcbiAgICBpZiAoIXZhbGlkYXRlV2Vla0RhdGUoeWVhciwgd2VlaywgZGF5T2ZXZWVrKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRheU9mSVNPV2Vla1llYXIoeWVhciwgd2VlaywgZGF5T2ZXZWVrKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApO1xuXG4gICAgaWYgKCF2YWxpZGF0ZURhdGUoeWVhciwgbW9udGgsIGRheSkgfHwgIXZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG5cbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoLCBNYXRoLm1heChkYXlPZlllYXIsIGRheSkpO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZVVuaXQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID8gcGFyc2VJbnQodmFsdWUpIDogMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lKHRpbWVTdHJpbmcpIHtcbiAgdmFyIGNhcHR1cmVzID0gdGltZVN0cmluZy5tYXRjaCh0aW1lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gTmFOOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuXG4gIHZhciBob3VycyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMV0pO1xuICB2YXIgbWludXRlcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMl0pO1xuICB2YXIgc2Vjb25kcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbM10pO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gaG91cnMgKiBtaWxsaXNlY29uZHNJbkhvdXIgKyBtaW51dGVzICogbWlsbGlzZWNvbmRzSW5NaW51dGUgKyBzZWNvbmRzICogMTAwMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lVW5pdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgcGFyc2VGbG9hdCh2YWx1ZS5yZXBsYWNlKCcsJywgJy4nKSkgfHwgMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lem9uZSh0aW1lem9uZVN0cmluZykge1xuICBpZiAodGltZXpvbmVTdHJpbmcgPT09ICdaJykgcmV0dXJuIDA7XG4gIHZhciBjYXB0dXJlcyA9IHRpbWV6b25lU3RyaW5nLm1hdGNoKHRpbWV6b25lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gMDtcbiAgdmFyIHNpZ24gPSBjYXB0dXJlc1sxXSA9PT0gJysnID8gLTEgOiAxO1xuICB2YXIgaG91cnMgPSBwYXJzZUludChjYXB0dXJlc1syXSk7XG4gIHZhciBtaW51dGVzID0gY2FwdHVyZXNbM10gJiYgcGFyc2VJbnQoY2FwdHVyZXNbM10pIHx8IDA7XG5cbiAgaWYgKCF2YWxpZGF0ZVRpbWV6b25lKGhvdXJzLCBtaW51dGVzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gc2lnbiAqIChob3VycyAqIG1pbGxpc2Vjb25kc0luSG91ciArIG1pbnV0ZXMgKiBtaWxsaXNlY29uZHNJbk1pbnV0ZSk7XG59XG5cbmZ1bmN0aW9uIGRheU9mSVNPV2Vla1llYXIoaXNvV2Vla1llYXIsIHdlZWssIGRheSkge1xuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGlzb1dlZWtZZWFyLCAwLCA0KTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeURheSA9IGRhdGUuZ2V0VVRDRGF5KCkgfHwgNztcbiAgdmFyIGRpZmYgPSAod2VlayAtIDEpICogNyArIGRheSArIDEgLSBmb3VydGhPZkphbnVhcnlEYXk7XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpO1xuICByZXR1cm4gZGF0ZTtcbn0gLy8gVmFsaWRhdGlvbiBmdW5jdGlvbnNcbi8vIEZlYnJ1YXJ5IGlzIG51bGwgdG8gaGFuZGxlIHRoZSBsZWFwIHllYXIgKHVzaW5nIHx8KVxuXG5cbnZhciBkYXlzSW5Nb250aHMgPSBbMzEsIG51bGwsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuZnVuY3Rpb24gaXNMZWFwWWVhckluZGV4KHllYXIpIHtcbiAgcmV0dXJuIHllYXIgJSA0MDAgPT09IDAgfHwgeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSB7XG4gIHJldHVybiBtb250aCA+PSAwICYmIG1vbnRoIDw9IDExICYmIGRhdGUgPj0gMSAmJiBkYXRlIDw9IChkYXlzSW5Nb250aHNbbW9udGhdIHx8IChpc0xlYXBZZWFySW5kZXgoeWVhcikgPyAyOSA6IDI4KSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpIHtcbiAgcmV0dXJuIGRheU9mWWVhciA+PSAxICYmIGRheU9mWWVhciA8PSAoaXNMZWFwWWVhckluZGV4KHllYXIpID8gMzY2IDogMzY1KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVXZWVrRGF0ZShfeWVhciwgd2VlaywgZGF5KSB7XG4gIHJldHVybiB3ZWVrID49IDEgJiYgd2VlayA8PSA1MyAmJiBkYXkgPj0gMCAmJiBkYXkgPD0gNjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSB7XG4gIGlmIChob3VycyA9PT0gMjQpIHtcbiAgICByZXR1cm4gbWludXRlcyA9PT0gMCAmJiBzZWNvbmRzID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIHNlY29uZHMgPj0gMCAmJiBzZWNvbmRzIDwgNjAgJiYgbWludXRlcyA+PSAwICYmIG1pbnV0ZXMgPCA2MCAmJiBob3VycyA+PSAwICYmIGhvdXJzIDwgMjU7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVGltZXpvbmUoX2hvdXJzLCBtaW51dGVzKSB7XG4gIHJldHVybiBtaW51dGVzID49IDAgJiYgbWludXRlcyA8PSA1OTtcbn0iLCJpbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTsgLy8gQ2xvbmUgdGhlIGRhdGVcblxuICBpZiAoYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiBhcmd1bWVudCA9PT0gJ29iamVjdCcgJiYgYXJnU3RyID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnQgPT09ICdudW1iZXInIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGlmICgodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IFN0cmluZ10nKSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXCJTdGFydGluZyB3aXRoIHYyLjAuMC1iZXRhLjEgZGF0ZS1mbnMgZG9lc24ndCBhY2NlcHQgc3RyaW5ncyBhcyBkYXRlIGFyZ3VtZW50cy4gUGxlYXNlIHVzZSBgcGFyc2VJU09gIHRvIHBhcnNlIHN0cmluZ3MuIFNlZTogaHR0cHM6Ly9naXQuaW8vZmp1bGVcIik7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cbiAgICAgIGNvbnNvbGUud2FybihuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn0iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgXG4gICAgQ3JlYXRlVGFzaywgXG4gICAgbmV3VGFza1RpdGxlLCBcbiAgICBuZXdUYXNrRGVzLCBcbiAgICBuZXdUYXNrRHVlLCBcbiAgICBuZXdUYXNrUHJpb3JpdHksIFxuICAgIG5ld1Rhc2tTdGFyLCBcbiAgICBsaXN0QWxsVGFza3Ncbn0gZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgeyBMaXN0c09mVGFza3MgfSBmcm9tICcuL2xpc3RzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdGFza0xpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tMaXN0Jyk7XG50YXNrTGlzdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZEFUYXNrJykpIHtcbiAgICAgICAgQ3JlYXRlVGFzay5zaG93QWRkVGFzaygpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBhZGRUYXNrcygpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocHJvamVjdHNbal0uc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICBsZXQgZGlzcGxheWVkUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Byb2plY3RzW2pdLmlkfWApO1xuICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IG5ldyBDcmVhdGVUYXNrKCk7XG4gICAgICAgICAgICBhZGRUYXNrLnNhdmVUYXNrKGRpc3BsYXllZFByb2plY3QsIGAke3Byb2plY3RzW2pdLmlkfWApO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2sgPSBkaXNwbGF5ZWRQcm9qZWN0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCBjbG9uZVRhc2sgPSBjdXJyZW50VGFzay5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBsaXN0QWxsVGFza3MuYXBwZW5kQ2hpbGQoY2xvbmVUYXNrKTtcbiAgICAgICAgICAgIExpc3RzT2ZUYXNrcy5jbGVhclRhc2tEaXNwbGF5KCk7XG4gICAgICAgICAgICBkaXNwbGF5ZWRQcm9qZWN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGlua2VkUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Rhc2tGb3JtLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2syID0gbmV3IENyZWF0ZVRhc2soKTtcbiAgICAgICAgICAgIGFkZFRhc2syLnNhdmVUYXNrKGxpbmtlZFByb2plY3QsIGAke3Rhc2tGb3JtLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lVGFzazIgPSBsaW5rZWRQcm9qZWN0Lmxhc3RFbGVtZW50Q2hpbGQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgbGlzdEFsbFRhc2tzLmFwcGVuZENoaWxkKGNsb25lVGFzazIpO1xuICAgICAgICB9XG4gICAgfSAgXG4gICAgdGFza0Zvcm0ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xufVxudGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhZGRUYXNrcygpO1xufSk7XG5cbmNvbnN0IGNhbmNlbFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsYnRuJyk7XG5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIENyZWF0ZVRhc2suY2FuY2VsQWRkVGFzaygpO1xufSk7XG5cbmZ1bmN0aW9uIHNob3dEcm9wZG93bk1lbnUoZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duYnRuJykpIHtcbiAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3dNZW51Jyk7XG4gICAgfVxufVxudGFza0xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0Ryb3Bkb3duTWVudSk7XG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKCcuZHJvcGRvd25idG4nKSkge1xuICAgICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wZG93bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICAgICAgICBpZiAob3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnc2hvd01lbnUnKSkge1xuICAgICAgICAgICAgICAgIG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93TWVudScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWwnKSkge1xuICAgICAgICBjb25zdCB0b0RlbFRhc2sgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IHRvRGVsVGFza0lkID0gdG9EZWxUYXNrLmNsYXNzTGlzdC5pdGVtKDApO1xuICAgICAgICBjb25zdCB0b0RlbEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dG9EZWxUYXNrSWR9YCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRvRGVsVGFza0lkKTtcbiAgICAgICAgdG9EZWxJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxudGFza0xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlVGFzayk7XG5cbmZ1bmN0aW9uIGVkaXRUYXNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0JykpIHtcbiAgICAgICAgQ3JlYXRlVGFzay5zaG93QWRkVGFzaygpO1xuICAgICAgICBjb25zdCB0b0VkaXQgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIG5ld1Rhc2tUaXRsZS52YWx1ZSA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlblsyXS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza0Rlcy52YWx1ZSA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza0R1ZS52YWx1ZSA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlbls0XS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza1N0YXIuY2hlY2tlZCA9IHRvRWRpdC5jaGlsZHJlblswXS5jaGlsZHJlbls1XS50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3VGFza1ByaW9yaXR5LnZhbHVlID0gdG9FZGl0LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzZdLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBpblByb2plY3QgPSB0b0VkaXQuY2xhc3NMaXN0Lml0ZW0oMSk7XG4gICAgICAgIHRhc2tGb3JtLmNsYXNzTGlzdC5hZGQoYCR7aW5Qcm9qZWN0fWApO1xuXG4gICAgICAgIGNvbnN0IHRvRWRpdFRhc2tJZCA9IHRvRWRpdC5jbGFzc0xpc3QuaXRlbSgwKTtcbiAgICAgICAgY29uc3QgZGVsSXRlbXNUb0VkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0b0VkaXRUYXNrSWR9YCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRvRWRpdFRhc2tJZCk7XG4gICAgICAgIGRlbEl0ZW1zVG9FZGl0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWxidG4nKS50eXBlID0gJ3N1Ym1pdCc7XG4gICAgfVxufVxudGFza0xpc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdFRhc2spO1xuXG5jb25zdCB0YXNrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrYnRuJyk7XG50YXNrQnRucy5mb3JFYWNoKHRCdG4gPT4ge1xuICAgIHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBMaXN0c09mVGFza3MuZGlzcGxheVRhc2tzKGUpO1xuICAgIH0pXG59KVxuXG4vL1Byb2plY3RcbmNvbnN0IGFkZEFQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3RCdG4nKTtcbmFkZEFQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIFByb2plY3Quc2hvd0FkZFByb2plY3QoKTtcbn0pO1xuXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Rm9ybScpO1xucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBhZGRBUHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG4gICAgYWRkQVByb2plY3QuYWRkUHJvamVjdCgpO1xufSk7XG5cbmNvbnN0IGNhbmNlbEFQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbFByb2plY3QnKTtcbmNhbmNlbEFQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIFByb2plY3QuY2FuY2VsQWRkUHJvamVjdCgpO1xufSk7XG5cbmNvbnN0IHByb2plY3RNZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0TGlzdCcpO1xucHJvamVjdE1lbnVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBQcm9qZWN0LmRpc3BsYXlQcm9qZWN0KGUpO1xuICAgIFByb2plY3QuZWRpdFByb2plY3QoZSk7XG4gICAgUHJvamVjdC5kZWxldGVQcm9qZWN0KGUpO1xuICAgIHNob3dEcm9wZG93bk1lbnUoZSk7XG59KTtcblxuIl0sIm5hbWVzIjpbIlRhc2siLCJsaXN0QWxsVGFza3MiLCJsaXN0VG9kYXkiLCJsaXN0VXBjb21pbmciLCJsaXN0U3RhcnJlZCIsIkxpc3RzT2ZUYXNrcyIsImNsZWFyVGFza0Rpc3BsYXkiLCJhbGxMaXN0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJsaXN0Iiwic3R5bGUiLCJkaXNwbGF5IiwiZGlzcGxheVRhc2tzIiwiZSIsInRhc2tidG5zIiwidGJ0biIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJjdXJyZW50VGFyZ2V0IiwicXVlcnlTZWxlY3RvciIsInByb2plY3RJZCIsIlByb2plY3QiLCJjb25zdHJ1Y3RvciIsInByb2plY3ROYW1lIiwic2hvd0FkZFByb2plY3QiLCJhZGRBUHJvamVjdEZvcm0iLCJjYW5jZWxBZGRQcm9qZWN0IiwidmFsdWUiLCJhZGRQcm9qZWN0IiwicHJvamVjdEZvcm0iLCJsZW5ndGgiLCJhUHJvamVjdCIsImFQcm9qZWN0X3NlcmlhbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwibmV3UHJvamVjdERpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsImlubmVySFRNTCIsInByb2plY3RMaXN0IiwiYXBwZW5kQ2hpbGQiLCJuZXdQcm9qZWN0TGlzdCIsImRpc3BsYXlQcm9qZWN0IiwidGFyZ2V0IiwiY29udGFpbnMiLCJwcm9qZWN0QnRucyIsInBCdG4iLCJwcm9qZWN0TiIsImdldEVsZW1lbnRCeUlkIiwiZWRpdFByb2plY3QiLCJ0b1JlbmFtZSIsInBhcmVudE5vZGUiLCJmaXJzdENoaWxkIiwidGV4dENvbnRlbnQiLCJ0b1JlbmFtZVByb2plY3RJZCIsInJlbW92ZUl0ZW0iLCJyZW1vdmUiLCJkZWxldGVQcm9qZWN0IiwidG9EZWxQcm9qZWN0IiwidG9EZWxQcm9qZWN0SWQiLCJ0b0RlbFRhc2tzQWxsIiwidG9EZWxUYXNrc0xpc3QiLCJ0YXNrIiwidCIsInRTdG9yYWdlTmFtZSIsIml0ZW0iLCJjb21wYXJlQXNjIiwicGFyc2VJU08iLCJ0YXNrVGl0bGUiLCJ0YXNrRGVzY3JpcHRpb24iLCJkdWVEYXRlIiwicHJpb3JpdHkiLCJzdGFycmVkIiwibmV3VGFza1RpdGxlIiwibmV3VGFza0RlcyIsIm5ld1Rhc2tEdWUiLCJuZXdUYXNrU3RhciIsIm5ld1Rhc2tQcmlvcml0eSIsInRJdGVtSWQiLCJDcmVhdGVUYXNrIiwic2hvd0FkZFRhc2siLCJ0YXNrRm9ybSIsImNhbmNlbEFkZFRhc2siLCJmb3JtYXR0ZWRUb2RheSIsInRvZGF5IiwiRGF0ZSIsInNldEhvdXJzIiwiZm9ybWF0dGVkRHVlIiwiZm9ybWF0RHVlIiwidGFza0xpc3QiLCJsaXN0RG9tIiwidEl0ZW0iLCJwcm9qZWN0SUQiLCJjYXRlZ29yaXplVGFzayIsIm4iLCJjaGVja2VkIiwic2F2ZVRhc2siLCJhVGFzayIsImFUYXNrX3NlcmlhbCIsInRhc2tMaXN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRUYXNrcyIsInByb2plY3RzIiwiaiIsImRpc3BsYXllZFByb2plY3QiLCJhZGRUYXNrIiwiY3VycmVudFRhc2siLCJsYXN0RWxlbWVudENoaWxkIiwiY2xvbmVUYXNrIiwiY2xvbmVOb2RlIiwibGlua2VkUHJvamVjdCIsImFkZFRhc2syIiwiY2xvbmVUYXNrMiIsInJlbW92ZUF0dHJpYnV0ZSIsInByZXZlbnREZWZhdWx0IiwiY2FuY2VsVGFza0J0biIsInNob3dEcm9wZG93bk1lbnUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0b2dnbGUiLCJ3aW5kb3ciLCJvbmNsaWNrIiwibWF0Y2hlcyIsImRyb3Bkb3ducyIsImkiLCJvcGVuRHJvcGRvd24iLCJkZWxldGVUYXNrIiwidG9EZWxUYXNrIiwidG9EZWxUYXNrSWQiLCJ0b0RlbEl0ZW1zIiwiZWRpdFRhc2siLCJ0b0VkaXQiLCJjaGlsZHJlbiIsImluUHJvamVjdCIsInRvRWRpdFRhc2tJZCIsImRlbEl0ZW1zVG9FZGl0IiwidHlwZSIsInRhc2tCdG5zIiwidEJ0biIsImFkZEFQcm9qZWN0QnRuIiwiYWRkQVByb2plY3QiLCJjYW5jZWxBUHJvamVjdEJ0biIsInByb2plY3RNZW51cyJdLCJzb3VyY2VSb290IjoiIn0=