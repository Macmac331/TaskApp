import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { TaskContext } from '../Context/TaskContext'; // Import TaskContext

export default function useTask() {
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(TaskContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addTask = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const taskData = { ...data, userId: user.user.id };
            const response = await axios.post('http://localhost:3000/api/task/add', taskData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            dispatch({type: 'ADD_TASK' , payload : taskData})
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred while adding the task');
        } finally {
            setIsLoading(false);
        }
    };

    const getUserTask = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3000/api/task/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            dispatch({ type: 'SET_TASKS', payload: response.data });
            localStorage.setItem('tasks', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred while fetching tasks');
        } finally {
            setIsLoading(false);
        }
    };

    return { addTask, getUserTask, isLoading, error };
}
