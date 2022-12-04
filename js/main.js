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
export async function editServerTodos(id, title, done = false, num = 0) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        title: title,
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
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

// addTodos("hello-2");

// editTodos("yS7C2yPs11oFwM8KdChd", "hi-edit-03", true, 0);

//////////////////// RENDER ///////////////////////
const formEl = document.querySelector(".todo__form");
const inputEl = document.querySelector(".todo__input");
const ulEl = document.querySelector(".todo__list");

function renderTodos(todosServerData) {
  const li = document.createElement("li");
  li.id = todosServerData.id;

  const spanEl = document.createElement("span");
  spanEl.className = "todotext";
  spanEl.innerText = todosServerData.title;
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deletebtn";
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTodos);
  const editBtn = document.createElement("button");
  editBtn.className = "editbtn";
  editBtn.innerText = "✏️";
  editBtn.addEventListener("click", editTodos);

  //Lately updated date
  const date = new Date(`${todosServerData.updatedAt}`);
  const year = String(date.getFullYear()).substr(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const updatedAt = document.createElement("span");
  updatedAt.innerText = `(${year}/${month}/${day} ${hours}:${minutes})`;

  li.append(spanEl, updatedAt, editBtn, deleteBtn);
  ulEl.append(li);
}

/////////////////  이벤트리스너 두번째 인자 ///////////////////
//조회
//간단히 할 다른 방법 없는지
(async function getTodos() {
  try {
    console.log("조회됨!");
    let getData = await getServerTodos();
    if (getData.length !== 0) {
      getData.forEach((item) => renderTodos(item));
    } else {
      console.log("Type your first Todo");
    }
  } catch (error) {
    console.log(error);
  }
})();

//입력
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  let newTodo = inputEl.value;
  inputEl.value = "";
  try {
    let getData = await addServerTodos(newTodo);
    renderTodos(getData);
  } catch (error) {
    console.log(error);
  }
});

//삭제
async function deleteTodos(e) {
  try {
    const li = e.target.parentElement;
    li.remove();
    await deleteServerTodos(li.id);
  } catch (error) {
    console.log(error);
  }
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

  //수정중 엔터 또는 ok 버튼
  editInput.parentElement.addEventListener("submit", (e) => {
    e.preventDefault();
    editCompleted(e, editInput.value);
  });

  //수정중 cancel 버튼
  const editcancelBtn = li.querySelector(".todotext_edit_cancel");
  editcancelBtn.addEventListener("click", (e) => editCompleted(e, todoText.innerText));

  async function editCompleted(e, text) {
    const li = e.target.closest("li");
    li.innerHTML = `<span class="todotext">${text}</span>${editBtn.outerHTML}${deleteBtn.outerHTML}`;
    if (text !== todoText.innerText) {
      li.remove();
      const getData = await editServerTodos(li.id, text);
      renderTodos(getData);
    }
  }
}
