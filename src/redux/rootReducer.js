import { combineReducers } from 'redux';
import { INIT, UPDATE, ADD, REMOVE, SEARCH } from './types';

let todosInitialState = [];

const cloneInitialTodosState = () => todosInitialState.map(todo => ({ ...todo }));

function todosReducer(state, action) {
  const params = action.params;
  if (action.type === INIT) {
    const { todos } = params;
    todosInitialState = todos;
    state = cloneInitialTodosState();
  } else if (action.type === UPDATE) {
    const { index, done } = params;
    state = state.map((element, ind) => {
      if (parseInt(index) === ind) {
        element.done = done;
      }
      return element;
    }
    );
  } else if (action.type === ADD) {
    const { name, done = 0, hidden = 0 } = params;
    state.push({ name, done, hidden });
  } else if (action.type === SEARCH) {
    const { searchString } = params;
    state = state.map(element => {
      element.hidden = element.name.toLowerCase().includes(searchString.toLowerCase()) ? 0 : 1;
      return element;
    }
    );
  } else if (action.type === REMOVE) {
    const { index } = params;
    state.splice(index, 1);
  }

  return state || cloneInitialTodosState();
}

export const rootReducer = combineReducers({
  todos: todosReducer,
});
