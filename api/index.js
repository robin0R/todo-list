const express = require('express');
const cors = require('cors');
res.setHeader('Cache-Control', 'public, max-age=3600');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const tasks = [
  { id: 1, name: 'items 1' },
  { id: 2, name: 'items 2' },
  { id: 3, name: 'items 3' },
];

app.get('/api/getTask', (req, res) => {
  res.json(tasks);
});

app.post('/api/addTask', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).send('Le champ name est requis et doit être une chaîne de caractères non vide');
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    name
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/api/deleteTask/:id', (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).send('Un ID de tâche valide est requis');
  }

  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  if (taskIndex === -1) {
    return res.status(404).send('Tâche non trouvée');
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json(deletedTask);
});


app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3001');
});
