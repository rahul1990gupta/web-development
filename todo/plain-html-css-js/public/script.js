// Get the input element and the button element
const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');

// Get the todo list element
const todoList = document.getElementById('todo-list');


async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const todoListValue = await response.json();
      if (todoListValue.redirect) {
        window.location.href = todoListValue.redirect;
      }
      console.log(todoListValue);
  
      for (let i = 0; i < todoListValue.length; i++) {
        const newItem = document.createElement('li');
        newItem.innerHTML = `
        <span>${todoListValue[i].name}</span>
        <a href="#" class="edit-link">Edit</a>
        <a href="#" class="delete-link">Delete</a>
        <a href="#" class="complete-link">Mark Complete</a>`;

        // Edit functionality
        newItem.querySelector('.edit-link').addEventListener('click', function(event) {
            event.preventDefault();
            const newName = prompt('Enter new task name', todoListValue[i].name);
            if (newName) {
            newItem.querySelector('span').textContent = newName;
            // Here you can also update the task name in your backend
            fetch(`http://localhost:3000/tasks/${todoListValue[i].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                }),
            })
            }
        });

        // Delete functionality
        newItem.querySelector('.delete-link').addEventListener('click', function(event) {
            event.preventDefault();
            newItem.remove();
            // Here you can also delete the task from your backend
            console.log("deleting", todoListValue[i].id);
            fetch(`http://localhost:3000/tasks/${todoListValue[i].id}`, {
                method: 'DELETE',
            })
        });

        // Mark Complete functionality
        newItem.querySelector('.complete-link').addEventListener('click', function(event) {
            event.preventDefault();
            newItem.querySelector('span').style.textDecoration = 'line-through';
            // Here you can also update the task status in your backend
            fetch(`http://localhost:3000/tasks/${todoListValue[i].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'complete',
                }),
            })
        });
        todoList.appendChild(newItem);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
fetchTasks();

// Function to add a new item to the todo list
function addItem() {
    // Get the value from the input field
    const newItemText = input.value;

    // Create a new list item element
    const newItem = document.createElement('li');
    newItem.innerHTML = `
    <span>${newItemText}</span>
    <a href="#" class="edit-link">Edit</a>
    <a href="#" class="delete-link">Delete</a>
    <a href="#" class="complete-link">Mark Complete</a>`;

    // Append the new item to the todo list
    todoList.appendChild(newItem);

    // Clear the input field
    input.value = '';

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newItemText,
            status: 'open',
        }),
    })
    .then(response => response.json())
    .then(data => {
          console.log(data)
        }
    )
    .catch((error) => console.error('Error:', error));

}

// Add event listener to the button
addButton.addEventListener('click', addItem);
