
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const { data } = await axios.post('http://localhost:3000/api/user/login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'LOGIN', payload: data });
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
