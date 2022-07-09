"use strict";
const newTaskInput = document.querySelector("#input");
const addTaskBtn = document.querySelector(".addTaskBtn");
const unorderedList = document.querySelector(".collection");
const clearTasksBtn = document.querySelector(".clearTaskBtn");
const listItems = document.querySelectorAll("task-items");
const filterInput = document.querySelector("#filter");

// ADDING TASKS FROM MEMORY

// const tasksFromMemory = function () {
//     const memory = localStorage.tasks;
//     if (memory !== '') {
//         JSON.parse(memory).forEach(function (mem) {

//             const newTaskItem = `<li class="task-item">${mem}<i class="fa fa-remove icon"></i></li>`;

//             unorderedList.insertAdjacentHTML('beforeend', newTaskItem)

//         })
//     } else {

//         console.log('memory empty');
//     }

// }
// tasksFromMemory();

let taskList = [];

// ADDING NEW TASKS FROM TASKS BTN

const addingNewTaskUi = function () {
  const newTaskItem = `<li class="task-item">${newTaskInput.value}<i class="fa fa-remove icon"></i></li>`;
  unorderedList.insertAdjacentHTML("afterbegin", newTaskItem);
  newTaskInput.value = "";
};

const addingMemory = function () {
  const lis = document.querySelectorAll("li");
  lis.forEach(function (li) {
    taskList.push(li.textContent);
  });
  // localStorage.setItem('tasks', JSON.stringify(taskArray));
};

const addNewTask = function () {
  addingNewTaskUi();
  addingMemory();
};

// REMOVING TASKS

const clearTasks = function () {
  unorderedList.innerHTML = "";
  taskList = [];
};

const removingItems = function (event) {
  //   const memory = JSON.parse(localStorage.tasks);
  if (event.target.classList.contains("icon")) {
    event.target.parentElement.remove();
  }

  taskArray = taskArray.filter(function (mem) {
    console.log(event.target.parentElement.textContent);
    return mem !== event.target.parentElement.textContent;

    // const memoria = memory.filter(function (mem) {
    //     console.log(event.target.parentElement.textContent);
    //     return mem !== event.target.parentElement.textContent;
  });
  // localStorage.setItem('tasks', JSON.stringify(memoria))
};

// FILTER TASKS

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

addTaskBtn.addEventListener("click", addNewTask);
clearTasksBtn.addEventListener("click", clearTasks);
unorderedList.addEventListener("click", removingItems);
filterInput.addEventListener("keyup", FilterFunction);
