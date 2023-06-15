const TODO_KEY = process.env.TODO_KEY;
const TODO_BASE_URL = process.env.TODO_BASE_URL;

const USERNAME = 'KDT3_LeeEunyoung';
const HEADERS = {
  'content-type': 'application/json',
  APIKEY: TODO_KEY,
  username: USERNAME,
};

const request = async (url, method, body = null) => {
  try {
    const res = await fetch(url, {
      method,
      headers: HEADERS,
      body: body ? JSON.stringify(body) : null,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

//get
const getServerTodos = () => request(TODO_BASE_URL, 'GET');

//add
const addServerTodos = (title, order) =>
  request(TODO_BASE_URL, 'POST', { title, order });

//edit
const editServerTodos = (id, title, done = false, order = 0) =>
  request(`${TODO_BASE_URL}/${id}`, 'PUT', { title, done, order });

//delete
const deleteServerTodos = (id) => request(`${TODO_BASE_URL}/${id}`, 'DELETE');

export { getServerTodos, addServerTodos, editServerTodos, deleteServerTodos };
