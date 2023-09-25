// Initialize the list from local storage or start with an empty list
var newList = JSON.parse(localStorage.getItem('newList')) || [];

// Populate the initial list from local storage
function loadTodos() {
    newList.forEach(todo => {
        addTodo(todo.text, todo.completed);
    });
}

// Function to add a todo
function addTodo(text, completed = false) {
    const newListItem = document.createElement("li");
    newListItem.classList.add("Todo");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("custom-checkbox");
    checkbox.checked = completed;

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            newListItem.classList.add("crossed-out");
        } else {
            newListItem.classList.remove("crossed-out");
        }
        saveTodos(); // Save the updated state to local storage
    });

    const label = document.createElement("label");
    const todoTextSpan = document.createElement("span");
    todoTextSpan.textContent = text;
    label.appendChild(checkbox);
    label.appendChild(todoTextSpan);

    newListItem.appendChild(label);

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    newListItem.appendChild(removeButton);

    todoList.appendChild(newListItem);

    // Check if the todo is completed and apply the crossed-out class
    if (completed) {
        newListItem.classList.add("crossed-out");
    }

    // Event listener for the "Remove" button
    removeButton.addEventListener("click", function() {
        todoList.removeChild(newListItem);
        saveTodos();
    });
}

const formElement = document.querySelector("form");
const todoList = document.querySelector("ul");
const taskInput = document.querySelector("#taskInput");

formElement.addEventListener("submit", function(event) {
    event.preventDefault();

    const newTask = taskInput.value.trim();
    if (newTask) {
        addTodo(newTask);
        taskInput.value = "";
        saveTodos();
    } else {
        console.log("Please enter a task.");
    }
});

// Save the current state of the todo list to local storage
function saveTodos() {
    newList = [];
    document.querySelectorAll("li.Todo").forEach(li => {
        newList.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector(".custom-checkbox").checked
        });
    });
    localStorage.setItem('newList', JSON.stringify(newList));
}

// Load the initial todos when the page loads
loadTodos();
