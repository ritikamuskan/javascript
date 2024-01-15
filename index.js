let form = document.getElementById("form");
let textinput = document.getElementById("textInput");
let dateinput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let task = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];
let acceptData = () => {
  data.push({
    text: textinput.value,
    date: dateinput.value,
    textarea: textarea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
};

let createTasks = () => {
  task.innerHTML = "";
  data.map((x, y) => {
    return (task.innerHTML += `
        <div id=${y}>
        <span class='fw-bold'>${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.textarea}</p>

          <span class="options">
          <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
        </span>
        </div>`);
  });
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};
let editTask = (e) => {
  let select = e.parentElement.parentElement;
  textinput.value = select.children[0].innerHTML;
  dateinput.value = select.children[1].innerHTML;
  textarea.value = select.children[2].innerHTML;
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
})();
