import React, { useEffect, useState } from 'react';
import { testTodolistsApi } from './api/TestTodolists-api';
import { TestTaskType, TestTasksComponentPropsType } from './TestTypes';
import { TestTaskComponent } from './TestTask';

export const TestTasksComponent: React.FC<TestTasksComponentPropsType> = React.memo(({ todoListId }) => {

  const [state, setState] = useState<TestTaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    testTodolistsApi.getTasks(todoListId)
      .then((res) => {
        console.log('Tasks are loaded');
        setState(res.data.items);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addTaskHandler = async() => {
    setLoading(true);
    const newTaskTitle = prompt();
    try {
      const res = await testTodolistsApi.postTask(todoListId, { title: newTaskTitle });
      console.log(`Task ${newTaskTitle} added`);
      setState([res.data.data.item, ...state]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const deleteTaskHandler = async(taskId: string, taskTitle: string| null) => {
    setLoading(true);
    try {
      await testTodolistsApi.deleteTask(todoListId, taskId);
      console.log(`Task ${taskTitle} deleted`);
      setState(state.filter(el => el.id !== taskId));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const updateTaskHandler = async(taskId: string, taskTitle: string | null) => {
    setLoading(true);
    const newTaskTitle = prompt();
    try {
      await testTodolistsApi.updateTask(todoListId, taskId, { title: newTaskTitle });
      console.log(`Task ${taskTitle} changed to ${newTaskTitle}`);
      setState(state.map(el => el.id === taskId ? { ...el, title: newTaskTitle } : el));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '10px' }}>
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
            {state.map((el: TestTaskType) =>
              <TestTaskComponent
                key={el.id}
                task={el}
                updateTask={updateTaskHandler}
                deleteTask={deleteTaskHandler}
              />)}
          </div>
        </>}
    </div>
  );
})