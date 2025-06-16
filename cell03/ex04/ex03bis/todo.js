// Helper: set cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

// Helper: get cookie
function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let c of cookieArr) {
    const [k, v] = c.trim().split('=');
    if (k === name) return decodeURIComponent(v);
  }
  return "";
}

function saveTodos(todos) {
  setCookie('todoList', JSON.stringify(todos), 365);
}

function loadTodos() {
  const cookie = getCookie('todoList');
  return cookie ? JSON.parse(cookie) : [];
}

function renderTodos(todos) {
  const $list = $('#ft_list');
  $list.empty(); // Clear existing list items
  
  // Use $.each for iterating over arrays
  $.each(todos, function(i, text) {
    const $div = $('<div>').addClass('todo').text(text);
    
    // Use .on() for event handling
    $div.on('click', function() {
      if (confirm("Do you want to delete this TO DO?")) {
        todos.splice(i, 1);
        saveTodos(todos);
        renderTodos(todos);
      }
    });
    $list.append($div); // Append to the list
  });
}

function newTodo() {
  const text = prompt("Enter your new TO DO:");
  if (text && text.trim().length > 0) {
    todos.unshift(text.trim());
    saveTodos(todos);
    renderTodos(todos);
  }
}

// Load on page ready with jQuery
let todos; // Declare todos here to make it accessible globally within this script

$(document).ready(function() {
  todos = loadTodos(); // Initialize todos when the DOM is ready
  renderTodos(todos);

  // Attach click event to the new button using jQuery
  $('#newTodoButton').on('click', newTodo);
});