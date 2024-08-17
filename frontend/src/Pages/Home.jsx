import React from 'react'
import Sidebar from '../Components/sections/Sidebar'
import { Outlet } from 'react-router'

const Home = (type) => {
  return (
    <div className='h-[100vh] p-5 flex flex-row space-x-3'>
        <Sidebar/>
        <div className='w-full p-5 rounded-lg'>
          <Outlet/>
        </div>
    </div>
  )
}
export default Home
