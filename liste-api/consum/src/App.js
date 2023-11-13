import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getTask');
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/addTask', { name: newTask });
      fetchTasks();
      setNewTask('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteTask/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  return (
    <div>
      <h1>Liste de tâches</h1>
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
