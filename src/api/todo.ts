import { IAddReq, IEditReq, IDelReq, IRes, IDelRes } from '@/types/todo';

const TODO_KEY = process.env.TODO_KEY!;
const TODO_BASE_URL = process.env.TODO_BASE_URL!;

const USERNAME = 'KDT3_LeeEunyoung';
const HEADERS = {
  'content-type': 'application/json',
  APIKEY: TODO_KEY,
  username: USERNAME,
};

const request = async (
  url: string,
  method: string,
  body: object | null = null
) => {
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
const getServerTodos = async () =>
  (await request(TODO_BASE_URL, 'GET')) as IRes[];

//add
const addServerTodos = async ({ title, order = 0 }: IAddReq) =>
  (await request(TODO_BASE_URL, 'POST', { title, order })) as IRes;

//edit
const editServerTodos = async ({
  id,
  title,
  done = false,
  order = 0,
}: IEditReq) =>
  (await request(`${TODO_BASE_URL}/${id}`, 'PUT', {
    title,
    done,
    order,
  })) as IRes;

//delete
const deleteServerTodos = async (id: IDelReq) => {
  (await request(`${TODO_BASE_URL}/${id}`, 'DELETE')) as IDelRes;
};

export { getServerTodos, addServerTodos, editServerTodos, deleteServerTodos };
