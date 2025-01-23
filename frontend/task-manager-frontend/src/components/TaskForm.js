import React, { useState } from 'react';
import { createTask } from '../services/api';
import './TaskForm.css'; 

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required');
      return;
    }
    try {
      const newTask = await createTask({ title, description });
      onTaskAdded(newTask.data); 
      setTitle('');
      setDescription('');
      setError(null); 
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="task-form">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
