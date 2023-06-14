import {
  handleDeleteTodo,
  handleEditTodo,
  handleCheckTodo,
} from '/src/utils/handleTodo.js';

import { todoUlEl } from '/src/utils/store';

const renderTodoList = (data) => {
  const liEl = document.createElement('li');
  liEl.id = data.id;

  const date = new Date(`${data.updatedAt}`);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const convertDate = `${year}${month}${day} ${hours}:${minutes}`;

  liEl.innerHTML = `
  <input id="checkbox-${data.id}" class="checkInput" type="checkbox">
  <label for="checkbox-${data.id}"></label>
  <span class="textValue">${data.title}</span>
  <span class="updatedAt">${convertDate}</span>
  <button class="editbtn" type="button">🖋</button>
  <button class="deletebtn" type="button">✕</button>
  `;

  todoUlEl.prepend(liEl);

  // init
  const checkBtn = document.querySelector('.checkInput');
  const todoText = document.querySelector('.textValue');
  const editBtn = document.querySelector('.editbtn');
  const deleteBtn = document.querySelector('.deletebtn');

  // 체크여부에 따른 텍스트 스타일 설정
  if (data.done) {
    checkBtn.checked = true;
    todoText.classList.add('text-deco');
  }

  // 체크 버튼 이벤트
  checkBtn.addEventListener('click', handleCheckTodo);

  // 수정 버튼 이벤트
  editBtn.addEventListener('click', handleEditTodo);

  // 삭제 버튼 이벤트
  deleteBtn.addEventListener('click', handleDeleteTodo);
};

export default renderTodoList;
