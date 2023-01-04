//////////////////// MODULES ///////////////////////
//todo
import { getServerTodos, addServerTodos, editServerTodos, deleteServerTodos } from './APIs.js';

//etc
import './clock.js';
import './location-and-weather.js';
import './username.js';

//////////////////// LOADING ///////////////////////
const loading = document.querySelector('.loading');
function showSpinner() {
  loading.classList.add('active');
}
function hideSpinner() {
  loading.classList.remove('active');
}

//////////////////// RENDER ///////////////////////
const formEl = document.querySelector('.todo__form');
const inputEl = formEl.querySelector('.input');
const ulEl = document.querySelector('.todo__ul');

function renderTodoItem(todosServerData) {
  const liEl = document.createElement('li');
  liEl.id = todosServerData.id;
  liEl.className = 'li';

  const titleEl = document.createElement('span');
  titleEl.className = 'todotext';
  titleEl.innerText = todosServerData.title;

  const editBtn = document.createElement('button');
  editBtn.className = 'editbtn';
  editBtn.innerText = '🖋';
  editBtn.title = 'edit';
  editBtn.addEventListener('click', editHandler);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'deletebtn';
  deleteBtn.innerText = '✕';
  deleteBtn.title = 'delete';
  deleteBtn.addEventListener('click', deleteHandler);

  //updated date
  const updatedAt = document.createElement('span');
  updatedAt.className = 'updatedAt';
  const date = new Date(`${todosServerData.updatedAt}`);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  updatedAt.innerText = `${year}${month}${day} ${hours}:${minutes}`;

  //check done
  const checkInput = document.createElement('input');
  checkInput.id = `checkbox-${liEl.id}`;
  checkInput.className = 'checkbox';
  checkInput.type = 'checkbox';
  const checkLabel = document.createElement('Label');
  checkLabel.htmlFor = `checkbox-${liEl.id}`;

  if (todosServerData.done) {
    checkInput.checked = true;
    titleEl.classList.add('text__deco');
  }

  checkInput.addEventListener('click', (e) => editCompleted(e, todosServerData.title, e.target.checked));

  liEl.append(checkInput, checkLabel, titleEl, updatedAt, editBtn, deleteBtn);
  ulEl.prepend(liEl);
}

//get
let getData = await getServerTodos();
showSpinner();
setTimeout(async () => {
  getTodos(getData);
  hideSpinner();
}, 1000);

async function getTodos(getData) {
  showSpinner();
  try {
    //업데이트순 정렬
    let sortedData = getData.sort(function (a, b) {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
    //서버에 값 존재 여부에 따른 출력 변경
    //값 없으면 등록하세요, 값 있으면 렌더
    if (getData.length == 0) {
      const zeroLength = document.querySelector('.zerolength');
      zeroLength.style.display = 'block';
      ulEl.prepend(zeroLength);
    } else if (getData.length !== 0) {
      sortedData.forEach((item) => renderTodoItem(item));
    }
    hideSpinner();
  } catch (error) {
    console.log(error);
  }
}

//add
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (inputEl.value) {
    const newTitle = inputEl.value;
    const newOrder = Date.now();
    // let newOrder = ulEl.querySelectorAll(".li").length + 1;
    inputEl.value = '';
    try {
      let getData = await addServerTodos(newTitle);
      renderTodoItem(getData);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('please type your Todo');
  }
});

//delete
async function deleteHandler(e) {
  try {
    const li = e.target.parentElement;
    li.remove();
    await deleteServerTodos(li.id);
  } catch (error) {
    console.log(error);
  }
}

//edit
function editHandler(e) {
  //기존 요소 불러오기
  const li = e.target.parentElement;
  const todoText = li.querySelector('.todotext');

  //수정 폼 열기
  li.innerHTML = `<form action="GET" class="todotext_edit">
  <input class="todotext_edit_text" value="${todoText.innerText}">
  <input class="todotext_edit_ok" type="button" value="ok">
  <button class="todotext_edit_cancel" type="button" value="cancel">cancel</button>
  </form>`;

  //수정중 submit
  const editInput = li.querySelector('.todotext_edit_text');
  editInput.parentElement.addEventListener('submit', (e) => {
    e.preventDefault();
    editCompleted(e, editInput.value);
  });

  //수정중 cancel
  const editcancelBtn = li.querySelector('.todotext_edit_cancel');
  editcancelBtn.addEventListener('click', (e) => editCompleted(e, todoText.innerText));
}

async function editCompleted(e, text, done) {
  const li = e.target.closest('li');
  const getEditData = await editServerTodos(li.id, text, done);
  console.log(getEditData);
  li.remove();
  renderTodoItem(getEditData);
}

//filter
const onlyTodo = document.querySelector('.onlytodo-btn');
const onlyDone = document.querySelector('.onlydone-btn');
const allBtn = document.querySelector('.all-btn');

onlyTodo.addEventListener('click', async () => {
  ulEl.innerHTML = '';
  let getData = await getServerTodos();
  let filterTodoData = getData.filter((el) => el.done == false);
  getTodos(filterTodoData);
});

onlyDone.addEventListener('click', async () => {
  ulEl.innerHTML = '';
  let getData = await getServerTodos();
  let filterDoneData = getData.filter((el) => el.done == true);
  getTodos(filterDoneData);
});

allBtn.addEventListener('click', async () => {
  ulEl.innerHTML = '';
  let getData = await getServerTodos();
  getTodos(getData);
});
