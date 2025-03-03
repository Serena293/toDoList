import { getMonth, changeMonth, generaCalendario, monthNames, now, today, currentMonth, currentYear } from "./calendar.js";

const renderPage = () => {

const calendario = document.getElementById("calendario");
const taskInput = document.getElementById("task-input");
const dataInput = document.getElementById("data-input");
const monthName = document.getElementById("month-name");
const calendarGrid = document.getElementById("calendar-grid");
const saveBtn = document.getElementById("save-btn");
const sectionOne = document.getElementById("section-one");
const sectionTwo = document.getElementById("section-two");
const taskContainer = document.getElementById("task-container");

//Arry per contenere tasks e date
let tasks = [];

// const now = new Date();
// const today = now.getDate();
// const currentMonth = now.getMonth();
// const currentYear = now.getFullYear();

// const monthNames = [
//   "Gennaio", // 0
//   "Febbraio", // 1
//   "Marzo", // 2
//   "Aprile", // 3
//   "Maggio", // 4
//   "Giugno", // 5
//   "Luglio", // 6
//   "Agosto", // 7
//   "Settembre", // 8
//   "Ottobre", // 9
//   "Novembre", // 10
//   "Dicembre", //11
// ];

// const daysOfTheWeek = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

//todo: salvare anche la data nel local storage, e associarle ad una data del calendario
//   const getMonth = () => {
//   const monthIndex = now.getMonth();
//   const currentMonth = monthNames[monthIndex];

//   const prevArrow = document.createElement("span");
//   prevArrow.innerHTML = "&larr;";
//   prevArrow.classList.add("prev-arrow");

//   const nextArrow = document.createElement("span");
//   nextArrow.innerHTML = "&rarr;";
//   nextArrow.classList.add("next-arrow");

//   const monthTitle = document.createElement("h3");
//   monthTitle.classList.add("tasks-title");
//   monthTitle.innerText = `${currentMonth} ${now.getFullYear()}`;

//   prevArrow.addEventListener("click", () => changeMonth(-1));
//   nextArrow.addEventListener("click", () => changeMonth(1));

//   monthName.appendChild(prevArrow);
//   monthName.appendChild(monthTitle);
//   monthName.appendChild(nextArrow);
// };

// const changeMonth = (m) => {
//   now.setMonth(now.getMonth() + m);

//   const monthIndex = now.getMonth();
//   const currentMonth = monthNames[monthIndex];
//   const monthTitle = document.querySelector("h3.tasks-title");

//   if (monthTitle) {
//     monthTitle.innerText = `${currentMonth} ${now.getFullYear()}`;
//     generaCalendario();
//   }
// };

const addDot = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  document.querySelectorAll(".day-container").forEach((divDay) => {
    const dayDate = divDay.getAttribute("data-date");

    // Check if any task exists for this date
    if (tasks.some((task) => task.date === dayDate)) {
      let dot = divDay.querySelector(".dot");
      if (!dot) {
        dot = document.createElement("span");
        dot.classList.add("dot");
        divDay.appendChild(dot);
      }
    }
  });
};

const showDetails = (e) => {
  console.log("in showDetails: ", tasks);

  const selectedDate = e.target.getAttribute("data-date");
  // console.log(selectedDate)
  if (!selectedDate) return;

  // console.log("prima del filtro: ",tasks)
  const tasksForDate = tasks.filter((task) => task.date === selectedDate);
  // console.log("consol log dopo il filtro: ",tasksForDate)

  if (tasksForDate.length === 0) return;
  if (tasksForDate.length > 0) {
    tasksForDate.forEach((task) => {
      const divDetails = document.createElement("div");
      divDetails.classList.add("div-details");

      const taskList = tasksForDate
        .map((task) => `<li>${task.text}</li>`)
        .join("");

      divDetails.innerHTML = `
     <h4>Tasks for ${selectedDate}</h4>
     <ul>
     testo di prova:
     ${taskList}
     </ul>
     <button id="close-modal">Chiudi</button>
     `;

      document.body.appendChild(divDetails);
      const closeBtn = document.getElementById("close-modal");
      closeBtn.addEventListener("click", () => {
        divDetails.remove();
      });
    });
  }
};


// const generaCalendario = () => {
 
//   calendarGrid.innerHTML = "";

//   daysOfTheWeek.forEach((day) => {
//     const divWeekDay = document.createElement("div");
//     divWeekDay.classList.add("weekday");
//     divWeekDay.textContent = day;
//     calendarGrid.appendChild(divWeekDay);
//   });

//   const firstDayIndex = new Date(now.getFullYear(), now.getMonth(), 0).getDay();

//   for (let i = 0; i < firstDayIndex; i++) {
//     const emptyDiv = document.createElement("div");
//     emptyDiv.classList.add("empty-day");
//     calendarGrid.appendChild(emptyDiv);
//   }

//   //genera una data che corrisponde all'ultimo giorno del mese corrente
//   const daysOfTheMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//   const numGiorni = daysOfTheMonth.getDate();
//   //console.log(numGiorni);

//   for (let i = 0; i < numGiorni; i++) {
//     const day = i + 1;
//     const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(
//       2,
//       "0"
//     )}-${String(day).padStart(2, "0")}`;

//     const divDay = document.createElement("div");
//     divDay.classList.add("day-container");
//     divDay.textContent = i + 1;
//     divDay.setAttribute("data-date", formattedDate);
//     divDay.setAttribute("data-month", now.getMonth());
//     divDay.setAttribute("data-year", now.getFullYear());
//     divDay.addEventListener("click", showDetails);

//     calendarGrid.appendChild(divDay);

//     document.querySelectorAll(".day-container").forEach((divDay) => {
//       const day = parseInt(divDay.textContent);
//       const month = parseInt(divDay.getAttribute("data-month"));
//       const year = parseInt(divDay.getAttribute("data-year"));

//       if (day === today && month === currentMonth && year === currentYear) {
//         divDay.classList.add("today");
//       }
//     });
//   }
 
// };

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
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

  renderPage()
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

  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, date: taskDate });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createDivTask(taskText, taskDate, tasks.length - 1);

  printTitle();

  taskInput.value = "";
  // console.log("task salvate tamite saveTaks: ",tasks)

  renderPage();
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

if (monthName && calendarGrid) {
  getMonth(monthName, (m) => changeMonth(m, calendarGrid, monthName));
  generaCalendario(calendarGrid, showDetails);
} else {
  console.error("Calendar elements not found on the page!");
}

// getMonth();
// generaCalendario();
displayTasks();
printTitle();
addDot();
saveBtn.addEventListener("click", saveTask);

}
renderPage()
