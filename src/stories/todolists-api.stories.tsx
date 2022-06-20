import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default {
  title: 'API',
};

const settings = {
  withCredentials: true
}

export const GetTodoLists = () => {

  const [state, setState] = useState<any>(null);

  useEffect(() => {
    axios.get('https://social-network.samuraijs.com/api/1.1/auth/me', settings)
      .then(res => {
        debugger
        setState(res);})
  }, []);

  return (
    <div>{JSON.stringify(state)}</div>
  );
};

export const CreateTodoLists = () => {};

export const DeleteTodoLists = () => {};

export const UpdateTodoLists = () => {};
