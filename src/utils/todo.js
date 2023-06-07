import {
  getServerTodos,
  addServerTodos,
  editServerTodos,
  deleteServerTodos,
} from '/src/api/todo.js';

import { showLoading, hideLoading } from '/src/utils/store';

import renderTodoList from '/src/utils/render.js';

// get
const handleGetTodos = async (loadingEl, todoUlEl, emptyMessageEl) => {
  const data = await getServerTodos();
  showLoading(loadingEl);
  try {
    //업데이트순 정렬
    let sortedData = data.sort((a, b) => {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
    //서버 todo list 아예 없을 떄와 있을 때
    if (data.length == 0) {
      emptyMessageEl.style.display = 'block';
      todoUlEl.prepend(emptyMessageEl);
    } else if (data.length !== 0) {
      sortedData.forEach((item) => renderTodoList(item, todoUlEl));
    }
    hideLoading(loadingEl);
  } catch (error) {
    console.log(error);
  }
};

// add
const handleAddTodos = async (e) => {
  e.preventDefault();
  try {
    const todoUlEl = e.target.nextSibling.nextSibling;
    let todoValue = e.target[0].value;
    // input 에 값 입력 했을 때
    if (todoValue !== '') {
      const newKeyword = todoValue;
      // input 값 비우기
      e.target[0].value = '';
      // 서버로 전송
      let data = await addServerTodos(newKeyword);
      renderTodoList(data, todoUlEl);
    } else {
      console.log('please type your Todo');
    }
  } catch (error) {
    console.log(error);
  }
};

// delete
const handleDeleteTodo = async (e) => {
  try {
    const todoLiEl = e.target.parentElement;
    // 화면상 todo list 삭제
    todoLiEl.remove();
    // 서버상 todo list 삭제
    await deleteServerTodos(todoLiEl.id);
  } catch (error) {
    console.log(error);
  }
};

// edit
const handleEditTodo = (e) => {
  const todoUlEl = e.target.closest('ul');
  const todoLiEl = e.target.parentElement;
  const todoText = todoLiEl.querySelector('.textValue');

  // 수정 폼 열기
  todoLiEl.innerHTML = `<form action="GET" class="todoedit-form">
    <input class="todoedit-form-value" value="${todoText.innerText}">
    <button class="todoedit-form-okbtn" type="submit" value="ok">ok</button>
    <button class="todoedit-form-cancelbtn" type="button" value="cancel">cancel</button>
    </form>`;

  // 수정중 submit
  const editForm = todoLiEl.querySelector('.todoedit-form');
  const editInput = todoLiEl.querySelector('.todoedit-form-value');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    completedEdit(e, editInput.value);
  });

  // 수정 완료
  const completedEdit = async (e, text, done) => {
    const todoLiEl = e.target.parentElement;
    const data = await editServerTodos(todoLiEl.id, text, done);
    todoLiEl.remove();
    renderTodoList(data, todoUlEl);
  };

  // 수정중 cancel
  const editCancelBtn = todoLiEl.querySelector('.todoedit-form-cancelbtn');
  editCancelBtn.addEventListener('click', () => console.log('폼닫기 구현필요'));
};

export { handleGetTodos, handleAddTodos, handleDeleteTodo, handleEditTodo };
