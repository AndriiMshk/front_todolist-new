import React, { useEffect, useState } from 'react';
import { todoListsAPI } from './api/todolists-api';
import { TestTodoListType } from './types';
import { TestTodoListComponent } from './TodoList-api';

export const TestTodoListsComponent = () => {

  const [state, setState] = useState<TestTodoListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    todoListsAPI.getTodolists()
      .then((res) => {
        console.log('TodoLists are loaded');
        setState(res.data);
      })
      .catch(err => console.log(err.message),
      )
      .finally(() => setLoading(false));
  }, []);

  const addTodoListHandler = async() => {
    setLoading(true);
    const newTodoListTitle = prompt();
    try {
      const res = await todoListsAPI.postTodoList({ title: newTodoListTitle });
      console.log(`Todolist ${newTodoListTitle} added`);
      setState([res.data.data.item, ...state]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const deleteTodoListHandler = async(todoListId: string, todoListTitle: string | null) => {
    setLoading(true);
    try {
      await todoListsAPI.deleteTodoList(todoListId);
      console.log(`Todolist ${todoListTitle} deleted`);
      setState(state.filter(el => el.id !== todoListId));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const updateTodoListTitle = async(todoListId: string, todoListTitle: string | null) => {
    setLoading(true);
    const newTodoListTitle = prompt();
    try {
      await todoListsAPI.updateTodoList(todoListId, { title: newTodoListTitle });
      console.log(`Todolist ${todoListTitle} title changed to ${newTodoListTitle}`);
      setState(state.map(el => el.id === todoListId ? { ...el, title: newTodoListTitle } : el));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading
        ? <div>loading</div>
        :
        <>
          <button onClick={addTodoListHandler}>add</button>
          {state.map((el: TestTodoListType) => {
              return <TestTodoListComponent
                key={el.id}
                todoList={el}
                deleteTodoList={deleteTodoListHandler}
                updateTodoList={updateTodoListTitle} />;
            },
          )}
        </>
      }
    </div>
  );
};

