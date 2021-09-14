let todos = [
  {
    id: "1",
    todo: "Buy Milk",
    complete: true,
  },
  {
    id: "2",
    todo: "Buy Apple",
    complete: false,
  },
];
let filterMode = "all";
document.addEventListener("DOMContentLoaded", function (event) {
  var todoInput = document.getElementById("todoInput");
  var todoList = document.getElementById("todoList");
  var todoCount = document.getElementById("todoCount");
  var filterBtns = document.querySelectorAll(".todo-filter");

  console.log(filterBtns);
  function addTodo(todo) {
    var newTodo = buildTodo(todo);
    todoList.appendChild(newTodo);
  }

  function submitTodo(event) {
    if (event.charCode === 13) {
      if (event.target.value.trim().length !== 0) {
        const todo = {
          todo: event.target.value,
          complete: false,
          id: Math.floor(Math.random() * 1000).toString(),
        };
        todos.push(todo);
        addTodo(todo);
        updateCount();
        todoInput.value = "";
      }
    }
  }

  function updateTodo(event) {
    const checked = event.target.checked;
    var todoId =
      event.target.parentElement.parentElement.getAttribute("data-todoid");
    todos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.complete = checked;
      }
      return todo;
    });
    updateCount();
  }

  function removeTodo(event) {
    var todoId = event.target.parentElement.getAttribute("data-todoid");
    todos = todos.filter((todo) => todo.id !== todoId);
    initTodo();
  }

  todoInput.addEventListener("keypress", submitTodo);

  function initTodo() {
    let visibleTodos = todos;
    if (filterMode === "complete") {
      visibleTodos = todos.filter((todo) => todo.complete === true);
    }
    if (filterMode === "incomplete") {
      visibleTodos = todos.filter((todo) => todo.complete === false);
    }
    todoList.innerHTML = "";
    visibleTodos.forEach(function (todo) {
      addTodo(todo);
    });
    updateCount();
  }

  function showCloseIcon(event) {
    var closeIcon = event.target.childNodes[1];
    closeIcon.style.display = "block";
  }

  function hideCloseIcon(event) {
    var closeIcon = event.target.childNodes[1];
    closeIcon.style.display = "none";
  }

  function buildTodo(todo) {
    var li = document.createElement("li");
    li.setAttribute("class", `todo-item todo-item-${todo.id}`);
    li.setAttribute("data-todoId", todo.id);

    var radio = document.createElement("input");
    radio.setAttribute("type", "checkbox");
    radio.setAttribute("class", "todo-item-radio");
    radio.addEventListener("click", updateTodo);
    if (todo.complete) {
      radio.setAttribute("checked", todo.complete);
    }

    var label = document.createElement("label");
    label.appendChild(radio);
    label.append(todo.todo);

    var closeIcon = document.createElement("p");
    closeIcon.setAttribute("class", "close-icon");
    closeIcon.innerHTML = "X";
    closeIcon.style.display = "none";
    closeIcon.addEventListener("click", removeTodo);

    li.appendChild(label);
    li.appendChild(closeIcon);
    li.addEventListener("mouseenter", showCloseIcon);
    li.addEventListener("mouseleave", hideCloseIcon);
    return li;
  }

  function updateCount() {
    var unCompletedCount = todos.filter((todo) => todo.complete === false);
    todoCount.innerHTML = `${unCompletedCount.length} of ${todos.length}`;
  }

  function updateFilter(event) {
    var oldFilter = document.querySelectorAll(
      `button[data-value='${filterMode}']`
    );
    oldFilter[0].classList.remove("active");
    filterMode = event.target.getAttribute("data-value");
    event.target.classList.add("active");
    initTodo();
  }

  filterBtns.forEach((el) => el.addEventListener("click", updateFilter));

  initTodo();
});
