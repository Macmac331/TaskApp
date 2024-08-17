import React, { createContext, useReducer, useContext, useEffect } from 'react';

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    case 'SET_TASKS':
      return {...state, tasks: action.payload}
    case 'CLEAR_TASKS':
      return { ...state, tasks: [] };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });
  useEffect(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        dispatch({ type: 'SET_TASKS', payload: tasks });
      }
  }, []);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
