// calendar.js


export const monthNames = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];
  
  export const daysOfTheWeek = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
  
 export  const now = new Date();
 export const today = now.getDate();
 export const currentMonth = now.getMonth();
 export const currentYear = now.getFullYear();


export const getMonth = (monthNameElement, changeMonthCallback) => {
    monthNameElement.innerHTML = "";
    
    const prevArrow = document.createElement("span");
    prevArrow.innerHTML = "&larr;";
    prevArrow.classList.add("prev-arrow");
    prevArrow.addEventListener("click", () => changeMonthCallback(-1));
  
    const nextArrow = document.createElement("span");
    nextArrow.innerHTML = "&rarr;";
    nextArrow.classList.add("next-arrow");
    nextArrow.addEventListener("click", () => changeMonthCallback(1));
  
    const monthTitle = document.createElement("h3");
    monthTitle.classList.add("tasks-title");
    monthTitle.innerText = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  
    monthNameElement.appendChild(prevArrow);
    monthNameElement.appendChild(monthTitle);
    monthNameElement.appendChild(nextArrow);
  };
  
export const changeMonth = (m, calendarGrid, monthNameElement) => {
    now.setMonth(now.getMonth() + m);
    getMonth(monthNameElement, (delta) => changeMonth(delta, calendarGrid, monthNameElement));
    generaCalendario(calendarGrid);
  };
  
export const generaCalendario = (calendarGrid, showDetails) => {
    calendarGrid.innerHTML = "";
  
    daysOfTheWeek.forEach(day => {
      const divWeekDay = document.createElement("div");
      divWeekDay.classList.add("weekday");
      divWeekDay.textContent = day;
      calendarGrid.appendChild(divWeekDay);
    });
  
    const firstDayIndex = new Date(now.getFullYear(), now.getMonth(), 0).getDay();
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("empty-day");
      calendarGrid.appendChild(emptyDiv);
    }
  
    const daysOfTheMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const numGiorni = daysOfTheMonth.getDate();
  
    for (let i = 0; i < numGiorni; i++) {
      const day = i + 1;
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      
      const divDay = document.createElement("div");
      divDay.classList.add("day-container");
      divDay.textContent = day;
      divDay.setAttribute("data-date", formattedDate);
      divDay.setAttribute("data-month", now.getMonth());
      divDay.setAttribute("data-year", now.getFullYear());
      if (showDetails)
      {
        divDay.addEventListener("click", showDetails);
        calendarGrid.appendChild(divDay);
      } 
      else {calendarGrid.appendChild(divDay);}
      
    }

    
    document.querySelectorAll(".day-container").forEach((divDay) => {
      const day = parseInt(divDay.textContent);
      const month = parseInt(divDay.getAttribute("data-month"));
      const year = parseInt(divDay.getAttribute("data-year"));

      if (day === today && month === currentMonth && year === currentYear) {
        divDay.classList.add("today");
      }
      console.log("today")
    });
    
  };
  
  // export { getMonth, changeMonth, generaCalendario, 
  //   };
  