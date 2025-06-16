function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
}

const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('new-btn');

function saveTodos() {
    const todos = [];
    for (let i = 0; i < ft_list.children.length; i++) {
        todos.push(ft_list.children[i].textContent);
    }
    setCookie('todo_list', JSON.stringify(todos.reverse()), 365);
}

function loadTodos() {
    const data = getCookie('todo_list');
    if (data) {
        try {
            const todos = JSON.parse(data);
            todos.forEach(text => addTodo(text, false));
        } catch {}
    }
}

function addTodo(text, save = true) {
    if (!text) return;
    const div = document.createElement('div');
    div.className = 'todo';
    div.textContent = text;
    div.onclick = function() {
        if (confirm('Do you want to remove this TO DO?')) {
            ft_list.removeChild(div);
            saveTodos();
        }
    };
    ft_list.appendChild(div);
    if (save) saveTodos();
}

newBtn.onclick = function() {
    const text = prompt('Enter a new TO DO:');
    if (text && text.trim() !== '') {
        addTodo(text.trim());
    }
};

loadTodos();