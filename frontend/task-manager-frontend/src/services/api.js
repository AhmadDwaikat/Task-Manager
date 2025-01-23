import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

export const getTasks = async () => {
  return await axios.get(API_URL);
};
export const createTask = async (taskData) => {
  return await axios.post(API_URL, taskData);
};
export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const updateTask = async (id, taskData) => {
  return await axios.patch(`${API_URL}/${id}`, taskData);
};
export const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};