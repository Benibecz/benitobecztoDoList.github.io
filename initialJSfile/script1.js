"use strict";

// UI Vars
const task = document.querySelector(".taskList");
const tasksList = document.querySelector(".collection");
const filter = document.querySelector("#filterTask");
const taskInput = document.querySelector("#newTask");
// const lis = document.querySelectorAll("li");
// const memoria = JSON.parse(localStorage.getItem("tasks"));

let tareas = [];

if (localStorage.getItem("tasks") === null) {
  tareas = [];
} else {
  tareas = JSON.parse(localStorage.getItem("tasks"));
  tareas.forEach(function (tarea) {
    const li = document.createElement("li");
    li.className = "lista";
    // li.appendChild(document.createTextNode(mem));
    li.innerHTML = `${tarea} <i class='fa fa-remove'></i>`;
    tasksList.appendChild(li);
  });
}

/* TO SEE THE COMPLETE CODE FROM BRAD TRAVERSY, GO TO SANDBOX 4_3_PROJECT */

/* below you tried to save to local storage every time a task was submited, by creating variable test and storing its value directly to storage under tasks but it doesnt work because value of tasks would keep changing with variable test, so you really need a 'session storage' in array tareas */

function addTask(e) {
  const li = document.createElement("li");
  li.className = "lista";
  // li.appendChild(document.createTextNode(taskInput.value));
  li.innerHTML = `${taskInput.value} <i class='fa fa-remove'></i>`;
  tasksList.appendChild(li);
  tareas.push(taskInput.value);
  localStorage.setItem("tasks", JSON.stringify(tareas));
  taskInput.value = "";
  // let test = li.textContent;
  // localStorage.setItem("tasks", test);
}

/**** bTraversy version of removeTasks */
/*
how he removed tasks from UI
-- he had 2 ways. 
---- like what you did mutating the innerHTML of the Ul
---- but he also had a second one which is apparently faster and that is by using a while loop. See below

while(tasksList.firsChild) {
  tasklist.firstChild.remove(taskList.firstChild);
}
-- in the loop above we are saying, while there is a firstChild under tasksList (variable create for ul) then run this block of code
-- in the block of code we selected the firstChild, then attached .remove() and then it will keep looping until there is no more firstChild under ul

*/

function removeTasks() {
  tareas = [];
  tasksList.innerHTML = "";
  localStorage.removeItem("tasks");
}

/**** bTraversy version of removeLi */
/*
-- added event listener to the entire ul
-- but then you have to specify it to the item where the event happened by using e.target
-- e.target will return the icon, but you dont want just to delete the icon you want to delete the entire li
---- to do this you select the parent of the icon with .parentElement
-- then you remove the li by using .remove()
-- he also added a confirmation inside an if statement condition, asking user if they are sure to delete the item, if they say yes(true) then the code is triggered and the selected li is deleted.

tasksList.addEventListener('click', removeLi)

function removeLi(e){

  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?') {
      e.target.parentElement.remove();
    })
    
  }
}

*/

function removeTaskFromLocalStorage(e) {
  e.target.parentElement.remove();
  removeTaskFromLS(e.target.parentElement);
}
function removeTaskFromLS(taskItem) {
  let tusk = [];
  if (tareas === null) {
    tusk = [];
  } else {
    tusk = JSON.parse(localStorage.getItem("tasks"));
  }

  // console.log(tusk);
  // console.log(taskItem.target.parentElement.textContent, tusk);
  // console.log(taskItem.target.textContent);
  tusk.forEach(function (event, index) {
    if (taskItem.textContent === event) {
      // console.log(event);
      console.log(event, index);
      tusk.splice(index, 1);
    }
    tareas = tusk;
    localStorage.setItem("tasks", JSON.stringify(tareas));
  });
  // console.log(tareas);
  // console.log(JSON.stringify(tareas));
}

// Array.from(lis).forEach(function removeLi(e, index) {
//   e.addEventListener("click", function () {
//     this.remove();
//     const tareas = JSON.parse(localStorage.tasks);
//     tareas.splice(index, 1);

//     // // tareas.includes(this.textContent);
//     // console.log(tareas.includes(JSON.stringify(e.textContent)));
//   });
// });

/**** bTraversy how to add filter functionality to filter variable **** */
/*
-- you were not able to figure this one out, so copied code from the tutorial.
-- created a function called filterTasks
-- created variable text that identifies value of the event target and made it always to be lowercase
-- created a for each loop to loop on nodelist created by querySelectorAll( you can loop on nodeList but not on HTML collections)
-- created item variable to define the textContent of the clicked li.
-- created if statement that says
---- if iteam variable in lowecase is in the index or nodelist text then display: flex on the li clicked
---- if not then display: none (hide it)

*/

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll("li").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

document.querySelector(".addTaskBtn").addEventListener("click", addTask);
document.querySelector(".clearTaskBtn").addEventListener("click", removeTasks);
filter.addEventListener("keyup", filterTasks);
document.querySelector("ul").addEventListener("click", removeTaskFromLS);

// document.querySelector("li").addEventListener("click", function () {
//   this.remove();
//   console.log(this);
// });

/********How Brad Traversy did it *******/
