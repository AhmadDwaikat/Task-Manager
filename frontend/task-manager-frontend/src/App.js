import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = async (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    
  };

  return (
    <Router>
      <div>
        <h1>Task Manager</h1>
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks} />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
       </Routes>
        <TaskForm onTaskAdded={handleTaskAdded} /> 
      </div>
    </Router>
  );
};

export default App;
