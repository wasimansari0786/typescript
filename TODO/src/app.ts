interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  
  let todos: Todo[] = [];
  
  const todoInput = document.getElementById('todo-input') as HTMLInputElement;
  const todoList = document.getElementById('todo-list') as HTMLUListElement;
  const addButton = document.getElementById('add-todo-btn');
  
  if (addButton) {
    addButton.addEventListener('click', addTodo);
  }
  
  function addTodo(): void {
    const title = todoInput.value.trim();
    if (title === '') return;
  
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    todos.push(newTodo);
  
    todoInput.value = '';
    renderTodos();
  }
  
  function toggleTodo(id: number): void {
    todos.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    renderTodos();
  }
  
  function deleteTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
  
  function renderTodos(): void {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => toggleTodo(todo.id));
  
      const span = document.createElement('span');
      span.textContent = todo.title;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTodo(todo.id));
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  }