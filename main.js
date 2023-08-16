let Attributes = document.getElementsByTagName("tbody"),
  count = document.getElementsByTagName("p");
async function fetchData(url) {
  return await fetch(url);
}
fetchData(" https://dummyjson.com/todos")
  .then((res) => res.json())
  .then((data) => {
    let rows = "";
    data.todos.forEach((element) => {
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
    count[0].textContent = `Total tasks: ${data.todos.length}`;
  });
