import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {useTaskContext} from './useTaskContext'

export default function useLogout() {
    const { dispatch: authDispatch } = useAuthContext(); 
    const { dispatch: taskDispatch } = useTaskContext(); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const logout = () => {
        setIsLoading(true);
        setError(null);
        try{
            localStorage.removeItem('user');
            localStorage.removeItem('tasks')
            authDispatch({ type: 'LOGOUT'});
            taskDispatch({type : 'CLEAR_TASKS'})
        }catch(error){
            setError('Log out Failed');
        }finally{
            setIsLoading(false);
        }
    };
    return {logout, isLoading, error} 
}
