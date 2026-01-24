const output = document.getElementById("output");
document.getElementById("addTaskButton").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value;
  if (taskText !== "") {
    taskInput.value = "";

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const span = document.createElement("span");
    span.textContent = taskText;
    const rmButton = document.createElement("button");
    rmButton.textContent = "Remove";

    output.appendChild(li);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(rmButton);

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
    });

    rmButton.addEventListener("click", function () {
      output.removeChild(li);
    });

  } else {
    alert("Please enter a task.");
  }
});
