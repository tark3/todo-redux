import { LOAD, UPDATE, ADD, REMOVE, SEARCH } from './types';
import { createTodo } from '../mock';

let todosInitialState;

const cloneInitialTodosState = state => {
  const cloned = JSON.parse(JSON.stringify(state));
  todosInitialState = {
    todos: cloned,
    searchIds: cloned.map(element => element.id),
  };
};

const updateSearchIds = state => {
  state.searchIds = state.todos.map(element => element.id);
};

const cloneState = state => JSON.parse(JSON.stringify(state));

export const todosReducer = (state = todosInitialState, action) => {
  const { type, payload } = action;
  state = cloneState(state);
  switch (type) {
    case LOAD:
      state = cloneState(todosInitialState);
      break;
    case UPDATE: {
      const { todoId, done } = payload;
      state.todos.map(element => {
        if (parseInt(todoId) === element.id) {
          element.done = done;
        }
        return element;
      });
      break;
    }
    case ADD: {
      const { name } = payload;
      state.todos.push(createTodo(name));
      updateSearchIds(state);
      break;
    }
    case SEARCH: {
      const { searchString } = payload;
      state.searchIds = state.todos
        .filter(element => element.name.toLowerCase().includes(searchString.toLowerCase()))
        .map(element => element.id);
      break;
    }
    case REMOVE: {
      const { todoId } = payload;
      for (const [index, todo] of state.todos.entries()) {
        if (todo.id === parseInt(todoId)) {
          state.todos.splice(index, 1);
        }
      }
      break;
    }
    default:
      cloneInitialTodosState(state);
  }
  return state;
};
