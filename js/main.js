/////////////////////// INITIALIZATION CODE ////////////////////////////
let toDos = [];

//API
const apiKey = "FcKdtJs202209";
const apiUrl = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";
const USERNAME = "KDT3_LeeEunyoung";
const HEADERS = {
  "content-type": "application/json",
  apikey: apiKey,
  username: USERNAME,
};

////////////////////////// LOAD //////////////////////////////
//Server
async function getServerTodos() {
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: HEADERS,
    });
    const getjson = await res.json();
    if (getjson.length !== 0) {
      getjson.forEach((item) => printTodos(item));
      toDos = getjson;
    } else {
      console.log("Type your first Todo");
    }
  } catch (error) {
    console.log(error);
  }
}

getServerTodos();

//////////////////////////// INPUT ///////////////////////////////
//Form
const formEl = document.querySelector(".todo__form");
const inputEl = document.querySelector(".todo__input");
const ulEl = document.querySelector(".todo__list");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  let newTodo = {
    title: inputEl.value,
  };
  inputEl.value = "";
  toDos.push(newTodo);
  addServerTodos(newTodo);
});

//Server
async function addServerTodos(newTodo) {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        title: newTodo.title,
        done: false,
      }),
    });
    const addjson = await res.json();
    printTodos(addjson);
  } catch (error) {
    console.log(error);
  }
}

//////////////////////////// OUTPUT ///////////////////////////////
//Browser
function printTodos(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const todoText = document.createElement("span");
  todoText.classList.add("todoText");
  todoText.innerText = newTodo.title;

  //incompleted and completed
  const checkBtn = document.createElement("input");
  checkBtn.type = "checkbox";
  checkBtn.addEventListener("click", completed);
  function completed() {
    todoText.classList.toggle("completedText");
    newTodo.done = checkBtn.checked;
    console.log(newTodo);
  }

  //Lately updated date
  const todoUpdatedDate = document.createElement("span");
  const date = new Date(`${newTodo.updatedAt}`);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  todoUpdatedDate.innerText = `(${year}/${month}/${day}/${month} ${hours}:${minutes})`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  editBtn.addEventListener("click", editTodos);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click", deleteTodos);

  li.append(checkBtn, todoText, todoUpdatedDate, editBtn, deleteBtn);
  ulEl.append(li);
}

//////////////////////////// EDIT ///////////////////////////////
//Browser
function editTodos(event) {
  const editBtn = (event.target.innerText = "✔️");
  console.log(event);
  const li = event.target.parentElement;
  let todoText = li.querySelector(".todoText");
  const editInput = document.createElement("input");

  li.insertBefore(editInput, todoText);
  todoText.classList.add("hidden");
  editInput.value = todoText.textContent;

  editInput.addEventListener("keypress", editEnd);
  function editEnd(e, editBtn) {
    if (e.key === "Enter") {
      todoText.textContent = editInput.value;
      editInput.classList.add("hidden");
      todoText.classList.remove("hidden");
      editServerTodos(li.id, todoText.textContent);
    }
  }
}

//Server
async function editServerTodos(id, todoText) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        title: todoText,
        done: false,
      }),
    });
    const editjson = await res.json();
    console.log(editjson);
    return editjson;
  } catch (error) {
    console.log(error);
  }
}

//////////////////////////// DELETE ///////////////////////////////
//Browser
function deleteTodos(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter((item) => item.id !== parseInt(li.id));
  deleteServerTodos(li.id);
  li.remove();
}

//Server
async function deleteServerTodos(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    const deletejson = await res.json();
    return deletejson;
  } catch (error) {
    console.log(error);
  }
}
