// Wait for the DOM to fully load before running any JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the HTML elements we'll need
  const inputBox = document.getElementById("input-box");
  const addButton = document.querySelector("button");
  const listContainer = document.getElementById("list-container");

  // 1. Add new tasks when clicking the Add button
  addButton.addEventListener("click", addTask);

  // 2. Also add tasks when pressing Enter in the input field
  inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Function to add a new task
  function addTask() {
    if (inputBox.value === "") {
      alert("You must write something!");
      return;
    }

    // Create new list item
    const li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    // Clear the input box
    inputBox.value = "";

    // Save the updated list to localStorage
    saveData();
  }

  // 3. Toggle tasks as checked/unchecked when clicking them
  listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    }
  });

  // 4. Add ability to remove tasks (right click)
  listContainer.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "LI") {
      e.preventDefault(); // Prevent the context menu from showing
      e.target.remove();
      saveData();
    }
  });

  // 5. Save tasks to localStorage
  function saveData() {
    localStorage.setItem("todoData", listContainer.innerHTML);
  }

  // 6. Load tasks from localStorage when page loads
  function loadData() {
    listContainer.innerHTML = localStorage.getItem("todoData") || "";
  }

  // Load saved tasks when the page starts
  loadData();
});
