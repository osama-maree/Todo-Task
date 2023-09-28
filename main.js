
let attributes = document.getElementsByTagName("tbody"),
  countTask = document.getElementsByTagName("p"),
  inputTask = document.getElementById("input"),
  addBtn = document.getElementById("addBtn"),
  searchTask = document.getElementById("search"),
  todos,
  temp = [],
  inpEdit = "";
function showTodo() {
  rows = "";
  todos?.forEach((element) => {
    rows += "<tr>";
    rows += `<td>${element.id}</td>`;
    rows += `<td style='${
      element.completed ? "text-decoration: line-through;" : ""
    }'>${
      element.edit
        ? `<input type="text" onkeyup="saveChange(
            this.value,${element.id}
          )" value="${getValue(element.id)}" />`
        : element.todo
    }</td>`;
    rows += `<td style="cursor:pointer" onclick="toggleEdit(${element.id})">${
      element.edit && !element.completed ? "Save" : "Edit"
    }</td>`;
    rows += `<td>${element.userId}</td>`;
    rows += `<td>${element.completed}</td>`;
    rows += `<td>  <button class="custom-button mb" onclick="deleteTodo(${element.id})">Delete</button>
                   <button class="custom-button" style="background-color: #4CAF50;"onclick="doneTodo(${element.id})">Done</button>
               </td>`;
    rows += "</tr>";
  });
  attributes[0].innerHTML = rows;
  countTask[0].textContent = `Total tasks: ${todos.length}`;
}
function fetchData() {
  todos = JSON.parse(localStorage.getItem("todos"));
  temp = todos;
  showTodo();
}
fetchData();

function deleteTodo(id) {
  if (confirm("Are you sure?")) {
    todos = todos.filter((todo) => todo.id != id);
    localStorage.setItem("todos", JSON.stringify(todos));
    fetchData();
  }
}
function doneTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  fetchData();
}
function toggleEdit(id) {
  todos.forEach((todo) => {
    if (todo.id === id && !todo.completed) {
      todo.edit = !todo.edit;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  fetchData();
}
function saveChange(val, id) {
  todos.forEach((todo) => {
    if (todo.id === id && !todo.completed) {
      todo.todo = val;
    }
  });
}
function getValue(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id && !todos[i].completed) {
      return todos[i].todo;
    }
  }
}
addBtn.onclick = function (e) {
  e.preventDefault();
  if (!inputTask.value) {
    return alert("Please fill input");
  }
  const todo = {
    id: todos?.length > 0 ? todos[todos.length - 1].id + 1 : 0,
    userId: parseInt(Math.random() * (1000 - 1) + 1),
    edit: false,
    completed: false,
    todo: inputTask.value,
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  inputTask.value = "";
  fetchData();
};
searchTask.onkeyup = function () {
  todos = temp;
  todos = todos.filter((todo) =>
    todo.todo.toUpperCase().startsWith(searchTask.value.toUpperCase())
  );
  showTodo();
};

