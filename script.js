const addTodoBtn = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todosList = document.getElementById('all-todos');
const deleteSelected = document.getElementById('delete-selected');
const deletedAll = document.getElementById('delete-all');
const completedCount = document.getElementById('c-count');
const totalTasks = document.getElementById('r-count');
const allFilter = document.getElementById('all');
const pendingFilter = document.getElementById('rem');
const completedFilter = document.getElementById('com');

addTodoBtn.addEventListener('click', addNewTodo);
todoInput.addEventListener('keyup', addNewTodoKey);
deleteSelected.addEventListener('click', deleteSelection);
deletedAll.addEventListener('click', deleteAllSelection);
allFilter.addEventListener('click', showAll);
pendingFilter.addEventListener('click', showPeding);
completedFilter.addEventListener('click', showCompleted);

function addNewTodoKey(e) {
    if(e.code==="Enter") {
        addNewTodo();
    }
}

function addNewTodo() {
    if(todoInput.value === "") {
        return;
    }
    const inputValue = todoInput.value;
    const todoObj = {
        task: inputValue,
        id: Date.now().toString(),
        complete: false,
    }
    const liEl = document.createElement('li');
    liEl.id = todoObj.id;
    liEl.classList.add('todo-item');
    liEl.setAttribute('completed', todoObj.complete);
    const todoHtml= `
        <p id="task"> ${todoObj.task} </p>
        <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error">
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
        </div>
    `;
    liEl.innerHTML += todoHtml;

    const taskTitle = liEl.querySelector('#task');
    const completedBtn = liEl.querySelector('.complete');
    const deletedBtn = liEl.querySelector('.delete');

    completedBtn.addEventListener('click', function() {
        if(todoObj.complete) {
            undoTask(taskTitle, todoObj);
            liEl.setAttribute('completed', false);
        } else {
            completeTask(taskTitle, todoObj);
            liEl.setAttribute('completed', true);
        }
    });

    deletedBtn.addEventListener('click', function() {
        liEl.remove();
    });

    todosList.append(liEl);
    todoInput.value = "";
    totalTasks.innerText = parseInt(totalTasks.innerText) + 1;
}

function completeTask(element, object) {
    element.classList.add('strike');
    object.complete = true;
    completedCount.innerText = parseInt(completedCount.innerText) + 1;
}

function undoTask(element, object) {
    element.classList.remove('strike');
    object.complete = false;
    if(parseInt(completedCount.innerText) > 0) {
        completedCount.innerText = parseInt(completedCount.innerText) - 1;
    }
}

function deleteSelection() {
    const strikedListed = document.querySelectorAll('.todo-item .strike');
    
    strikedListed.forEach(el => {
        if(el.parentElement.getAttribute('completed')) {
            if(parseInt(completedCount.innerText) > 0) {
                completedCount.innerText = parseInt(completedCount.innerText) - 1;
            }
        }
        el.parentElement.remove();
    })
    
    const todosListed = document.querySelectorAll('.todo-item');
    totalTasks.innerText = todosListed.length;
}

function deleteAllSelection() {
    const todosListed = document.querySelectorAll('.todo-item');

    todosListed.forEach(el => {
        if(el.getAttribute('completed')) {
            if(parseInt(completedCount.innerText) > 0) {
                completedCount.innerText = parseInt(completedCount.innerText) - 1;
            }
        }
        el.remove();
    })

    totalTasks.innerText = "0";
}

function showAll() {
    const todosListed = document.querySelectorAll('.todo-item');

    todosListed.forEach(el => {
        el.classList.remove('hidden');
    })
}

function showPeding() {
    const todosListed = document.querySelectorAll('.todo-item');

    todosListed.forEach(el => {
        const strikedEl = el.querySelector('.strike');
        if(strikedEl) {
            el.classList.add('hidden');
        } else {
            el.classList.remove('hidden');
        }
    })
}

function showCompleted() {
    const todosListed = document.querySelectorAll('.todo-item');

    todosListed.forEach(el => {
        const strikedEl = el.querySelector('.strike');
        if(strikedEl) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    })
}