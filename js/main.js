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
    order: Date.now(),
  };
  inputEl.value = "";
  toDos.push(newTodo);
  printTodos(newTodo); //browser output
  await addServerTodos(newTodo);
});

//Server
async function addServerTodos(newTodo) {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        title: newTodo.title,
        order: newTodo.order,
      }),
    });
  } catch (error) {
    console.log(error);
  }

  // const addjson = await res.json();
  // console.log(addjson);
  // return addjson;
}

//////////////////////////// OUTPUT ///////////////////////////////
//Browser
function printTodos(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const todoText = document.createElement("span");
  todoText.innerText = newTodo.title;

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  // editBtn.addEventListener("click", editTodos);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click", deleteTodos);

  li.append(todoText, editBtn, deleteBtn);
  ulEl.append(li);
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
