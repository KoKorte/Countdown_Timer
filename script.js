const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const setDateButton = document.getElementById('setDate');
const targetDateInput = document.getElementById('targetDate');
const selectedDateElement = document.getElementById('selectedDate');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let targetDate;
let countdownInterval;

function updateTimer() {
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
  } else {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
}

function startTimer() {
  if (!targetDate) {
    return; // Do nothing if the target date is not set
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(countdownInterval);
}

function resetTimer() {
  stopTimer();
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
}

function setDate() {
  const dateString = targetDateInput.value;
  targetDate = new Date(dateString).getTime();
  targetDateInput.value = ''; // Reset the date input after setting the target date

  // Update the selectedDateElement to display the chosen date
  const formattedDate = new Date(dateString).toLocaleDateString('fi-FI');
  selectedDateElement.textContent = `Valittu päivämäärä: ${formattedDate}`;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
setDateButton.addEventListener('click', setDate);
