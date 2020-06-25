const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// load all event listeners
function loadEventListeners(){
  //1. add task event
  form.addEventListener('submit', addTask);
  //2. remove task event
  taskList.addEventListener('click', removeTask);
  //3. clear task event
  clearBtn.addEventListener('click', clearTasks);
  //4. filter task event
  filter.addEventListener('keyup', filterTasks);
  //5. DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

}
// 0. get task from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
  })
}


// 1.add task
function addTask(e){
  if(taskInput.value === ''){
    alert('add a task');
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
  storeTaskInLocalStorage(taskInput.value);

  e.preventDefault();

}

// 2.remove task
function removeTask(e){
  if(e.target.classList.contains('fa')){
    e.target.parentElement.parentElement.remove();

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
//remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }

    localStorage.setItem('tasks' ,JSON.stringify(tasks));
  })
}

// 3. clear task
function clearTasks(){
    taskList.innerHTML = '';
}

//4. filter task
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

//5. store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}