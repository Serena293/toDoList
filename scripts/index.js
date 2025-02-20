const calendario = document.getElementById("calendario");
const taskInput = document.getElementById("task-input");
const dataInput = document.getElementById("data-input");
const monthName = document.getElementById("month-name");
const calendarGrid = document.getElementById("calendar-grid");
const saveBtn = document.getElementById("save-btn");
const sectionOne = document.getElementById("section-one");
const sectionTwo = document.getElementById("section-two");
const taskContainer = document.getElementById("task-container");

const now = new Date();

const monthNames = [
  "Gennaio", // 0
  "Febbraio", // 1
  "Marzo", // 2
  "Aprile", // 3
  "Maggio", // 4
  "Giugno", // 5
  "Luglio", // 6
  "Agosto", // 7
  "Settembre", // 8
  "Ottobre", // 9
  "Novembre", // 10
  "Dicembre", //11
];

const daysOfTheWeek = [
 
  "Lun",
  "Mar",
  "Mer",
  "Gio",
  "Ven",
  "Sab",
   "Dom",
]

const getMonth = () => {
  const monthIndex = now.getMonth();
  const currentMonth = monthNames[monthIndex];

  const prevArrow = document.createElement("span");
  prevArrow.innerHTML = "&larr;";
  prevArrow.classList.add("prev-arrow");

  const nextArrow = document.createElement("span");
  nextArrow.innerHTML = "&rarr;";
  nextArrow.classList.add("next-arrow");

  const monthTitle = document.createElement("h3");
  monthTitle.classList.add("tasks-title");
  monthTitle.innerText = `${currentMonth} ${now.getFullYear()}`;

  prevArrow.addEventListener("click", () => changeMonth(-1));
  nextArrow.addEventListener("click", () => changeMonth(1));

  monthName.appendChild(prevArrow);
  monthName.appendChild(monthTitle);
  monthName.appendChild(nextArrow);
};

const changeMonth = (m) => {
  now.setMonth(now.getMonth() + m);

  const monthIndex = now.getMonth();
  const currentMonth = monthNames[monthIndex];
  const monthTitle = document.querySelector("h3.tasks-title");

  if (monthTitle) {
    monthTitle.innerText = `${currentMonth} ${now.getFullYear()}`;
    generaCalendario();
  }
  console.log(monthTitle);
};

const showDetails = () => {

}

const generaCalendario = () => {
  calendarGrid.innerHTML = "";

  const today = now.getDate()

// console.log(today)  
  
  daysOfTheWeek.forEach(day =>  {
    const divWeekDay = document.createElement("div");
    divWeekDay.classList.add("weekday")
    divWeekDay.textContent = day;
    calendarGrid.appendChild(divWeekDay);
  })
  
  const firstDayIndex = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

  for(let i = 0; i<firstDayIndex; i++){
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty-day");
    calendarGrid.appendChild(emptyDiv);

  }
   //genera una data con num di giorni e anno
  const daysOfTheMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  //console.log(daysOfTheMonth);
  const numGiorni = daysOfTheMonth.getDate();
  //console.log(numGiorni);

  for (let i = 0; i < numGiorni; i++) {
    const divDay = document.createElement("div");
    divDay.classList.add("day-container");
    divDay.textContent = i + 1;
    calendarGrid.appendChild(divDay);

  if(parseInt(divDay.textContent) === today){
    divDay.classList.add("today")
  }

  }

};

const createTaskTitle = () => {
  const titleTask = document.createElement("h4");
  titleTask.classList.add("tasks-title");
  titleTask.textContent = "Tasks";
  sectionOne.appendChild(titleTask);
};

const printTitle = () => {
  const existingTitle = document.querySelector("h4.tasks-title");
  if (!existingTitle) {
    createTaskTitle();
  }
};

const displayTasks = () => {
  taskContainer.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length > 0) {
    printTitle();
  }

  tasks.forEach((task, index) => {
    createDivTask(task.text, task.date, index);
  });
};

const deleteTask = (index) => {
  // e.target.closest("div").remove(); //senza local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();

  if (tasks.length === 0) {
    const existingTitle = document.querySelector("h4.tasks-title");
    if (existingTitle) existingTitle.remove();
  }
};

const doneTask = (e) => {
  const taskTextElement = e.target.closest(".task-div").querySelector("p");
  taskTextElement.classList.toggle("cross");
};

const saveTask = (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskDate = dataInput.value;

  if (taskText === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, date: taskDate });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createDivTask(taskText, taskDate, tasks.length - 1);

  printTitle();

  taskInput.value = "";
};

const createDivTask = (taskText, taskDate, index) => {
  const divTask = document.createElement("div");
  divTask.classList.add("task-div");

  const taskTextElement = document.createElement("p");
  taskTextElement.textContent = taskText + " " + taskDate;
  divTask.appendChild(taskTextElement);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-task");
  deleteBtn.innerText = "Delete";
  divTask.appendChild(deleteBtn);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("btn-task");
  doneBtn.innerText = "Done";
  divTask.append(doneBtn);

  taskContainer.appendChild(divTask);

  doneBtn.addEventListener("click", doneTask);
  deleteBtn.addEventListener("click", () => deleteTask(index));
};

getMonth();
generaCalendario();
displayTasks();
printTitle();
saveBtn.addEventListener("click", saveTask);
