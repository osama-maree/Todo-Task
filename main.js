let Attributes = document.getElementsByTagName("tbody"),
  count = document.getElementsByTagName("p"),
  input = document.getElementById("input"),
  addBtn = document.getElementById("addBtn"),
  Search = document.getElementById("search"),
  Todos=[],
  Temp = [];
 

function fetchData() {
  Todos = JSON.parse(localStorage.getItem("todos"));
  Temp = Todos;
  ShowTodo();
}
fetchData();
function ShowTodo() {
  rows = "";
  Todos?.forEach((element) => {
    rows += "<tr>";
    rows += `<td>${element.id}</td>`;
    rows += `<td style='${
      element.completed ? "text-decoration: line-through;" : ""
    }'>${
      element.edit
        ? `<input type="text" onkeyup="SaveChange(
            this.value,${element.id}
          )" value="${getValue(element.id)}" />`
        : element.todo
    }</td>`;
    rows += `<td style="cursor:pointer" onclick="ToggleEdit(${element.id})">${
      element.edit && !element.completed ? "Save" : "Edit"
    }</td>`;
    rows += `<td>${element.userId}</td>`;
    rows += `<td>${element.completed}</td>`;
    rows += `<td>  <button class="custom-button mb" onclick="DeleteTodo(${element.id})">Delete</button>
                   <button class="custom-button" style="background-color: #4CAF50;"onclick="DoneTodo(${element.id})">Done</button>
               </td>`;
    rows += "</tr>";
  });
  Attributes[0].innerHTML = rows;
  count[0].textContent = `Total tasks: ${Todos ? Todos.length : 0}`;
}
function DeleteTodo(id) {
  if (confirm("Are you sure?")) {
    Todos = Todos.filter((todo) => todo.id != id);
    localStorage.setItem("todos", JSON.stringify(Todos));
    fetchData();
  }
}
function DoneTodo(id) {
  Todos.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  });
  localStorage.setItem("todos", JSON.stringify(Todos));
  fetchData();
}
function ToggleEdit(id) {
  Todos.forEach((todo) => {
    if (todo.id === id && !todo.completed) {
      todo.edit = !todo.edit;
    }
  });
  localStorage.setItem("todos", JSON.stringify(Todos));
  fetchData();
}
function SaveChange(val, id) {
  Todos.forEach((todo) => {
    if (todo.id === id && !todo.completed) {
      todo.todo = val;
    }
  });
}
function getValue(id) {
  for (let i = 0; i < Todos.length; i++) {
    if (Todos[i].id === id && !Todos[i].completed) {
      return Todos[i].todo;
    }
  }
}
addBtn.onclick = function (e) {
  e.preventDefault();
  if (!input.value) {
    return alert("Please fill input");
  }
  const todo = {
    id: Todos && Todos.length > 0 ? Todos[Todos.length - 1].id + 1 : 0,
    userId: parseInt(Math.random() * (1000 - 1) + 1),
    edit: false,
    completed: false,
    todo: input.value,
  };
  Todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(Todos));
  fetchData();
};
Search.onkeyup = function () {
  Todos = Temp;
  Todos = Todos.filter((todo) =>
    todo.todo.toUpperCase().startsWith(Search.value.toUpperCase())
  );
  ShowTodo();
};
