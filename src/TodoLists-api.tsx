import React, { useEffect, useState } from 'react';
import axios from 'axios';

const mainAPI = 'https://social-network.samuraijs.com/api/1.1/';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '73298759-1bcc-4e14-8998-d86b90add1ac',
  },
};

const todoListsApiGetRequest = (request: string) =>
  axios.get(`${mainAPI}${request}`, settings);

const todoListsApiPostRequest = (request: string, payload: any) =>
  axios.post(`${mainAPI}${request}`, payload, settings);

const todoListsApiDeleteRequest = (request: string, todoListId: string) =>
  axios.delete(`${mainAPI}${request}/${todoListId}`, settings);

export const GetTodoListsComponent = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todoListsApiGetRequest('todo-lists')
      .then(res => {
        setState(res.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  const addTodolistHandler = () => {
    const newTodoListTitle = prompt();
    todoListsApiPostRequest('todo-lists', { title: newTodoListTitle })
      .then(res => console.log(`Todolist ${newTodoListTitle} added`))
      .catch(err => console.log(err.message));
  };
  const deleteTodolistHandler = (todoListId: string, todoListTitle: string) => {
    todoListsApiDeleteRequest('todo-lists', todoListId)
      .then(() => console.log(`Todolist ${todoListTitle} deleted`))
      .catch(err => console.log(err.message));
  };

  return (
    <div>
      <button onClick={addTodolistHandler}>add</button>
      {state && state.map((el: any, index: number) => {
          return (
            <div key={el.id}>
              <span>{index + 1}  </span>
              <span>{el.title}</span>
              <button
                onClick={() => deleteTodolistHandler(el.id, el.title)}
              >delete
              </button>
            </div>
          );
        },
      )}</div>
  );
};

