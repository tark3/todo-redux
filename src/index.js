import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { todosReducer } from './redux/todosReducer';
import { update, add, remove, search, load } from './redux/actions';
import { MOCK_TODO} from './mock';
import './styles.css';

const changeDoneStatusButtons = document.getElementsByClassName('done');
const changeDeleteButtons = document.getElementsByClassName('delete');
const todoListTable = document.getElementById('todo-list');
const doneListTable = document.getElementById('done-list');
const addBtn = document.getElementById('add-button');
const searchBtn = document.getElementById('search-button');
const clearSearchBtn = document.getElementById('clear-button');
const loadBtn = document.getElementById('load-button');
const addInput = document.getElementById('add-input');
const searchInput = document.getElementById('search-input');
const alert = document.getElementById('alert');

const store = createStore(
  todosReducer,
  MOCK_TODO,
  composeWithDevTools(
    applyMiddleware(logger)
  )
);

const renderTodoTable = state => {
  //console.log('render!!!', state);
  let tableRows = '';
  let tableDoneRows = '';
  for (const [index, todo] of state.todos.entries()) {
    if (todo.done === 0) {
      if (state.searchIds.includes(todo.id)) {
        tableRows = tableRows + '<tr>' +
          '<td class="table-cell">' + todo.name + '</td>' +
          '<td class="table-cell"><button ' + (todo.done ? 'disabled' : '') +
          ' class="btn btn-success done" data-todo-id="' + todo.id + '">Done</button></td>' +
          '<td class="table-cell"><button class="btn btn-danger delete" data-todo-id="' +
          todo.id + '">Delete</button></td>' +
          '</tr>';
      }
    } else {
      tableDoneRows = tableDoneRows + '<tr>' +
          '<td class="table-cell">' + todo.name + '</td>' +
          '<td class="table-cell"></td>' +
          '<td class="table-cell"><button class="btn btn-danger delete" data-todo-id="' +
          todo.id + '">Delete</button></td>' +
          '</tr>';
    }
    addInput.value = '';
  }

  todoListTable.innerHTML = '<table><tbody>' + tableRows + '</tbody</table>';
  doneListTable.innerHTML = '<table><tbody>' + tableDoneRows + '</tbody</table>';

  Array.from(changeDoneStatusButtons).forEach(elem => {
    elem.addEventListener('click', function() {
      const todoId = this.dataset.todoId;
      store.dispatch(update({ todoId, done: 1 }));
    });
  });

  Array.from(changeDeleteButtons).forEach(elem => {
    elem.addEventListener('click', function() {
      const todoId = this.dataset.todoId;
      store.dispatch(remove({ todoId }));
    });
  });
};

addBtn.addEventListener('click', () => {
  const name = addInput.value;
  alert.style.display = (name === '') ? 'block' : 'none';
  if (name) store.dispatch(add({ name }));
});

searchBtn.addEventListener('click', () => {
  const searchString = searchInput.value;
  store.dispatch(search({ searchString }));
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  const searchString = searchInput.value;
  store.dispatch(search({ searchString }));
});

loadBtn.addEventListener('click', () => {
  searchInput.value = '';
  store.dispatch(load());
});

store.subscribe(() => {
  const state = store.getState();
  renderTodoTable(state);
 // console.log(state);
});

// set initial todos list
store.dispatch(load());
