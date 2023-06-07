import { handleDeleteTodo, handleEditTodo } from '/src/utils/todo.js';

const renderTodoList = (data, todoUlEl) => {
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
  <input id="checkbox-${data.id}" class="checkbox" type="checkbox">
  <label for="checkbox-${data.id}"></label>
  <span class="textValue">${data.title}</span>
  <span class="updatedAt">${convertDate}</span>
  <button class="editbtn" type="button">🖋</button>
  <button class="deletebtn" type="button">✕</button>
  `;

  todoUlEl.prepend(liEl);

  // 수정 버튼 이벤트
  const editBtn = document.querySelector('.editbtn');
  editBtn.addEventListener('click', handleEditTodo);

  // 삭제 버튼 이벤트
  const deleteBtn = document.querySelector('.deletebtn');
  deleteBtn.addEventListener('click', handleDeleteTodo);

  // 체크 버튼 이벤트
  // checkInput.addEventListener('click', (e) =>
  //     editCompleted(e, data.title, e.target.checked)
  //   );

  // if (data.done) {
  //   checkInput.checked = true;
  //   titleEl.classList.add('text-deco');
  // }
};

export default renderTodoList;
