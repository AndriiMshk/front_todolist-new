import React, { useEffect, useState } from 'react';
import axios from 'axios';

type TodoListType = {
  id: string
  title: string
  filter: any
}

const mainAPI = 'https://social-network.samuraijs.com/api/1.1/todo-lists';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '73298759-1bcc-4e14-8998-d86b90add1ac',
  },
};

const todoListsApiGetRequest = () =>
  axios.get(`${mainAPI}`, settings);

const todoListsApiPostRequest = (payload: { title: string | null }) =>
  axios.post(`${mainAPI}`, payload, settings);

const todoListsApiDeleteRequest = (todoListId: string) =>
  axios.delete(`${mainAPI}/${todoListId}`, settings);

const todoListsApiUpdateRequest = (todoListId: string, payload: { title: string | null }) =>
  axios.put(`${mainAPI}/${todoListId}`, payload, settings);

export const GetTodoListsComponent = () => {

  const [state, setState] = useState<TodoListType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    todoListsApiGetRequest()
      .then(() => {
        todoListsApiGetRequest()
          .then(res => setState(res.data));
      })
      .catch(err => console.log(err.message),
      )
      .finally(() => setLoading(false));
  }, []);

  const addTodolistHandler = () => {
    setLoading(true);
    const newTodoListTitle = prompt();
    todoListsApiPostRequest({ title: newTodoListTitle })
      .then(() => console.log(`Todolist ${newTodoListTitle} added`))
      .then(() => todoListsApiGetRequest()
        .then(res => setState(res.data)))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };
  const deleteTodolistHandler = (todoListId: string, todoListTitle: string) => {
    setLoading(true);
    todoListsApiDeleteRequest(todoListId)
      .then(() => console.log(`Todolist ${todoListTitle} deleted`))
      .then(() => todoListsApiGetRequest()
        .then(res => setState(res.data)))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };
  const updateTodoListTitle = (todoListId: string, todoListTitle: string) => {
    const newTodoListTitle = prompt();
    setLoading(true);
    todoListsApiUpdateRequest(todoListId, { title: newTodoListTitle })
      .then(() => console.log(`Todolist ${todoListTitle} title changed to ${newTodoListTitle}`))
      .then(() => todoListsApiGetRequest()
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
      <div>
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
      <div>
        <Tasks todoListId={todoList.id} />
      </div>
    </div>
  );
};

const tasksApiGetRequest = (todoListId: string) =>
  axios.get(`${mainAPI}/${todoListId}/tasks`, settings);

const taskApiPostRequest = (todoListId: string, payload: { title: string | null }) =>
  axios.post(`${mainAPI}/${todoListId}/tasks`, payload, settings);

const taskApiDeleteRequest = (todoListId: string, taskId: string) =>
  axios.delete(`${mainAPI}/${todoListId}/tasks/${taskId}`, settings);

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TasksPropsType = {
  todoListId: string
}

const Tasks: React.FC<TasksPropsType> = ({ todoListId }) => {

  const [state, setState] = useState<TaskType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    tasksApiGetRequest(todoListId)
      .then((res) => {
        setState(res.data.items);
      })
      .catch(err => console.log(err.message),
      )
      .finally(() => setLoading(false));
  }, []);

  const addTaskHandler = () => {
    setLoading(true);
    const newTaskTitle = prompt();
    taskApiPostRequest(todoListId, { title: newTaskTitle })
      .then(() => console.log(`Task ${newTaskTitle} added`))
      .then(() => tasksApiGetRequest(todoListId))
      .then((res) => setState(res.data.data))
      .finally(() => setLoading(false));
  };
  const deleteTask = (taskId: string, taskTitle: string) => {
    setLoading(true);
    taskApiDeleteRequest(todoListId, taskId)
      .then(() => console.log(`Task ${taskTitle} deleted`))
      .then(() => tasksApiGetRequest(todoListId))
      .then((res) => setState(res.data.data))
      .finally(() => setLoading(false));
  };
// не работает отрисовка когда добавляются и удаляются таски

  return (
    <div>
      {loading
        ?
        <div>loading</div>
        : <>
          <span>task list:</span>
          <button
            onClick={addTaskHandler}
          >add task
          </button>
          <div>
            {state && state.map((el: TaskType) =>
              <Task
                key={el.id}
                task={el}
                deleteTask={deleteTask}
              />)}
          </div>
        </>}
    </div>
  );
};

type TaskPropsType = {
  task: TaskType
  deleteTask: (taskId: string, taskTitle: string) => void
}

const Task: React.FC<TaskPropsType> = ({ task, deleteTask }) => {
  return (
    <div>
      <span>{task.title}</span>
      <button onClick={() => deleteTask(task.id, task.title)}>delete</button>
    </div>
  );
};

