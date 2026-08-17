const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM"
];
const dayStartMinutes = 9 * 60;
const slotMinutes = 30;

const schedules = [
  { person: "Zinan", day: "Monday", start: "2:30 PM", end: "5:30 PM", course: "HWG704" },
  { person: "Zinan", day: "Wednesday", start: "9:30 AM", end: "12:30 PM", course: "EE6008 (TA)" },
  { person: "Zinan", day: "Wednesday", start: "2:00 PM", end: "5:00 PM", course: "DIP EE02 (TA)" },
  { person: "Zinan", day: "Thursday", start: "3:00 PM", end: "4:30 PM", course: "IE4422 (TA)" },
  { person: "Soumya", day: "Wednesday", start: "9:30 AM", end: "12:30 PM", course: "EE6008 (TA)" },
  { person: "Soumya", day: "Wednesday", start: "6:30 PM", end: "9:20 PM", course: "EE6222" },
  { person: "Haitian", day: "Wednesday", start: "10:00 AM", end: "12:00 PM", course: "EE6008 (TA)" },
  { person: "Haitian", day: "Wednesday", start: "2:30 PM", end: "5:00 PM", course: "DIP EE02 (TA)" },
  { person: "Kaimin", day: "Wednesday", start: "10:30 AM", end: "1:30 PM", course: "HWG704" },
  { person: "Like", day: "Monday", start: "6:30 PM", end: "8:20 PM", course: "GP8001" },
  { person: "Like", day: "Tuesday", start: "6:30 PM", end: "9:20 PM", course: "EE6407" },
  { person: "Like", day: "Wednesday", start: "6:30 PM", end: "9:20 PM", course: "EE6221" },
  { person: "Du", day: "Monday", start: "12:30 PM", end: "2:20 PM", course: "CE7491" },
  { person: "Du", day: "Wednesday", start: "2:30 PM", end: "4:20 PM", course: "CE7491" },
  { person: "Du", day: "Wednesday", start: "6:30 PM", end: "9:20 PM", course: "EE6427" },
  { person: "Du", day: "Thursday", start: "9:30 AM", end: "11:20 AM", course: "HWG703" },
  { person: "Du", day: "Friday", start: "6:30 PM", end: "9:20 PM", course: "CE6190" },
  { person: "Quitian", day: "Tuesday", start: "6:30 PM", end: "9:20 PM", course: "EE6407" },
  { person: "Quitian", day: "Wednesday", start: "6:30 PM", end: "9:20 PM", course: "EE6427" },
  { person: "Quitian", day: "Thursday", start: "7:00 PM", end: "9:50 PM", course: "EE6483" },
  { person: "Quitian", day: "Friday", start: "7:00 PM", end: "8:50 PM", course: "EE6405" },
  { person: "Jiayi", day: "Wednesday", start: "6:30 PM", end: "9:20 PM", course: "EE6221" },
  { person: "Jiayi", day: "Friday", start: "6:30 PM", end: "9:20 PM", course: "CE6190" },
  { person: "Shriram", day: "Thursday", start: "10:00 AM", end: "1:00 PM", course: "CE7457" },
  { person: "Soumya", day: "Thursday", start: "11:30 AM", end: "1:00 PM", course: "HWG702" },
  { person: "Thai", day: "Thursday", start: "11:30 AM", end: "1:00 PM", course: "HWG702" },
  { person: "Like", day: "Friday", start: "6:30 PM", end: "9:20 PM", course: "CE6190" }
];

const personColors = {
  Zinan: { background: "#dbeafe", border: "#1d4ed8" },
  Soumya: { background: "#dcfce7", border: "#15803d" },
  Thai: { background: "#fef3c7", border: "#b45309" },
  Haitian: { background: "#fce7f3", border: "#be185d" },
  Kaimin: { background: "#ede9fe", border: "#6d28d9" },
  Like: { background: "#fee2e2", border: "#dc2626" },
  Shriram: { background: "#cffafe", border: "#0f766e" },
  Du: { background: "#ffedd5", border: "#ea580c" },
  Quitian: { background: "#ecfccb", border: "#65a30d" },
  Jiayi: { background: "#e0f2fe", border: "#0369a1" }
};

const slotHeight = 44;
const dayStartHour = 9;
const dayEndMinutes = 22 * 60;
const timetable = document.getElementById("timetable");
const personFilters = document.getElementById("personFilters");
const selectAllButton = document.getElementById("selectAllButton");
const peopleSearch = document.getElementById("peopleSearch");

