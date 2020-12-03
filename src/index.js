import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { rootReducer } from './redux/rootReducer';
import { init, update, add, remove, search } from './redux/actions';
import './styles.css';

const changeDoneStatusButtons = document.getElementsByClassName('done');
const changeDeleteButtons = document.getElementsByClassName('delete');
const todoListTable = document.getElementById('todo-list');
const doneListTable = document.getElementById('done-list');
const addBtn = document.getElementById('add');
const searchBtn = document.getElementById('search');
const clearSearchBtn = document.getElementById('clear');
const initBtn = document.getElementById('init');
const addInput = document.getElementById('add-input');
const searchInput = document.getElementById('search-input');
const alert = document.getElementById('alert');

const todos = [{ name: 'Todo name one', done: 0, hidden: 0 },
  { name: 'Todo name two', done: 0, hidden: 0 },
  { name: 'Todo name three', done: 0, hidden: 0 },
  { name: 'Todo name four', done: 0, hidden: 0 },
  { name: 'Todo name five', done: 0, hidden: 0 },
];


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

const renderTodoTable = todos => {
  let tableRows = '';
  let tableDoneRows = '';
  for (const [index, todo] of todos.entries()) {
    if (todo.done === 0) {
      if (todo.hidden !== 1) {
        tableRows = tableRows + '<tr>' +
          '<td style="padding-right: 20px;">' + todo.name + '</td>' +
          '<td style="padding-right: 20px;"><button ' + (todo.done ? 'disabled' : '') +
          ' class="btn btn-success done" data-index="' + index + '">Done</button></td>' +
          '<td style="padding-right: 20px;"><button class="btn btn-danger delete" data-index="' +
          index + '">Delete</button></td>' +
          '</tr>';
      }
    } else {
      tableDoneRows = tableDoneRows + '<tr>' +
          '<td style="padding-right: 20px;">' + todo.name + '</td>' +
          '<td style="padding-right: 20px;"></td>' +
          '<td style="padding-right: 20px;"><button class="btn btn-danger delete" data-index="' +
          index + '">Delete</button></td>' +
          '</tr>';
    }
    addInput.value = '';
  }

  todoListTable.innerHTML = '<table><tbody>' + tableRows + '</tbody</table>';
  doneListTable.innerHTML = '<table><tbody>' + tableDoneRows + '</tbody</table>';

  Array.from(changeDoneStatusButtons).forEach(elem => {
    elem.addEventListener('click', function() {
      const index = this.dataset.index;
      store.dispatch(update({ index, done: 1 }));
    });
  });

  Array.from(changeDeleteButtons).forEach(elem => {
    elem.addEventListener('click', function() {
      const index = this.dataset.index;
      store.dispatch(remove({ index }));
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

initBtn.addEventListener('click', () => {
  searchInput.value = '';
  store.dispatch(init({ todos }));
});

store.subscribe(() => {
  const state = store.getState();
  renderTodoTable(state.todos);
});

// set initial todos list
store.dispatch(init({ 'todos': [] }));
