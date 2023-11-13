import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [backendUrl, setBackendUrl] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://${backendUrl}/api/getTask`);
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://${backendUrl}/api/addTask`, { name: newTask });
      fetchTasks();
      setNewTask('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://${backendUrl}/api/deleteTask/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  return (
    <div>
      <h1>Liste de tâches</h1>
      <div>
        <label htmlFor="backendUrl">URL du backend :</label>
        <input
          type="text"
          id="backendUrl"
          value={backendUrl}
          onChange={(e) => setBackendUrl(e.target.value)}
        />
      </div>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name} <button onClick={() => deleteTask(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
