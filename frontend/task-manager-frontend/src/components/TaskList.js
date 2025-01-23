import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/api'; 
import './TaskList.css';

const TaskList = ({ setTasks, tasks }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', status: 'pending' });

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      const fetchTasks = async () => {
        try {
          const { data } = await getTasks(); 
          setTasks(data); 
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      fetchTasks();
    }
  }, [tasks, setTasks]); 

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = tasks.find(task => task._id === editingTaskId);
      setEditedTask({ ...taskToEdit });
    }
  }, [editingTaskId, tasks]);

  const handleInlineEdit = (field, value) => {
    setEditedTask((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await updateTask(editingTaskId, editedTask);
      setTasks((prevTasks) => prevTasks.map((task) =>
        task._id === editingTaskId ? { ...task, ...editedTask } : task
      ));
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks available</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {editingTaskId === task._id ? (
                <div className="task-editing-form">
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => handleInlineEdit('title', e.target.value)}
                    className="task-edit-input"
                  />
                  <textarea
                    value={editedTask.description}
                    onChange={(e) => handleInlineEdit('description', e.target.value)}
                    className="task-edit-textarea"
                  />
                  <select
                    value={editedTask.status}
                    onChange={(e) => handleInlineEdit('status', e.target.value)}
                    className="task-edit-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={handleSaveEdit} className="task-save-btn">Save</button>
                  <button onClick={() => setEditingTaskId(null)} className="task-cancel-btn">Cancel</button>
                </div>
              ) : (
                <div className="task-view">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Status: {task.status}</p>
                  <button onClick={() => setEditingTaskId(task._id)} className="task-edit-btn">Edit</button>
                  <button onClick={() => handleDelete(task._id)} className="task-delete-btn">Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
