let tasks = []
const taskInput = document.getElementById('toDoPut')
const addBtn = document.getElementById('addBtn')

const totalTask = document.getElementById('totalTask')
const completedTask = document.getElementById('completedTask')
const pendingTask = document.getElementById('pendingTask')

const toDoList = document.getElementById('toDoList')

function addTask(){
    const description = taskInput.value

if(description !== ''){
    const newTask = {
        id: Date.now(),
        contenido: description,
        completed: false,
    }
    tasks.push(newTask);
    taskInput.value = '';
    renderTask();
    }
}

addBtn.addEventListener('click', addTask);

function renderTask(){
    toDoList.innerHTML = tasks.map(task => `
        <li>
            <span>${task.id}</span>
            <span>${task.contenido}</span>
            <input type="checkbox" ${task.completed ? 'checked' : '' } onchange="toogle(${task.id})"/>
            <button id="deleteBtn" onclick="deleteTask(${task.id})">Eliminar</button>
        </li>
    `).join('');

    updateCounter();
}
function deleteTask(taskId){
    tasks = tasks.filter(task => task.id !== taskId);
    renderTask();
}

function updateCounter(){
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTask.innerHTML = total;
    completedTask.innerHTML = completed;
    pendingTask.innerHTML = pending;
}

function toogle(taskId){
    const task = tasks.find(task => task.id === taskId)
    if(task){
        task.completed = !task.completed
        renderTask()
    }
}
