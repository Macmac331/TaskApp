
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data } = await axios.post('http://localhost:3000/api/user/signup', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem('user', JSON.stringify(data));

            dispatch({ type: 'LOGIN', payload: data });
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
