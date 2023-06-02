import { TODO_KEY, TODO_BASE_URL } from '/src/utils/APIkey.js';

const USERNAME = 'KDT3_LeeEunyoung';
const HEADERS = {
  'content-type': 'application/json',
  APIKEY: TODO_KEY,
  username: USERNAME,
};

//get
const getServerTodos = async () => {
  try {
    const res = await fetch(TODO_BASE_URL, {
      method: 'GET',
      headers: HEADERS,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

//add
const addServerTodos = async (title, order) => {
  try {
    const res = await fetch(TODO_BASE_URL, {
      method: 'POST',
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
};

//edit
const editServerTodos = async (id, title, done = false, order = 0) => {
  try {
    const res = await fetch(`${TODO_BASE_URL}/${id}`, {
      method: 'PUT',
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
};

//delete
const deleteServerTodos = async (id) => {
  try {
    const res = await fetch(`${TODO_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: HEADERS,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export { getServerTodos, addServerTodos, editServerTodos, deleteServerTodos };
