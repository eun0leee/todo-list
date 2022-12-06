//////////////////// MODULES ///////////////////////
//todo
import { getServerTodos, addServerTodos, editServerTodos, deleteServerTodos } from "./APIs.js";

//etc
import "./clock.js";
import "./location-and-weather.js";
import "./username.js";

//////////////////// RENDER ///////////////////////
const formEl = document.querySelector(".todo__form");
const inputEl = formEl.querySelector(".input");
const ulEl = document.querySelector(".todo__ul");

//get
(async function getTodos() {
  try {
    let getData = await getServerTodos();
    let changedData = getData.sort(function (a, b) {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
    if (changedData.length == 0) {
      const zeroLength = document.querySelector(".zerolength");
      zeroLength.style.display = "block";
      ulEl.prepend(zeroLength);
    } else if (changedData.length !== 0) {
      changedData.forEach((item) => renderTodoItem(item));
    }
  } catch (error) {
    console.log(error);
  }
})();

//add
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTitle = inputEl.value;
  const newOrder = Date.now();
  // let newOrder = ulEl.querySelectorAll(".li").length + 1;
  inputEl.value = "";
  try {
    let getData = await addServerTodos(newTitle);
    renderTodoItem(getData);
  } catch (error) {
    console.log(error);
  }
});

function renderTodoItem(todosServerData) {
  //edit, delete
  const li = document.createElement("li");
  li.id = todosServerData.id;
  li.className = "li";

  const spanEl = document.createElement("span");
  spanEl.className = "todotext";
  spanEl.innerText = todosServerData.title;

  const editBtn = document.createElement("button");
  editBtn.className = "editbtn";
  editBtn.innerText = "🖋";
  editBtn.title = "edit";
  editBtn.addEventListener("click", editHandler);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deletebtn";
  deleteBtn.innerText = "✕";
  deleteBtn.title = "delete";
  deleteBtn.addEventListener("click", deleteHandler);

  //check done
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

  //updated date
  const updatedAt = document.createElement("span");
  updatedAt.className = "updatedAt";
  const date = new Date(`${todosServerData.updatedAt}`);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  updatedAt.innerText = `${year}${month}${day} ${hours}:${minutes}`;

  li.append(checkInput, checkLabel, spanEl, updatedAt, editBtn, deleteBtn);
  ulEl.prepend(li);
}

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
  const todoText = li.querySelector(".todotext");

  //수정 폼 열기
  li.innerHTML = `<form action="GET" class="todotext_edit">
  <Input class="todotext_edit_text" value="${todoText.innerText}">
  <input class="todotext_edit_ok" type="submit" value="ok">
  <button class="todotext_edit_cancel" type="button" value="cancel">cancel</button>
  </form>`;

  //수정중 submit
  const editInput = li.querySelector(".todotext_edit_text");
  editInput.parentElement.addEventListener("submit", (e) => {
    e.preventDefault();
    editCompleted(e, editInput.value);
  });

  //수정중 cancel
  const editcancelBtn = li.querySelector(".todotext_edit_cancel");
  editcancelBtn.addEventListener("click", (e) => editCompleted(e, todoText.innerText));
}

async function editCompleted(e, text, done) {
  const li = e.target.closest("li");
  const getData = await editServerTodos(li.id, text, done);
  li.remove();
  renderTodoItem(getData);
}
