"use strict";

/* *********************** SELECTORS */

const input = document.getElementById("input");
const filterInput = document.getElementById("filter");
const unorderedList = document.querySelector(".collection");
const tasksList = document.querySelectorAll("tasks-list");
const addTaskBtn = document.querySelector(".addTaskBtn");
const clearTaskBtn = document.querySelector(".clearTaskBtn");

/* *********************** STORAGE VARIABLES */

const memory = localStorage.getItem("tasks");
let taskArray = [];
// reloadPage();
// initialised();

/* ***********************RELOAD TASKS LIST */
// function reloadPage() {
//   if (memory !== "") {
//     taskArray = JSON.parse(memory);
//   }
// }

// function initialised() {
if (memory === "") {
  taskArray = [];
} else if (memory !== "") {
  taskArray = JSON.parse(memory);
  taskArray.forEach(function (task) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    li.className = "task-item";
    li.textContent = task;
    // li.appendChild(document.createTextNode(input.value));
    link.innerHTML = `<i class="fa fa-remove remove-item"></i>`;
    li.appendChild(link);
    //   console.log(li);
    unorderedList.appendChild(li);
  });
} else {
  taskArray = JSON.parse(memory);
  taskArray.forEach(function (task) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    li.className = "task-item";
    li.textContent = task;
    // li.appendChild(document.createTextNode(input.value));
    link.innerHTML = `<i class="fa fa-remove remove-item"></i>`;
    li.appendChild(link);
    //   console.log(li);
    unorderedList.appendChild(li);
  });
}
// }

/* ***********************TO ADD NEW ITEM BUTTON */
function addNewTaskUi(e) {
  /* ***** ui  ***** */
  const li = document.createElement("li");
  const link = document.createElement("a");
  li.className = "task-item";
  li.appendChild(document.createTextNode(input.value));
  link.innerHTML = `<i class="fa fa-remove"></i`;
  li.appendChild(link);
  unorderedList.appendChild(li);

  /* ***** adding to array  ***** */

  taskArray.push(input.value);

  /* ***** adding to memory  ***** */

  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// /* *********************** FILTER TASK LIST */

function FilterFunction(e) {
  const lis = document.querySelectorAll("li");
  lis.forEach(function (li) {
    if (li.textContent === filterInput.value) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
  lis.forEach(function (li) {
    if (filterInput.value === "") {
      li.style.display = "flex";
    }
  });
}

/* ***********************CLEAR ALL BUTTON */
function clearAllTasks() {
  /* ***** ui  ***** */
  unorderedList.innerHTML = "";
  /* ***** removing from array  ***** */
  taskArray = [];
  /* ***** removing from memory  ***** */
  localStorage.setItem("tasks", "");
  /* ***** reseting input  ***** */
  input.value = "New Task";
  filterInput.value = "Filter Task";
}

/* ***********************DELETE SPECIFIC TASK ITEM */

// function removeTaskItem(e) {
//   console.log(e.target.classList.contains("remove-item"));
//   if (e.target.classList.contains("remove-item")) {
//     /* ***** ui  ***** */
//     e.target.parentElement.parentElement.remove();
//     // /* ***** removing from array  ***** */
//     // taskArray.splice(index, 1);
//     // console.log(taskArray);
//     // /* ***** removing from memory  ***** */
//     // localStorage.setItem("tasks", JSON.stringify(taskArray));
//   }
// }

function removeTaskItem() {
  const lis = document.querySelectorAll("li");
  const icons = document.querySelectorAll("i");
  icons.forEach(function (icon, index) {
    icon.addEventListener("click", function (e) {
      console.log(lis[index].textContent);
      console.log(e.target.parentElement.parentElement.textContent);
      if (
        lis[index].textContent ===
        e.target.parentElement.parentElement.textContent
      ) {
        // console.log(lis[index].textContent);
        // console.log(e.target.parentElement.parentElement.textContent);
        /* ***** ui  ***** */
        lis[index].remove();
        /* ***** removing from array  ***** */
        taskArray.splice(index, 1);
        console.log(taskArray);
        /* ***** removing from memory  ***** */
        localStorage.setItem("tasks", JSON.stringify(taskArray));
      }
    });
  });
}

function clearInputValues() {
  const inputBoxes = document.querySelectorAll("input");
  inputBoxes.forEach(function (inputBox) {
    inputBox.addEventListener("click", function (e) {
      console.log(e.target.value);
      e.target.value = "";
    });
  });
}
addTaskBtn.addEventListener("click", addNewTaskUi);
clearTaskBtn.addEventListener("click", clearAllTasks);
filterInput.addEventListener("keyup", FilterFunction);
document.body.addEventListener("click", removeTaskItem);
document.body.addEventListener("mouseup", clearInputValues);
