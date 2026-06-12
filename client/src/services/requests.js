import API from './api';

// auth calls
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// task calls
export const getTasks = () => API.get('/tasks');
export const createTask = (data) => API.post('/tasks', data);
export const toggleTask = (id) => API.patch(`/tasks/${id}`);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
