import data from "./data.json" assert { type: "json" };

const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevIcon = document.querySelector(".prev");
const nextIcon = document.querySelector(".next");
const top = document.querySelector(".top");
const bottom = document.querySelector(".bottom");
const dayInfoDiv = document.getElementById("day-info");
const body = document.querySelector("body");
const calendarContainer = document.querySelector(".calendar-container");
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const startDayOfWeek = new Date(currYear, currMonth, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.

  const arr = data.holidays.filter(
    (dt) =>
      months[currMonth] ===
      new Date(dt.date).toLocaleDateString("en-US", { month: "long" })
  );

  let liTag = "";

  for (let i = 0; i < startDayOfWeek; i++) {
    liTag += `<li></li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const holidayDate = arr.find((dt) => i == new Date(dt.date).getDate());

    if (holidayDate) {
      liTag += `<li class="activated">${i}<div class="circle" style="background: ${holidayDate.type === "public" ? "#00C" : "#F90"
        }"></div></li>`;
    } else {
      liTag += `<li class="activated">${i}<div class="circle" style="background: transparent"></div></li>`;
    }
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
});

prevIcon.addEventListener("click", () => {
  currMonth -= 1;
  if (currMonth < 0) {
    currMonth = 11;
    currYear -= 1;
  }
  renderCalendar();
});

nextIcon.addEventListener("click", () => {
  currMonth += 1;
  if (currMonth > 11) {
    currMonth = 0;
    currYear += 1;
  }
  renderCalendar();
});

function getDaySuffix(day) {
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

daysTag.addEventListener("click", (event) => {
  if (event.target.className === "activated") {
    dayInfoDiv.style.display = "block";
    bottom.innerHTML = "";
    top.innerHTML = "";
    const selectedDay = event.target.innerText;

    if (selectedDay) {
      const selectedDate = new Date(currYear, currMonth, Number(selectedDay));

      renderDayInfo(selectedDate);
    }
  }
});

body.addEventListener('click', (event) => {
  if (!calendarContainer.contains(event.target)) {
    dayInfoDiv.style.display = "none";
  }
});

const renderDayInfo = (selectedDate) => {
  const dayName = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  let formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });

  const positionForComma = formattedDate.indexOf(" ");

  formattedDate =
    formattedDate.substring(0, positionForComma) +
    ", " +
    formattedDate.substring(positionForComma + 1, formattedDate.length);

  let day = selectedDate.getDate();

  //! RENDER DAY INFO

  top.innerHTML += `<div class="dayName">${dayName}</div>`;
  top.innerHTML += `<div class="monthDate">${formattedDate}<sup>${getDaySuffix(
    day
  )}</sup></div>`;

  data.holidays.forEach((dt) => {
    if (dt.date === formattedDate.substring(0, formattedDate.length)) {
      top.innerHTML += `<div class="currentHoliday">${dt.description}</div>`;
    }
  });

  let count = 0;

  data.holidays.forEach((dt) => {
    if (
      dt.date.substr(0, dt.date.length - 4) === months[currMonth] &&
      dt.date.substr(dt.date.length - 2, 2) >
      selectedDate.toLocaleDateString("en-US", { day: "2-digit" })
    ) {
      if (count++ === 0) {
        bottom.innerHTML += `<div class="heading">Upcoming</div>`;
      }

      const upcomingDay = new Date(dt.date);
      const dayNameShort = upcomingDay.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const upcomingdayNumber = upcomingDay.getDate();

      const upcomingdayInfo = `
      <div class="circle" style="background: ${dt.type === "public" ? "#00C" : "#F90"
        }"></div>
      <div>
        <div class="holidayName">${dt.description}</div>
        <div class="holidayDate">${dayNameShort}, ${upcomingdayNumber}${getDaySuffix(
          upcomingdayNumber
        )}</div>
      </div>
      `;

      bottom.innerHTML += `<div class="upcomingHoliday">${upcomingdayInfo}</div>`;
    }
  });
};
