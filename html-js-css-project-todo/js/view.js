// 视图层
class TodoView {
  constructor() {
    this.app = document.querySelector('.container');
    this.form = document.querySelector('#todo-form');
    this.input = document.querySelector('#todo-input');
    this.todoList = document.querySelector('#todo-list');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.clearCompletedBtn = document.querySelector('#clear-completed');
    this.itemsLeftText = document.querySelector('#items-left');
    this.themeToggle = document.querySelector('#theme-toggle');
    
    this.currentFilter = 'all';
  }

  // 创建Todo项元素
  createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;
    
    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-text">${this._escapeHTML(todo.text)}</span>
      <div class="todo-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    
    return li;
  }
  
  // 渲染Todo列表
  displayTodos(todos) {
    // 先清空列表
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    
    // 根据当前过滤条件过滤
    const filteredTodos = this._filterTodos(todos);
    
    // 使用DocumentFragment提高性能
    const fragment = document.createDocumentFragment();
    
    filteredTodos.forEach(todo => {
      const li = this.createTodoElement(todo);
      fragment.appendChild(li);
    });
    
    this.todoList.appendChild(fragment);
    
    // 更新剩余项计数
    const activeTodos = todos.filter(todo => !todo.completed);
    this.itemsLeftText.textContent = activeTodos.length;
  }
  
  // 切换过滤器状态
  setFilter(filter) {
    this.currentFilter = filter;
    
    this.filterButtons.forEach(button => {
      if (button.dataset.filter === filter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  
  // 切换主题
  toggleTheme() {
    const currentTheme = document.body.dataset.theme;
    document.body.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
  }
  
  // 启用编辑模式
  editMode(id, text) {
    const item = this.todoList.querySelector(`[data-id="${id}"]`);
    const textSpan = item.querySelector('.todo-text');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = text;
    
    textSpan.replaceWith(input);
    input.focus();
    input.select();
  }
  
  // 退出编辑模式
  closeEditMode(id, text) {
    const item = this.todoList.querySelector(`[data-id="${id}"]`);
    const input = item.querySelector('.edit-input');
    
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = text;
    
    input.replaceWith(textSpan);
  }
  
  // 根据当前过滤器过滤Todo
  _filterTodos(todos) {
    switch (this.currentFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
  
  // 转义HTML字符
  _escapeHTML(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}