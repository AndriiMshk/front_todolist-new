import React, { useEffect, useState } from 'react';
import axios from 'axios';

type TodoListType = {
  id: string
  title: string
  filter: any
}

const mainAPI = 'https://social-network.samuraijs.com/api/1.1/';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '73298759-1bcc-4e14-8998-d86b90add1ac',
  },
};

const todoListsApiGetRequest = (request: string) =>
  axios.get(`${mainAPI}${request}`, settings);

const todoListsApiPostRequest = (request: string, payload: { title: string | null }) =>
  axios.post(`${mainAPI}${request}`, payload, settings);

const todoListsApiDeleteRequest = (request: string, todoListId: string) =>
  axios.delete(`${mainAPI}${request}/${todoListId}`, settings);

const todoListsApiUpdateRequest = (request: string, todoListId: string, payload: { title: string | null }) =>
  axios.put(`${mainAPI}${request}/${todoListId}`, payload, settings);

export const GetTodoListsComponent = () => {

  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    todoListsApiGetRequest('todo-lists')
      .then(() => {
        todoListsApiGetRequest('todo-lists')
          .then(res => setState(res.data));
      })
      .catch(err => console.log(err.message),
      )
      .finally(() => setLoading(false));
  }, []);

  const addTodolistHandler = () => {
    setLoading(true);
    const newTodoListTitle = prompt();
    todoListsApiPostRequest('todo-lists', { title: newTodoListTitle })
      .then(() => console.log(`Todolist ${newTodoListTitle} added`))
      .then(() => todoListsApiGetRequest('todo-lists')
        .then(res => setState(res.data)))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };
  const deleteTodolistHandler = (todoListId: string, todoListTitle: string) => {
    setLoading(true);
    todoListsApiDeleteRequest('todo-lists', todoListId)
      .then(() => console.log(`Todolist ${todoListTitle} deleted`))
      .then(() => todoListsApiGetRequest('todo-lists')
        .then(res => setState(res.data)))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };
  const updateTodoListTitle = (todoListId: string, todoListTitle: string) => {
    const newTodoListTitle = prompt();
    setLoading(true);
    todoListsApiUpdateRequest('todo-lists', todoListId, { title: newTodoListTitle })
      .then(() => console.log(`Todolist ${todoListTitle} title changed to ${newTodoListTitle}`))
      .then(() => todoListsApiGetRequest('todo-lists')
        .then(res => setState(res.data)))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {loading
        ? <div>loading</div>
        :
        <>
          <button onClick={addTodolistHandler}>add</button>
          {state && state.map((el: TodoListType) => {
              return <Todolist
                key={el.id}
                todoList={el}
                deleteTodoList={deleteTodolistHandler}
                updateTodoList={updateTodoListTitle} />;
            },
          )}
        </>
      }
    </div>
  );
};

type TodolistPropsType = {
  todoList: TodoListType
  deleteTodoList: (todoListId: string, todoListTitle: string) => void
  updateTodoList: (todoListId: string, todoListTitle: string) => void
}

const Todolist: React.FC<TodolistPropsType> = ({ todoList, deleteTodoList, updateTodoList }) => {
  return (
    <div key={todoList.id}>
      <span>{todoList.title}</span>
      <button
        onClick={() => deleteTodoList(todoList.id, todoList.title)}
      >delete
      </button>
      <button
        onClick={() => updateTodoList(todoList.id, todoList.title)}
      >change
      </button>
    </div>
  );
};

