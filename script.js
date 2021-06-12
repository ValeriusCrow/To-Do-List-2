let addButton = document.querySelector('#add-task-button');
let todoList = document.querySelector('#task-list');
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// Retrieving <li>'s and <span> values from JSON
taskList.forEach(element => {
    console.log(element);
    let newTask = document.createElement('li');
    todoList.appendChild(newTask);
    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
        newTask.appendChild(newCheckbox);
    let newSpan = document.createElement('span');
    newSpan.classList.add('task');
    newSpan.textContent = element['text'];
    newTask.appendChild(newSpan);
    let newButton = document.createElement('button');
    newButton.classList.add('delete-btn');
    newTask.appendChild(newButton);
    newButton.innerHTML = '<i class="fas fa-trash"></i>';
    if (element.completed === true) {
        newCheckbox.checked = true;
        newTask.querySelector('span').classList.toggle('completed');
    }
    todoList.addEventListener('click', deleteCheck);
});

todoList.addEventListener('click', deleteCheck);

// Adding new item to the list
addButton.addEventListener('click', () => {
    if (document.querySelector('#input-task').value) {
        let newTask = document.createElement('li');
        todoList.appendChild(newTask);
        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newTask.appendChild(newCheckbox);
        let newSpan = document.createElement('span');
        newSpan.classList.add('task');
        newSpan.textContent = document.querySelector('#input-task').value;
        newTask.appendChild(newSpan);
        let newButton = document.createElement('button');
        newButton.classList.add('delete-btn');
        newTask.appendChild(newButton);
        newButton.innerHTML = '<i class="fas fa-trash"></i>';
        document.querySelector('#input-task').value = '';
        // Attaching listeners to new element
        todoList.addEventListener('click', deleteCheck);
        // Pushing new item to local storage
        const todo = {
            text: newSpan.textContent,
            completed: false
        }
        taskList.push(todo);
        console.log(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        console.log(taskList);
    }
});

// Changing text-decoration of item or deleting it
function deleteCheck(e) {
    const item = e.target;
    const todoIndexText = item.parentElement.innerText;
    const todoIndex = taskList.findIndex(elem => elem['text'] === todoIndexText);
    if (item.classList[0] === 'delete-btn') {
        item.parentElement.remove();
        taskList.splice(todoIndex, 1);
    } else if (item.type === 'checkbox') {
        item.parentElement.querySelector('span').classList.toggle('completed');
        taskList[todoIndex].completed = taskList[todoIndex].completed === false;
    }
        localStorage.setItem("tasks", JSON.stringify(taskList));
}



