const showLoading = (element: Element | null) => {
  element?.classList.add('active');
};

const hideLoading = (element: Element | null) => {
  element?.classList.remove('active');
};

const showEl = (element: Element | null) => {
  element?.classList.add('show');
  element?.classList.remove('hidden');
};

const hideEl = (element: Element | null) => {
  element?.classList.add('hidden');
  element?.classList.remove('show');
};

const loadingEl = document.querySelector('.loading');
const todoFormEl = document.querySelector('.todo-form');
const todoUlEl = document.querySelector('.todo-list');
const emptyMessageEl = document.querySelector('.empty-todo');
const filterBtn = document.querySelector('.widgets-btns');
const titlebarBtn = document.querySelector('.titlebar-btn');
const welcomeEl = document.querySelector('.welcome');

export {
  showLoading,
  hideLoading,
  showEl,
  hideEl,
  loadingEl,
  todoFormEl,
  todoUlEl,
  emptyMessageEl,
  filterBtn,
  titlebarBtn,
  welcomeEl,
};
