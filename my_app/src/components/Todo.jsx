// src/components/Todo.jsx
import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import '../styles/todo.css'; // Import the custom styles

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('0'); // Default priority: 0 (Not important)

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    // Fetch tasks from the backend (to be implemented in server.js)
    const response = await fetch('http://localhost:5001/todos');
    const data = await response.json();
    setTasks(data);
  };

  const handleNewTask = async () => {
    if (!newTask) return;
    const task = { task: newTask, priority_id: priority };
    // Add task to the backend
    await fetch('http://localhost:5001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    setNewTask(''); // Clear input
    fetchTasks(); // Refresh the task list
  };

  const updateTaskStatus = async (taskId, status) => {
    await fetch(`http://localhost:5001/todos/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status_id: status }),
    });
    fetchTasks(); // Refresh the task list
  };

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:5001/todos/${taskId}`, {
      method: 'DELETE',
    });
    fetchTasks(); // Refresh the task list
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <input
          type="text"
          placeholder="New Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="0" style={{ color: 'green' }}>Not Important</option>
          <option value="1" style={{ color: 'yellow' }}>Important</option>
          <option value="2" style={{ color: 'red' }}>Very Important</option>
        </select>
        <button onClick={handleNewTask}>+ New Task</button>
      </div>

      <div className="todo-lists">
        <div className="todo-incomplete">
          <h3>Incomplete</h3>
          {tasks.filter(task => task.status_id === 0).map(task => (
            <div key={task.id} className="todo-item">
              <p>{task.task}</p>
              <button onClick={() => updateTaskStatus(task.id, 1)}>Start</button>
              <AiFillDelete onClick={() => updateTaskStatus(task.id, 4)} />
            </div>
          ))}
        </div>

        <div className="todo-inprogress">
          <h3>In Progress</h3>
          {tasks.filter(task => task.status_id === 1).map(task => (
            <div key={task.id} className="todo-item">
              <p>{task.task}</p>
              <input
                type="checkbox"
                onChange={() => updateTaskStatus(task.id, 2)}
              />
              <AiFillDelete onClick={() => updateTaskStatus(task.id, 4)} />
            </div>
          ))}
        </div>

        <div className="todo-completed">
          <h3>Completed</h3>
          {tasks.filter(task => task.status_id === 2).map(task => (
            <div key={task.id} className="todo-item">
              <p>{task.task}</p>
              <AiFillDelete onClick={() => deleteTask(task.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;