function renderTable() {
  timetable.innerHTML = "";
  const visiblePeople = getVisiblePeople();
  const visibleSchedules = schedules.filter((item) => visiblePeople.includes(item.person));

  const corner = document.createElement("div");
  corner.className = "planner-corner";
  corner.textContent = "Time";
  timetable.appendChild(corner);

  days.forEach((day) => {
    const header = document.createElement("div");
    header.className = "planner-header";
    header.textContent = day;
    header.dataset.day = day;
    timetable.appendChild(header);
  });

  const timeColumn = document.createElement("div");
  timeColumn.className = "time-column";
  timeSlots.forEach((time) => {
    const label = document.createElement("div");
    label.className = "time-label";
    label.textContent = time === "9:00 AM" ? "" : time;
    label.dataset.time = time;
    timeColumn.appendChild(label);
  });

  const plannerBody = document.createElement("div");
  plannerBody.className = "planner-body";
  plannerBody.appendChild(timeColumn);

  days.forEach((day) => {
    const dayColumn = document.createElement("div");
    dayColumn.className = "day-column";
    dayColumn.dataset.day = day;

    const dayLane = document.createElement("div");
    dayLane.className = "day-lane";

    const dayBlocks = visibleSchedules
      .filter((item) => item.day === day)
      .map((item) => ({
        ...item,
        startMinutes: parseTimeLabel(item.start),
        endMinutes: parseTimeLabel(item.end)
      }))
      .sort((left, right) => left.startMinutes - right.startMinutes || left.endMinutes - right.endMinutes);

    const laidOutBlocks = assignLanes(dayBlocks);

    laidOutBlocks.forEach((block) => {
      const colors = personColors[block.person] || {
        background: "#e2e8f0",
        border: "#94a3b8"
      };

      const card = document.createElement("div");
      card.className = "schedule-card";
      card.style.top = `${((block.startMinutes - dayStartMinutes) / slotMinutes) * slotHeight}px`;
      card.style.height = `${((block.endMinutes - block.startMinutes) / slotMinutes) * slotHeight}px`;
      card.style.left = `${(block.lane / block.totalLanes) * 100}%`;
      card.style.width = `${(block.spanLanes / block.totalLanes) * 100}%`;

      const inner = document.createElement("div");
      inner.className = "schedule-card-inner";
      inner.style.background = colors.background;
      inner.style.borderColor = colors.border;

      const text = document.createElement("span");
      text.className = "schedule-card-text";

      const nameText = document.createElement("span");
      nameText.className = "schedule-card-name";
      nameText.textContent = block.person;
      text.appendChild(nameText);

      if (block.course) {
        const courseText = document.createElement("span");
        courseText.className = "schedule-card-course";
        courseText.textContent = block.course;
        text.appendChild(courseText);
      }

      inner.appendChild(text);
      card.appendChild(inner);
      dayLane.appendChild(card);
    });

    dayColumn.appendChild(dayLane);
    plannerBody.appendChild(dayColumn);
  });

  timetable.appendChild(plannerBody);
  updateCurrentTimeState();
}

function parseTimeLabel(label) {
  const [timePart, meridiem] = label.trim().split(" ");
  const [rawHour, rawMinute] = timePart.split(":").map(Number);
  let hour = rawHour % 12;

  if (meridiem === "PM") {
    hour += 12;
  }

  return hour * 60 + rawMinute;
}

function assignLanes(blocks) {
  const results = [];
  let currentGroup = [];
  let currentGroupEnd = -1;

  blocks.forEach((block, index) => {
    if (currentGroup.length === 0 || block.startMinutes < currentGroupEnd) {
      currentGroup.push({ ...block });
      currentGroupEnd = Math.max(currentGroupEnd, block.endMinutes);
    } else {
      results.push(...layoutGroup(currentGroup));
      currentGroup = [{ ...block }];
      currentGroupEnd = block.endMinutes;
    }

    if (index === blocks.length - 1 && currentGroup.length > 0) {
      results.push(...layoutGroup(currentGroup));
    }
  });

  return results;
}

