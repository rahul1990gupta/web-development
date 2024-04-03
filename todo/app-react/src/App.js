import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const addTodo = () => {
    const newTodo = { name: input, status: 'open' };
    axios.post('http://localhost:3001/tasks', newTodo)
      .then(response => {
        console.log(response.data);
        setTodos([...todos, response.data]);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    setInput('');
  };

  const editTodo = (id) => {
    const newTodoName = prompt('Enter new todo name');
    axios.put(`http://localhost:3001/tasks/${id}`, { name: newTodoName })
      .then(response => {
        setTodos(todos.map(todo => todo.id === id ? {id: id, name: newTodoName} : todo));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.key !== id));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  
  const markComplete = (id) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, { status: 'complete' })
      .then(response => {
        setTodos(todos.map(todo => todo.key === id ? response.data : todo));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='container'>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} id={todo.id} >
            {todo.name}
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => markComplete(todo.id)}>
              { /*todo.status === 'open' ? 'Mark Complete' : 'Mark Incomplete' */} 
              Mark Complete
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;