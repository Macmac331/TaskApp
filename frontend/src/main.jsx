import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { TaskProvider } from './Context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <TaskProvider>

        <App />

    </TaskProvider> 
  </AuthContextProvider>,
)
