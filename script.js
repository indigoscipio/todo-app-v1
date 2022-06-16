let form = document.querySelector(".todo__form");
let todoList = document.querySelector(".todo__list");
let labels = document.getElementsByClassName("label");
let btnThemeSwitcher = document.querySelector(".header__theme-switcher");
let toggleSwitch = document.querySelector("#switch-checkbox");
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

  if (todo.deleted) {
    item.remove();
    return;
  }
  const node = document.createElement("li");

  node.setAttribute("data-key", todo.id);

  node.innerHTML = `
    <label class="label" for="${todo.id}">
      <input id="${todo.id}" class="checkbox" type="checkbox"  />
      <span onclick="event.stopPropagation()" class="text"> ${todo.text}</span>
    </label>
    <button class="icon-close">
      <img src="images/icon-cross.svg" alt="" />
    </button>`;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

//form validation
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

//set item id to li
todoList.addEventListener("click", (e) => {
  if (e.target.parentNode.classList.contains("label")) {
    let itemKey = e.target.parentElement.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  if (e.target.parentNode.classList.contains("icon-close")) {
    let itemKey = e.target.parentElement.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

// delete todo;
function deleteTodo(key) {
  let index = todoItems.findIndex((item) => item.id === Number(key));
  let todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}

//toggle done todoItems
function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  console.log(index);
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}
toggleSwitch.addEventListener("change", switchTheme, false);
