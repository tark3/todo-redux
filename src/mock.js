export const createTodo = name => ({
  id: Math.floor(Math.random() * 1000000000),
  name,
  done: 0,
  hidden: 0,
});

export const MOCK_TODO = [
  createTodo('Todo name one'),
  createTodo('Todo name two'),
  createTodo('Todo name three'),
  createTodo('Todo name four'),
  createTodo('Todo name five'),
];
