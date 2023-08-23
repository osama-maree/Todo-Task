let Attributes = document.getElementsByTagName("tbody"),
  count = document.getElementsByTagName("p"),
  input = document.getElementById("input"),
  addBtn = document.getElementById("addBtn"),
  Search = document.getElementById("search"),
  Todos,
  Temp = [];

function fetchData() {
  Todos = JSON.parse(localStorage.getItem("todos"));
  Temp = Todos;
  ShowTodo();
}
fetchData();
function ShowTodo() {
  rows = "";
  Todos.forEach((element) => {
    rows += "<tr>";
    rows += `<td>${element.id}</td>`;
    rows += `<td style='${
      element.completed ? "text-decoration: line-through;" : ""
    }'>${element.todo}</td>`;
    rows += `<td>${element.userId}</td>`;
    rows += `<td>${element.completed}</td>`;
    rows += `<td>  <button class="custom-button mb" onclick="DeleteTodo(${element.id})">Delete</button>
                   <button class="custom-button" style="background-color: #4CAF50;"onclick="DoneTodo(${element.id})">Done</button>
               </td>`;
    rows += "</tr>";
  });
  Attributes[0].innerHTML = rows;
  count[0].textContent = `Total tasks: ${Todos.length}`;
}
function DeleteTodo(id) {
  Todos = Todos.filter((todo) => todo.id != id);
  localStorage.setItem("todos", JSON.stringify(Todos));
  fetchData();
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
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!input.value) {
    return alert("Please fill input");
  }
  const todo = {
    id: Todos.length > 0 ? Todos[Todos.length - 1].id + 1 : 0,
    userId: parseInt(Math.random() * (1000 - 1) + 1),
    completed: false,
    todo: input.value,
  };
  Todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(Todos));
  fetchData();
});
Search.onkeyup = function () {
  if (!Search.value) {
    Todos = Temp;
    ShowTodo();
    return;
  }
  Todos = Todos.filter((todo) =>
    todo.todo.toUpperCase().startsWith(Search.value.toUpperCase())
  );
  ShowTodo();
};
