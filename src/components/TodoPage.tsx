/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));
  

  const [newTask, setNewTask] = useState("");

  const handleCreateTask = async () => {
    if (!newTask.trim()) return;
    try {
      await api.post("/tasks", { name: newTask });
      setNewTask(""); // Réinitialiser le champ après ajout
      await handleFetchTasks(); // Recharger les tâches après ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche", error);
    }
  };


  

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks(); // Recharge les tâches après suppression
      console.log('Tache supprimée');
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche", error);
    }
  };
  
  const [editedTasks, setEditedTasks] = useState<{ [key: number]: string }>({});

  const handleSave = async (id: number) => {
    // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    if (editedTasks[id]?.trim() === "") return;
    try {
      await api.patch(`/tasks/${id}`, { name: editedTasks[id] });
      setEditedTasks({ ...editedTasks, [id]: "" }); // Réinitialiser le champ après modification
      await handleFetchTasks(); // Recharger les tâches
    } catch (error) {
      console.error("Erreur lors de la modification de la tâche", error);
    }

  }

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">Abdelouakil Kerraf - HDM Todo List</Typography>
      </Box>
      <Typography variant="h6" align="center" mt={2}>
        Nombre de tâches : {tasks.length}
      </Typography>

      
      <Box justifyContent="center" mt={5} flexDirection="column">
        {
          tasks.filter((task) => task.name.toLowerCase().includes(search.toLowerCase())).map((task) => (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
              <TextField size="small" value={editedTasks[task.id] || task.name} fullWidth sx={{ maxWidth: 350 }} onChange={(e) => setEditedTasks({ ...editedTasks, [task.id]: e.target.value })}/>
              <Box>
                <IconButton color="success" onClick={() => handleSave(task.id)} disabled={!editedTasks[task.id] || editedTasks[task.id] === task.name}>
    	            <Check />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        }

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nouvelle tâche"
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={()=>handleCreateTask()}>Ajouter une tâche</Button>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            label="Rechercher une tâche"
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 350, margin: "auto", mt: 2 }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default TodoPage;
