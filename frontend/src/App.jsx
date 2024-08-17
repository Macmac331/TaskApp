import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthPage from "./Pages/AuthPage";
import Home from "./Pages/Home";
import Feed from "./Pages/Feed";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Settings from "./Pages/Settings";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/*Check user authentication*/}
        <Route path="/" element={user ? <Navigate to="/feed" /> : <Navigate to="/login" />} />
        
        {/* public routes */}
        <Route path="/login" element={!user ? <AuthPage type="login" /> : <Navigate to="/feed" />} />
        <Route path="/signup" element={!user ? <AuthPage type="signup" /> : <Navigate to="/feed" />} />
        
        {/* protected routes */}
        <Route element={user ? <Home /> : <Navigate to="/login" />}>
          <Route path="feed" element={<Feed />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
