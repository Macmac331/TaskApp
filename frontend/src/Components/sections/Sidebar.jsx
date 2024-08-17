import { NavLink } from "react-router-dom";
import TaskIcon from "../Icons/TaskIcon";
import LogoutButton from "./Logout";
import { GoHomeFill } from "react-icons/go";
import { MdSpaceDashboard, MdTask } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Sidebar = () => {
  return (
    <aside className="w-1/6 h-full bg-blue-200 rounded-lg flex flex-col p-4">
      <div className="flex flex-row items-center mb-10 justify-center">
        <TaskIcon />
        <h1 className="text-center text-2xl font-Poppins ml-3">BaiTask</h1>
      </div>
      
      <div className="flex flex-col space-y-8 px-4">
        <NavLink to='/feed' className='font-Poppins flex text-xl w-full hover:text-gray-700 transition-all'>
          <GoHomeFill className="h-[25px] w-[25px] mr-3" />
          Feed
        </NavLink>
        <NavLink to='/dashboard' className='font-Poppins flex text-xl w-full hover:text-gray-700 transition-all'>
          <MdSpaceDashboard className="h-[25px] w-[25px] mr-3" />
          Dashboard
        </NavLink>
        <NavLink to='/tasks' className='font-Poppins flex text-xl w-full hover:text-gray-700 transition-all'>
          <MdTask className="h-[25px] w-[25px] mr-3" />
          Tasks
        </NavLink>
        <NavLink to='/settings' className='font-Poppins flex text-xl w-full hover:text-gray-700 transition-all'>
          <IoMdSettings className="h-[25px] w-[25px] mr-3" />
          Settings
        </NavLink>
      </div>
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
