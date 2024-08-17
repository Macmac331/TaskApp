import React from 'react'
import Login from '../Components/sections/Login';
import Signup from '../Components/sections/Signup';

const AuthPage = ({type}) => {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
      {type === 'signup' ? <Signup /> : <Login />}
    </div>
  )
}

export default AuthPage;