import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../services/api'; // Import necessary APIs

const TaskEdit = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate(); // For navigation
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id); // Fetch the task data
        setTask(data); // Populate form with existing task data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch task');
        setLoading(false);
      }
    };

    fetchTask(); // Fetch task on mount
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value })); // Update task state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task); // Update the task in the backend
      navigate(`/tasks/${id}`); // Navigate back to task details after saving
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={task.status} onChange={handleInputChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskEdit;
