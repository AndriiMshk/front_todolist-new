import React, { useEffect, useState } from 'react';
import { testTodolistsApi } from './api/TestTodolists-api';
import { TestTodoListType } from './TestTypes';
import { TestTodoListComponent } from './TestTodoList';

export const TestTodoListsComponent = () => {

  const [state, setState] = useState<TestTodoListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    testTodolistsApi.getTodolists()
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
      const res = await testTodolistsApi.postTodoList({ title: newTodoListTitle });
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
      await testTodolistsApi.deleteTodoList(todoListId);
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
      await testTodolistsApi.updateTodoList(todoListId, { title: newTodoListTitle });
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

