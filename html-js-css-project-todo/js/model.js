// 数据模型
class TodoModel {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }
  
  // 获取所有待办
  getTodos() {
    return this.todos;
  }
  
  // 添加待办
  addTodo(text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.todos.push(todo);
    this._commit();
    return todo;
  }
  
  // 删除待办
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this._commit();
  }
  
  // 切换待办状态
  toggleTodo(id) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    this._commit();
  }
  
  // 编辑待办
  editTodo(id, text) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? {...todo, text} : todo
    );
    this._commit();
  }
  
  // 清除已完成
  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this._commit();
  }
  
  // 本地存储
  _commit() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}