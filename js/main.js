const apiKey = "FcKdtJs202209";
const apiUrl = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";
const USERNAME = "KDT3_LeeEunyoung";
const HEADERS = {
  "content-type": "application/json",
  apikey: apiKey,
  username: USERNAME,
};

//////////////////// API ///////////////////////

//LOAD
export async function getServerTodos() {
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: HEADERS,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

//INPUT
export async function addServerTodos(title) {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        title: title,
      }),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

//EDIT
export async function editServerTodos(id, text, done = false, num = 0) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        title: text,
        done: done,
        order: num,
      }),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

//DELETE
export async function deleteServerTodos(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

//////////////////// RENDER ///////////////////////

// addTodos("hello-2");

// editTodos("yS7C2yPs11oFwM8KdChd", "hi-edit-03", true, 0);

// deleteTodos("ayRiutxTJjIRVxb33WFF");

const formEl = document.querySelector(".todo__form");
const inputEl = document.querySelector(".todo__input");
const ulEl = document.querySelector(".todo__list");

function printTodos(todosData) {
  const li = document.createElement("li");
  li.id = todosData.id;

  const spanEl = document.createElement("span");
  spanEl.className = "todotext";
  spanEl.innerText = todosData.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deletebtn";
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTodos);

  const editBtn = document.createElement("button");
  editBtn.className = "editbtn";
  editBtn.innerText = "✏️";
  editBtn.addEventListener("click", editTodos);

  li.append(spanEl, editBtn, deleteBtn);

  ulEl.append(li);
}

/////////////////  이벤트리스너 두번째 인자 ///////////////////
//조회
//간단히 할 다른 방법 없는지
let getData = await getServerTodos();
if (getData.length !== 0) {
  getData.forEach((item) => printTodos(item));
} else {
  console.log("Type your first Todo");
}

//입력
formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  let newTodo = inputEl.value;
  inputEl.value = "";
  let getData = await addServerTodos(newTodo);
  printTodos(getData);
});

//삭제
function deleteTodos(e) {
  const li = e.target.parentElement;
  li.remove();
  deleteServerTodos(li.id);
}

//수정
function editTodos(e) {
  //기존 요소 불러오기
  const li = e.target.parentElement;
  const todoText = li.querySelector(".todotext");
  const editBtn = li.querySelector(".editbtn");
  const deleteBtn = li.querySelector(".deletebtn");

  //수정 폼 열기
  li.innerHTML = `<form action="GET" class="todotext_edit">
  <input class="todotext_edit_Input" type="text" value="${todoText.innerText}">
  <input class="todotext_edit_ok" type="submit" value="OK">
  <button class="todotext_edit_cancel">cancel</button>
  </form>`;

  const editInput = li.querySelector(".todotext_edit_Input");
  console.log(editInput.parentElement);

  //수정중 엔터
  editInput.parentElement.addEventListener("submit", (e) => {
    e.preventDefault();
    editCompleted(e, editInput.value);
    editServerTodos(li.id, editInput.value);
  });

  //수정중 ok 버튼
  const okBtn = li.querySelector(".todotext_edit_ok");
  okBtn.addEventListener("click", (e) => {
    editCompleted(e, editInput.value);
    editServerTodos(li.id, editInput.value);
  });

  //수정중 cancel 버튼
  const cancelBtn = li.querySelector(".todotext_edit_cancel");
  cancelBtn.addEventListener("click", (e) => editCompleted(e, todoText.innerText));

  function editCompleted(e, text) {
    const li = e.target.closest("li");
    li.innerHTML = `<span class="todotext">${text}</span>${editBtn.outerHTML}${deleteBtn.outerHTML}`;
    console.log(li);
  }
}
