function getTaskDetails() {
  const textAreaBox = document.querySelector("textarea");
  const textAreaBoxValue = textAreaBox.value;

  const time = document.querySelector(".time");
  const timeValue = time.value;

  const date = document.querySelector(".date");
  const dateValue = date.value;

  const taskDetails = {
    task: textAreaBoxValue,
    time: timeValue,
    date: dateValue,
  };
  return taskDetails;
}

function localStorageSave() {
  let arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  if (!arrayOfTasks) {
    arrayOfTasks = [];
  }
  let task = getTaskDetails();
  task.id = arrayOfTasks.length.toString();
  console.log("on save", task);
  arrayOfTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  displayTask();
  removeDetails();
}

function displayTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let items = ``;
  if (!tasks) {
    tasks = [];
  }
  const noteContainer = document.querySelector(".noteDiv");
  for (let i = 0; i < tasks.length; i++) {
    items += `<div class="note""><button type="button" id=${i} class="removeX">X</button><div class="noteText"><p id='taskBox'>${tasks[i].task}</p><p id='timeBox'> ${tasks[i].time}</p><p id='dateBox'>${tasks[i].date}</p></div> </div>`;
  }
  noteContainer.innerHTML = items;
}

function deleteItem(event) {
  event.target.parentElement.remove();
  console.log(event);

  const itemId = event.target.id;
  console.log(itemId);

  const arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));

  let taskToDelete;

  for (let index = 0; index < arrayOfTasks.length; index++) {
    if (arrayOfTasks[index].id === itemId) {
      taskToDelete = index;
    }
  }
  arrayOfTasks.splice(taskToDelete, 1);

  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function removeDetails() {
  const inputs = document.querySelectorAll("input");
  const textArea = document.querySelector("textarea");

  textArea.value = "";
  inputs[0].value = "";
  inputs[1].value = "";
}

function removeX() {
  const removeX = document.querySelectorAll(".removeX");
  for (const x of removeX) {
    x.onclick = deleteItem;
  }
}

function clearLocalStarage() {
  localStorage.clear();
}

function whenSubmitClicked(event) {
  event.preventDefault();
  removeX();
  localStorageSave();
}

function onWindowLoad() {
  document.querySelector("#reset").onclick = clearLocalStarage;
  const form = document.querySelector("form");
  form.onsubmit = whenSubmitClicked;
  displayTask();
  removeX();
}

window.onload = onWindowLoad;
