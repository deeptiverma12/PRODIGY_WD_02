let timer;
let isRunning = false;
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let lapCount = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const clearLapsBtn = document.getElementById("clearLaps");
const laps = document.getElementById("laps");
const toggleThemeBtn = document.getElementById("toggleTheme");

// ✅ Update stopwatch display
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
  display.textContent = `${h}:${m}:${s}.${ms}`;
}

// ✅ Start / Pause stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startStopBtn.textContent = "Pause";
    timer = setInterval(() => {
      milliseconds += 1;
      if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10);
  } else {
    isRunning = false;
    startStopBtn.textContent = "Start";
    clearInterval(timer);
  }
}

// ✅ Reset stopwatch
function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  lapCount = 0;
  updateDisplay();
  startStopBtn.textContent = "Start";
  laps.innerHTML = "";
}

// ✅ Record lap
function recordLap() {
  if (isRunning) {
    lapCount++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${display.textContent}`;
    laps.appendChild(li);
  }
}

// ✅ Clear laps
function clearLaps() {
  laps.innerHTML = "";
  lapCount = 0;
}

// ✅ Toggle Dark/Light Mode
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  if (document.body.classList.contains("dark")) {
    toggleThemeBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    toggleThemeBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
}

// ✅ Apply saved theme
window.onload = function () {
  let savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(savedTheme);
  toggleThemeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  updateDisplay();
};

// ✅ Event Listeners
startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
clearLapsBtn.addEventListener("click", clearLaps);
toggleThemeBtn.addEventListener("click", toggleTheme);
