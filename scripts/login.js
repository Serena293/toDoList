import { getMonth, changeMonth, generaCalendario } from "./calendar.js";

const monthName = document.getElementById("month-name");
const calendarGrid = document.getElementById("calendar-grid");

// Ensure elements exist before using them
if (monthName && calendarGrid) {
  getMonth(monthName, (m) => changeMonth(m, calendarGrid, monthName));
  generaCalendario(calendarGrid);
} else {
  console.error("Calendar elements not found on the page!");
}
