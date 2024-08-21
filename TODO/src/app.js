var todos = [];
var todoInput = document.getElementById('todo-input');
var todoList = document.getElementById('todo-list');
var addButton = document.getElementById('add-todo-btn');
if (addButton) {
    addButton.addEventListener('click', addTodo);
}
function addTodo() {
    var title = todoInput.value.trim();
    if (title === '')
        return;
    var newTodo = { id: Date.now(), title: title, completed: false };
    todos.push(newTodo);
    todoInput.value = '';
    renderTodos();
}
function toggleTodo(id) {
    todos.forEach(function (todo) {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
    });
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
}
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(function (todo) {
        var li = document.createElement('li');
        li.className = "todo-item ".concat(todo.completed ? 'completed' : '');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function () { return toggleTodo(todo.id); });
        var span = document.createElement('span');
        span.textContent = todo.title;
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () { return deleteTodo(todo.id); });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}