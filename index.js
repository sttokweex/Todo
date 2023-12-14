window.onload = loadTasks;
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});
const filterSelect = document.getElementById("filterSelect");


filterSelect.addEventListener("change", function () {
  const selectedValue = filterSelect.value;
  filterTodoList(selectedValue);
});
function loadTasks() {
  if (localStorage.getItem("tasks") == null) return;
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));


  tasks.forEach((task) => {
    if(task.removed == false){
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("liCompl");
    }
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
      task.completed ? "checked" : ""
    }>
       <input type="text" value="${task.task}" class="task ${
      task.completed ? "completed" : ""
    }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
       <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    if(task.removed){
      li.innerHTML+='<button onclick="restoreTask(this)">Восстановить</button>';
    }
    list.insertBefore(li, list.children[0]);
  }});
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, completed: false, removed: false },
    ])
  );
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
   <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
   <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  task.value = "";
}
function taskComplete(event) {
  let filter = document.getElementById("filterSelect");
  let selectedValue =filter.value;
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      if(task.completed==true && selectedValue=='completed'){
        event.parentElement.remove();
      }
      else if(task.completed==false && selectedValue=='notCompleted'){
        event.parentElement.remove();
      }
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
  event.parentElement.classList.toggle("liCompl");
}

function removeTask(event) {
  let filter = document.getElementById("filterSelect");
  let selectedValue =filter.value;
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  console.log(event.previousElementSibling.value)
  tasks.forEach((task) => {
    if (task.task === event.previousElementSibling.value) 
      if(task.removed==false){
        if(selectedValue != 'removed'){
          event.parentElement.remove();
        }
        event.parentElement.innerHTML+='<button onclick="restoreTask(this)">Восстановить</button>';
        
        task.removed=!task.removed;  
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return;
      }
      else if(task.removed==true){
        tasks.splice(tasks.indexOf(task), 1);
        event.parentElement.remove();  
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return;}
      }
      
      )
    
  ;

}

var currentTask = null;


function getCurrentTask(event) {
  currentTask = event.value;
}


function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
 
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }

  tasks.forEach((task) => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function restoreTask(event){
  let filter = document.getElementById("filterSelect");
  let selectedValue =filter.value;
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task ===  event.parentNode.children[1].value) {
      task.removed=false;
      if(selectedValue=='removed'){
      event.parentElement.remove();}  
    }
  });
  event.parentNode.removeChild(event);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function filterTodoList(filterValue) {
  const list = document.querySelector("ul");
  list.innerHTML = "";
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  switch (filterValue) {
    case "all":
      tasks.forEach((task) => {
        if(task.removed == false){
        const li = document.createElement("li");
        if (task.completed) {
          li.classList.add("liCompl");
        }
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
          task.completed ? "checked" : ""
        }>
      <input type="text" value="${task.task}" class="task ${
          task.completed ? "completed" : ""
        }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
      if(task.removed){
        li.innerHTML+='<button onclick="restoreTask(this)">Восстановить</button>';
      }
        list.insertBefore(li, list.children[0]);
      }});
      break;
    case "completed":
      tasks.forEach((task) => {
        if(task.removed == false){
        const li = document.createElement("li");
        if (task.completed) {
          li.classList.add("liCompl");
          li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
            task.completed ? "checked" : ""
          }>
          <input type="text" value="${task.task}" class="task ${
            task.completed ? "completed" : ""
          }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
          if(task.removed){
            li.innerHTML+='<button onclick="restoreTask(this)">Восстановить</button>';
          }
          list.insertBefore(li, list.children[0]);
        }
      }});
      break;
    case "notCompleted":
      tasks.forEach((task) => {
        if(task.removed == false){
        const li = document.createElement("li");
        if (!task.completed) {
          li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
            task.completed ? "checked" : ""
          }>
              <input type="text" value="${task.task}" class="task ${
            task.completed ? "completed" : ""
          }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
              <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
              if(task.removed){
                li.innerHTML+='<button onclick="restoreTask(this)">Восстановить</button>';
              }
          list.insertBefore(li, list.children[0]);
        }
      }});
      break;
    case "removed":
      tasks.forEach((task) => {
        const li = document.createElement("li");
        if (task.completed) {
          li.classList.add("liCompl");
        }
        if (task.removed) {
          li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
            task.completed ? "checked" : ""}>
            <input type="text" value="${task.task}" class="task ${
            task.completed ? "completed" : ""
          }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
                  <i class="fa fa-trash" onclick="removeTask(this)"></i>
                  <button onclick="restoreTask(this)">Восстановить</button>`;
          list.insertBefore(li, list.children[0]);
        }
      });
      break;
  }

}
