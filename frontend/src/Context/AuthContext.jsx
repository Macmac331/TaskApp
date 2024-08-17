import React, { createContext, useReducer, useEffect } from "react";
import PropTypes from 'prop-types';
import {jwtDecode} from'jwt-decode';
export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null, tasks: [] };
        default:
            return state;
    }
};
const isTokenExpired = (token) => {
    if (!token)  return true;
        const { exp } = jwtDecode(token); 
        const currentTime = Date.now() / 1000;
        return exp < currentTime;
};


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.token && !isTokenExpired(parsedUser.token)) {
                dispatch({ type: 'LOGIN', payload: parsedUser });
            } else {
                localStorage.removeItem('user'); 
                dispatch({ type: 'LOGOUT' });
            }
        } else {
            dispatch({ type: 'LOGOUT' }); 
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
