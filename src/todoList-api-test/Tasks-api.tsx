import React, { useEffect, useState } from 'react';
import { todoListsAPI } from './api/todolists-api';
import { TaskType, TestTasksComponentPropsType } from './types';
import { TestTaskComponent } from './Task-api';

export const TestTasksComponent: React.FC<TestTasksComponentPropsType> = ({ todoListId }) => {

  const [state, setState] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    todoListsAPI.getTasks(todoListId)
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
      const res = await todoListsAPI.postTask(todoListId, { title: newTaskTitle });
      console.log(`Task ${newTaskTitle} added`);
      setState([res.data.data.item, ...state]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const deleteTaskHandler = async(taskId: string, taskTitle: string | null) => {
    setLoading(true);
    try {
      await todoListsAPI.deleteTask(todoListId, taskId);
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
      await todoListsAPI.updateTask(todoListId, taskId, { title: newTaskTitle });
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
            {state.map((el: TaskType) =>
              <TestTaskComponent
                key={el.id}
                task={el}
                updateTask={deleteTaskHandler}
                deleteTask={updateTaskHandler}
              />)}
          </div>
        </>}
    </div>
  );
};