function layoutGroup(group) {
  const lanes = [];

  group.forEach((block) => {
    let laneIndex = lanes.findIndex((laneEnd) => laneEnd <= block.startMinutes);

    if (laneIndex === -1) {
      laneIndex = lanes.length;
      lanes.push(block.endMinutes);
    } else {
      lanes[laneIndex] = block.endMinutes;
    }

    block.lane = laneIndex;
  });

  const totalLanes = lanes.length;

  return group.map((block) => {
    let spanLanes = 1;

    for (let nextLane = block.lane + 1; nextLane < totalLanes; nextLane += 1) {
      const hasConflict = group.some(
        (other) =>
          other !== block &&
          other.lane === nextLane &&
          other.startMinutes < block.endMinutes &&
          other.endMinutes > block.startMinutes
      );

      if (hasConflict) {
        break;
      }

      spanLanes += 1;
    }

    return {
      ...block,
      totalLanes,
      spanLanes
    };
  });
}

function renderFilters() {
  const uniquePeople = [...new Set(schedules.map((item) => item.person))];

  if (uniquePeople.length === 0) {
    personFilters.innerHTML = '<p class="filter-empty">No people added yet. Send me the schedules and I will populate them.</p>';
    return;
  }

  personFilters.innerHTML = "";

  uniquePeople.forEach((person) => {
    const colors = personColors[person] || {
      background: "#e2e8f0",
      border: "#94a3b8"
    };

    const label = document.createElement("label");
    label.className = "filter-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = person;
    checkbox.checked = true;
    checkbox.addEventListener("change", handleFilterChange);

    const text = document.createElement("span");
    text.className = "filter-name";
    text.textContent = person;
    text.style.background = colors.background;
    text.style.borderColor = colors.border;

    label.appendChild(checkbox);
    label.appendChild(text);
    personFilters.appendChild(label);
  });

  updateSelectAllButton();
}

function getVisiblePeople() {
  return [...personFilters.querySelectorAll('input[type="checkbox"]:checked')].map(
    (checkbox) => checkbox.value
  );
}

function getMinutesFromStartOfDay(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function getCurrentSlotIndex(minutes) {
  const startMinutes = dayStartHour * 60;

  if (minutes < startMinutes || minutes >= dayEndMinutes) {
    return -1;
  }

  return Math.floor((minutes - startMinutes) / 30);
}

function updateCurrentTimeState() {
  const now = new Date();
  const currentDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now);
  const currentMinutes = getMinutesFromStartOfDay(now);
  const currentSlotIndex = getCurrentSlotIndex(currentMinutes);

  timetable.querySelectorAll(".planner-header").forEach((header) => {
    header.classList.toggle("current-day", header.dataset.day === currentDay);
  });

  timetable.querySelectorAll(".day-column").forEach((column) => {
    column.classList.toggle("current-day", column.dataset.day === currentDay);
  });

  timetable.querySelectorAll(".current-time-line").forEach((line) => {
    line.remove();
  });

  if (!days.includes(currentDay) || currentMinutes < dayStartHour * 60 || currentMinutes > dayEndMinutes) {
    return;
  }

  const plannerBody = timetable.querySelector(".planner-body");
  if (!plannerBody) {
    return;
  }

  const line = document.createElement("div");
  line.className = "current-time-line";
  line.style.top = `${((currentMinutes - dayStartHour * 60) / 30) * slotHeight}px`;
  plannerBody.appendChild(line);
}

function handleFilterChange() {
  updateSelectAllButton();
  renderTable();
}

function updateSelectAllButton() {
  const checkboxes = [...personFilters.querySelectorAll('input[type="checkbox"]')];
  const allChecked = checkboxes.length > 0 && checkboxes.every((checkbox) => checkbox.checked);
  selectAllButton.textContent = allChecked ? "Clear All" : "Select All";
}

function filterPeopleList() {
  const query = peopleSearch.value.trim().toLowerCase();
  const items = [...personFilters.querySelectorAll(".filter-item")];

  items.forEach((item) => {
    const name = item.querySelector(".filter-name")?.textContent.toLowerCase() || "";
    item.style.display = name.includes(query) ? "flex" : "none";
  });
}

selectAllButton.addEventListener("click", () => {
  const checkboxes = [...personFilters.querySelectorAll('input[type="checkbox"]')];
  const shouldCheckAll = checkboxes.some((checkbox) => !checkbox.checked);

  checkboxes.forEach((checkbox) => {
    checkbox.checked = shouldCheckAll;
  });

  updateSelectAllButton();
  renderTable();
});

peopleSearch.addEventListener("input", filterPeopleList);

renderFilters();
filterPeopleList();
renderTable();
updateCurrentTimeState();
setInterval(updateCurrentTimeState, 60000);
