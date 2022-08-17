import React, { useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { todoListActions } from './';
import { useAppSelector } from '../../app/store';
import { useActions } from '../common/hooks/useActions';
import { Tasks } from './tasks/Tasks';
import { AddItemForm } from '../common/components/AddItemForm';
import style from './todoListl.module.scss';

export const TodoLists: React.FC = () => {

  const { addTodoList, setTodoLists } = useActions(todoListActions);

  const todoLists = useAppSelector(state => state.todoLists);
  const isLogin = useAppSelector(state => state.login.isLogin);

  useEffect(() => {isLogin && setTodoLists();}, []);

  const addTodoListHandler = useCallback((newTodoList: string) =>
    addTodoList(newTodoList), []);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={style.main}>
      <AddItemForm onClick={addTodoListHandler} />
      <div className={style.container}>
        {todoLists.map(el => <Tasks key={el.id} todoList={el} />)}
      </div>
    </div>
  );
};