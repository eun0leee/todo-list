import { todo } from "./APIkey.js";

const APIKEY = todo.apikey;
const USERNAME = "KDT3_LeeEunyoung";
const HEADERS = {
  "content-type": "application/json",
  APIKEY: APIKEY,
  username: USERNAME,
};

const APIURL = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";

//////////////////// API ///////////////////////

//get
export async function getServerTodos() {
  try {
    const res = await fetch(APIURL, {
      method: "GET",
      headers: HEADERS,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

//add
export async function addServerTodos(title, order) {
  try {
    const res = await fetch(APIURL, {
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

//edit
export async function editServerTodos(id, title, done = false, order = 0) {
  try {
    const res = await fetch(`${APIURL}/${id}`, {
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

//delete
export async function deleteServerTodos(id) {
  try {
    const res = await fetch(`${APIURL}/${id}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
