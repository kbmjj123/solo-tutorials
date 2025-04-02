// 控制器
class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // 绑定事件处理函数上下文
    this._bindEvents();
    
    // 初始化
    this.init();
  }
  
  init() {
    // 加载主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
    
    // 初始渲染
    this.view.displayTodos(this.model.getTodos());
  }
  
  _bindEvents() {
    // 表单提交添加新待办
    this.view.form.addEventListener('submit', this.handleAddTodo.bind(this));
    
    // 使用事件委托处理列表项事件
    this.view.todoList.addEventListener('click', this.handleTodoClick.bind(this));
    
    // 过滤按钮点击
    this.view.filterButtons.forEach(button => {
      button.addEventListener('click', this.handleFilter.bind(this));
    });
    
    // 清除已完成
    this.view.clearCompletedBtn.addEventListener('click', this.handleClearCompleted.bind(this));
    
    // 主题切换
    this.view.themeToggle.addEventListener('click', this.handleThemeToggle.bind(this));
    
    // 编辑输入框事件
    this.view.todoList.addEventListener('keyup', this.handleEditKeyup.bind(this));
    this.view.todoList.addEventListener('focusout', this.handleEditFocusOut.bind(this));
  }
  
  handleAddTodo(event) {
    event.preventDefault();
    
    const text = this.view.input.value.trim();
    if (text) {
      this.model.addTodo(text);
      this.view.input.value = '';
      this.view.displayTodos(this.model.getTodos());
    }
  }
  
  handleTodoClick(event) {
    const item = event.target.closest('.todo-item');
    if (!item) return;
    
    const id = parseInt(item.dataset.id);
    
    // 复选框：切换完成状态
    if (event.target.classList.contains('todo-checkbox')) {
      this.model.toggleTodo(id);
      this.view.displayTodos(this.model.getTodos());
    }
    
    // 删除按钮
    if (event.target.classList.contains('delete-btn')) {
      this.model.deleteTodo(id);
      this.view.displayTodos(this.model.getTodos());
    }
    
    // 编辑按钮
    if (event.target.classList.contains('edit-btn')) {
      const text = item.querySelector('.todo-text').textContent;
      this.view.editMode(id, text);
    }
  }
  
  handleEditKeyup(event) {
    const editInput = event.target;
    if (!editInput.classList.contains('edit-input')) return;
    
    const item = event.target.closest('.todo-item');
    const id = parseInt(item.dataset.id);
    
    // Enter: 保存编辑
    if (event.key === 'Enter') {
      const newText = editInput.value.trim();
      if (newText) {
        this.model.editTodo(id, newText);
        this.view.closeEditMode(id, newText);
      }
    }
    
    // Escape: 取消编辑
    if (event.key === 'Escape') {
      const originalText = this.model.getTodos().find(todo => todo.id === id).text;
      this.view.closeEditMode(id, originalText);
    }
  }
  
  handleEditFocusOut(event) {
    const editInput = event.target;
    if (!editInput.classList.contains('edit-input')) return;
    
    const item = event.target.closest('.todo-item');
    const id = parseInt(item.dataset.id);
    
    const newText = editInput.value.trim();
    if (newText) {
      this.model.editTodo(id, newText);
    }
    
    const currentText = this.model.getTodos().find(todo => todo.id === id).text;
    this.view.closeEditMode(id, currentText);
  }
  
  handleFilter(event) {
    const filter = event.target.dataset.filter;
    this.view.setFilter(filter);
    this.view.displayTodos(this.model.getTodos());
  }
  
  handleClearCompleted() {
    this.model.clearCompleted();
    this.view.displayTodos(this.model.getTodos());
  }
  
  handleThemeToggle() {
    this.view.toggleTheme();
  }
}