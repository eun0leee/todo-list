import {
  getServerTodos,
  addServerTodos,
  editServerTodos,
  deleteServerTodos,
} from '/src/api/todo.js';
import {
  showLoading,
  hideLoading,
  showEl,
  hideEl,
  loadingEl,
  todoUlEl,
  emptyMessageEl,
} from '/src/utils/store';
import renderTodoList from '/src/utils/render.js';

// get
const handleGetTodos = async (filterType) => {
  showLoading(loadingEl);

  try {
    const data = await getServerTodos();

    //서버 todo list 아예 없을 때와 있을 때
    if (data.length == 0) {
      showEl(emptyMessageEl);
    } else {
      // 업데이트순 정렬
      const sortedData = data.sort((a, b) => {
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      });

      // todolist 필터
      const renderData = filterType
        ? sortedData.filter((el) => el.done === (filterType !== 'notDone'))
        : sortedData;

      // 조건에 따라 render
      renderData.forEach((item) => renderTodoList(item));
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
    const todoValue = e.target[0].value;
    // input 에 값 입력 했을 때
    if (todoValue !== '') {
      hideEl(emptyMessageEl);
      const newKeyword = todoValue;
      // input 값 비우기
      e.target[0].value = '';
      // 서버로 전송
      let data = await addServerTodos(newKeyword);
      renderTodoList(data);
    } else {
      alert('please type your Todo ⌨️ !');
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
    // 모두 삭제 됐을 때, 문구표시
    const data = await getServerTodos();
    if (data.length === 0) {
      showEl(emptyMessageEl);
    }
  } catch (error) {
    console.log(error);
  }
};

// edit
const handleEditTodo = (e) => {
  const todoLiEl = e.target.parentElement;
  const todoText = todoLiEl.querySelector('.textValue');

  // 수정 폼 열기
  todoLiEl.innerHTML = `<form action="GET" class="todoedit-form">
    <input class="todoedit-form-value" value="${todoText.innerText}">
    <button class="todoedit-form-okbtn" type="submit" value="ok">ok</button>
    <button class="todoedit-form-cancelbtn" type="button" value="cancel">cancel</button>
    </form>`;

  const editForm = todoLiEl.querySelector('.todoedit-form');
  const editInput = todoLiEl.querySelector('.todoedit-form-value');
  const editCancelBtn = todoLiEl.querySelector('.todoedit-form-cancelbtn');

  // 수정 완료 이벤트
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoText.innerText !== editInput.value) {
      completedEdit(e, editInput.value);
    } else {
      alert('Nothing has changed! 🧐');
    }
  });

  // 수정 취소 이벤트
  editCancelBtn.addEventListener('click', () => cancelEdit());

  const completedEdit = async (e, text, done) => {
    const todoLiEl = e.target.parentElement;
    const data = await editServerTodos(todoLiEl.id, text, done);
    todoLiEl.remove();
    renderTodoList(data);
  };

  const cancelEdit = async () => {
    todoUlEl.innerHTML = '';
    handleGetTodos();
  };
};

// check
const handleCheckTodo = async (e) => {
  const todoLiEl = e.target.parentElement;
  const data = await editServerTodos(
    todoLiEl.id,
    todoLiEl.querySelector('.textValue').innerText,
    e.target.checked
  );
  todoLiEl.remove();
  renderTodoList(data);
};

// filter
const handleFilter = (e) => {
  const targetClassName = e.target.className;
  todoUlEl.innerHTML = '';
  switch (targetClassName) {
    case 'onlytodo-btn':
      handleGetTodos('notDone');
      break;
    case 'onlydone-btn':
      handleGetTodos('done');
      break;
    case 'all-btn':
      handleGetTodos();
      break;
  }
};

export {
  handleGetTodos,
  handleAddTodos,
  handleDeleteTodo,
  handleEditTodo,
  handleCheckTodo,
  handleFilter,
};
