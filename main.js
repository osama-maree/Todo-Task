let Attributes = document.getElementsByTagName("tbody"),
  count = document.getElementsByTagName("p"),
  input = document.getElementById("input"),
  addBtn = document.getElementById("addBtn"),
  Search = document.getElementById("search");
let Todos,
  Temp = [];
async function fetchData(url) {
  return await fetch(url);
}
fetchData("https://dummyjson.com/todos")
  .then((res) => res.json())
  .then((data) => {
    Todos = data?.todos;
    Temp = data.todos;
    ShowTodo();
  });
// for adding new task
function ShowTodo() {
  rows = "";
  Todos.forEach((element) => {
    rows += "<tr>";
    rows += `<td>${element.id}</td>`;
    rows += `<td>${element.todo}</td>`;
    rows += `<td>${element.userId}</td>`;
    rows += `<td>${element.completed}</td>`;
    rows += `<td>  <button class="custom-button mb">Delete</button>
                     <button class="custom-button" style="background-color: #4CAF50;">Done</button>
               </td>`;
    rows += "</tr>";
  });
  Attributes[0].innerHTML = rows;
  count[0].textContent = `Total tasks: ${Todos.length}`;
}
async function PostTodo(url) {
  const data = { id: 10000, userId: 4, completed: false, todo: input.value };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
    },
    body: JSON.stringify(data),
  });
}
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("dd");
  PostTodo("https://dummyjson.com/todos/add")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("Response data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
