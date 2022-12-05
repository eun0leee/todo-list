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
export async function addServerTodos(title, order) {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        title: title,
        order: order,
      }),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

//EDIT
export async function editServerTodos(id, title, done = false, order = 0) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        title: title,
        done: done,
        order: order,
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
const formEl = document.querySelector(".todo__form");
const inputEl = formEl.querySelector(".input");
const ulEl = document.querySelector(".todo__ul");

function renderTodos(todosServerData) {
  const li = document.createElement("li");
  li.id = todosServerData.id;
  li.className = "li";

  const spanEl = document.createElement("span");
  spanEl.className = "todotext";
  spanEl.innerText = todosServerData.title;

  const editBtn = document.createElement("button");
  editBtn.className = "editbtn";
  editBtn.innerText = "🖋";
  editBtn.addEventListener("click", editHandler);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deletebtn";
  deleteBtn.innerText = "✕";
  deleteBtn.addEventListener("click", deleteHandler);

  const checkInput = document.createElement("input");
  checkInput.id = `checkbox-${li.id}`;
  checkInput.className = "checkbox";
  checkInput.type = "checkbox";
  const checkLabel = document.createElement("Label");
  checkLabel.htmlFor = `checkbox-${li.id}`;

  if (todosServerData.done) {
    checkInput.checked = true;
    spanEl.classList.add("text__deco");
  }
  checkInput.addEventListener("click", (e) => editCompleted(e, todosServerData.title, e.target.checked));

  const updatedAt = document.createElement("span");
  updatedAt.className = "updatedAt";
  const date = new Date(`${todosServerData.updatedAt}`);
  const year = String(date.getFullYear()).substr(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  updatedAt.innerText = `${year}${month}${day} ${hours}:${minutes}`;

  li.append(checkInput, checkLabel, spanEl, updatedAt, editBtn, deleteBtn);
  ulEl.prepend(li);
}

/////////////////  이벤트리스너 함수 ///////////////////
//조회
//간단히 할 다른 방법 없는지
(async function getTodos() {
  try {
    let getData = await getServerTodos();
    let res = getData.sort(function (a, b) {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
    if (res.length !== 0) {
      res.forEach((item) => renderTodos(item));
    } else {
      //화면에 나타내기
      console.log("Type your first Todo");
    }
  } catch (error) {
    console.log(error);
  }
})();

//입력
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTitle = inputEl.value;
  const newOrder = Date.now();
  // let newOrder = ulEl.querySelectorAll(".li").length + 1;
  inputEl.value = "";
  try {
    let getData = await addServerTodos(newTitle, newOrder);
    renderTodos(getData);
  } catch (error) {
    console.log(error);
  }
});

//삭제
async function deleteHandler(e) {
  try {
    const li = e.target.parentElement;
    li.remove();
    await deleteServerTodos(li.id);
  } catch (error) {
    console.log(error);
  }
}

//수정
function editHandler(e) {
  //기존 요소 불러오기
  const li = e.target.parentElement;
  const todoText = li.querySelector(".todotext");

  //수정 폼 열기
  li.innerHTML = `<form action="GET" class="todotext_edit">
  <Input class="todotext_edit_text" value="${todoText.innerText}">
  <input class="todotext_edit_ok" type="submit" value="ok">
  <button class="todotext_edit_cancel" type="button" value="cancel">cancel</button>
  </form>`;

  //수정중 엔터 또는 ok 버튼
  const editInput = li.querySelector(".todotext_edit_text");
  editInput.parentElement.addEventListener("submit", (e) => {
    e.preventDefault();
    editCompleted(e, editInput.value);
  });

  //수정중 cancel 버튼
  const editcancelBtn = li.querySelector(".todotext_edit_cancel");
  editcancelBtn.addEventListener("click", (e) => editCompleted(e, todoText.innerText));
}

async function editCompleted(e, text, done) {
  const li = e.target.closest("li");
  const getData = await editServerTodos(li.id, text, done);
  li.remove();
  renderTodos(getData);
}
