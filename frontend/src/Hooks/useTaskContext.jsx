import { useContext } from "react";
import { TaskContext } from "../Context/TaskContext";

export const useTaskContext = () =>{
    const context = useContext(TaskContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
}