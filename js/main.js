const apiKey = "FcKdtJs202209";
const apiUrl = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";
const USERNAME = "KDT3_LeeEunyoung";
const HEADERS = {
  "content-type": "application/json",
  apikey: apiKey,
  username: USERNAME,
};

//////////////// API ////////////////

//LOAD
export async function getTodos() {
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: HEADERS,
    });
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

//INPUT
export async function addTodos(title) {
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
export async function editTodos(id, title, done, num) {
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
export async function deleteTodos(id) {
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

////////////////////  render  ///////////////////////

// addTodos("hello-2");

// editTodos("yS7C2yPs11oFwM8KdChd", "hi-edit-03", true, 0);

// deleteTodos("ayRiutxTJjIRVxb33WFF");

function printTodos(todosData) {
  const spanEl = document.createElement("span");
  spanEl.className = "todoText";
  spanEl.innerText = todosData.title;

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";

  const li = document.createElement("li");
  li.id = todosData.id;
  li.append(spanEl, editBtn, deleteBtn);

  const ulEl = document.querySelector(".todo__list");
  ulEl.append(li);
}

const formEl = document.querySelector(".todo__form");
const inputEl = document.querySelector(".todo__input");

////////////////////  이벤트리스너 ///////////////////////
//조회
//간단히 할 다른 방법 없는지
let getData = await getTodos();
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
  let getData = await addTodos(newTodo);
  printTodos(getData);
});

//삭제

////////////////////  모달창  ///////////////////////
// const iconTodo = document.querySelector(".iconTodo");
// const pop = document.getElementById("pop");
// iconTodo.addEventListener("dblclick", ViewLayer);

// function ViewLayer() {
//   pop.style.display = "block";
// }

// const closeBtn = document.querySelector(".titlebar__btn");
// closeBtn.addEventListener("click", closemodal);

// function closemodal() {
//   pop.style.display = "none";
// }
