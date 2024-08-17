import { useContext, useEffect, useState } from "react";
import AddTaskModal from "../Components/sections/AddTaskModal";
import Card from "../Components/ui/Card";
import useTask from "../Hooks/useTask";
import { AuthContext } from "../Context/AuthContext";
import { TaskContext } from "../Context/TaskContext";
import Table from "../Components/ui/Table";
const Tasks = () => {
    const {user} = useContext(AuthContext)
    const {state: taskState} = useContext(TaskContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {getUserTask} =  useTask();
    const [tasks, setTasks] = useState(taskState.tasks);

    const pendingTaskCount = tasks.filter(task => task.status === "pending").length;
    const inProgressTaskCount = tasks.filter(task => task.status === "inprogress").length;
    const completedTaskCount = tasks.filter(task => task.status === "inprogress").length;
    const columns = [
        { key: 'title', title: 'Title' },
        { key: 'description', title: 'Description' },
        { key: 'startDate', title: 'Start Date', render: (item) => new Date(item.startDate).toLocaleDateString() },
        { key: 'dueDate', title: 'Due Date', render: (item) => new Date(item.dueDate).toLocaleDateString() },
        { key: 'status', title: 'Status' }
    ];
    const keyExtractor = (item) => item._id;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchTasks = async () => {
            if (taskState.tasks.length === 0) { 
                try {
                    console.log("qwe");
                    const response = await getUserTask(user.user.id, user.token);
                    console.log(response);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            } else {
                console.log(taskState.tasks);
                
                console.log("Tasks from context");
                setTasks(taskState.tasks);
            }
        };
        fetchTasks();
    }, [taskState.tasks.length, user.user.id, user.token]);
    return (
        <div className="max-h-full ">
            <h1 className="text-4xl font-Poppins ">Tasks</h1>
            <div className="mt-5 p-4 flex  flex-wrap justify-center gap-10 w-full">
                <Card title={'Pending'} value={pendingTaskCount} className={`text-4xl text-center mt-4`} />
                <Card title={'In Progress'} value={inProgressTaskCount} className={`text-4xl text-center mt-4`}/>
                <Card title={'Completed'} value={completedTaskCount} className={`text-4xl text-center mt-4`}/>
            </div>
            <div className="mb-5">
            <button 
                onClick={openModal} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add Task
            </button>
            
                {isModalOpen && <AddTaskModal onClose={closeModal} />}
            </div>
            <div className="px-4 h-[350px] overflow-auto">
                <Table columns={columns} data={tasks} keyExtractor={keyExtractor} />
            </div>
        </div>
    )
}

export default Tasks;
