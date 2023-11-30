const todoInput = document.querySelector('.text');
const todoButton = document.querySelector('.push');
const todoList = document.querySelector('.block');

todoButton.addEventListener("click", addblock);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addblock(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);
    if(todoInput.value === ""){
        return null;
    }

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check"></i>';  //галка
    completedButton.classList.add('complete_btn')
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';      //мусор
    deleteButton.classList.add('delete_btn')
    todoDiv.appendChild(deleteButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = ""
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "delete_btn") {
        const todo = item.parentElement;
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    if (item.classList[0] === "complete_btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completedItem")
    }
}

//НЕ РАБОТАЕТ!!!
window.onunload = function() {
    let items = document.getElementsByClassName("text");
    let item_txt = Array();

    for (let i = 0; i < items.length; i++) {
        items[i].blur();
        item_txt.push(items[i].textContent);
    }

    localStorage.setItem("todo_items", JSON.stringify(item_txt));
}
window.onload = function() {
    let items = localStorage.getItem("todo_items");
    item_txt = JSON.parse(items);

    for (let i = 0; i < item_txt.length; i++) {
        todoInput = item_txt[i];
        addblock();
    }
}