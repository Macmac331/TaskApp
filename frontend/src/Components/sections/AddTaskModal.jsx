import React, { useContext, useState } from 'react';
import ReusableForm from '../ui/ReusableForm';
import useTask from '../../Hooks/useTask';
import { AuthContext } from '../../Context/AuthContext';


const AddTaskModal = ({ onClose }) => {
    const {user} = useContext(AuthContext)
    const { addTask, isLoading, error } = useTask();
    const formFields = [
        { name: 'title', type: 'text', placeholder: 'Task Title', label: 'Title' },
        { name: 'description', type: 'text', placeholder: 'Task Description', label: 'Description' },
        { name: 'startDate', type: 'date', placeholder: '', label: 'Start Date' },
        { name: 'dueDate', type: 'date', placeholder: '', label: 'Due Date' },
    ];

    const handleSubmit =  async (formData, e) => {
        e.preventDefault(); 
        if (!user.user.id || !user.user.id) {
            console.error('User not authenticated or user ID is missing');
            return;
        }
        try {
            await addTask({...formData,"status" : "pending"}, user.token);      
            console.log(user.token);
            onClose();
        } catch (err) {
        console.error('Error adding task:', err);
        }
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-brightness-75 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <ReusableForm formFields={formFields} handleSubmit={handleSubmit} />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
