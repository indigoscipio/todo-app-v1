let form = document.querySelector(".todo__form");
let todoList = document.querySelector(".todo__list");
let labels = document.getElementsByClassName("label");
let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
  console.log(todoItems);
}

function renderTodo(todo) {
  const list = document.querySelector(".todo__list");
  const item = document.querySelector(`[data-key='${todo.id}']`);
  const node = document.createElement("li");
  const isChecked = todo.checked ? "done" : "";

  node.setAttribute("class", `${isChecked}`);
  node.setAttribute("data-key", todo.id);

  node.innerHTML = `
    <label for="${todo.id}" class="label">
        <input onclick="event.stopPropagation()" id="${todo.id}" type="checkbox" />
        <span class="checkbox-custom">
        ${todo.text}</span>
    </label>
    <button class="icon-close">
        <img src="images/icon-cross.svg" alt="" />
    </button>`;

  // If the item already exists in the DOM
  if (item) {
    // replace it
    list.replaceChild(node, item);
  } else {
    // otherwise append it to the end of the list
    list.append(node);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let input = document.querySelector("#todo-input");
  let text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
  console.log(input.value);
});

todoList.addEventListener("click", (e) => {
  if (e.target.parentNode.classList.contains("label")) {
    let itemKey = e.target.parentElement.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  // Locate the todo item in the todoItems array and set its checked
  // property to the opposite. That means, `true` will become `false` and vice
  // versa.

  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}
