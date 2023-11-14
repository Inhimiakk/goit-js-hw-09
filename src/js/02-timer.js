import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

let countdownInterval; // Переменная для хранения идентификатора интервала

function convertMs(ms) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let days = Math.floor(ms / day);
  let hours = Math.floor((ms % day) / hour);
  let minutes = Math.floor(((ms % day) % hour) / minute);
  let seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    const timeData = convertMs(timeDifference);
    updateCountdownText(timeData);
    startButton.disabled = false; // При выборе даты активируем кнопку "Start"
  },
};

flatpickr('#datetime-picker', options);

function updateCountdownText({ days, hours, minutes, seconds }) {
  spanDays.textContent = `${addLeadingZero(days)}`;
  spanHours.textContent = `${addLeadingZero(hours)}`;
  spanMinutes.textContent = `${addLeadingZero(minutes)}`;
  spanSeconds.textContent = `${addLeadingZero(seconds)}`;
}

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr('#datetime-picker').selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert("Please choose a date in the future");
    return;
  }

  startButton.disabled = true; // Отключаем кнопку "Start" после её нажатия
  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      alert("Countdown complete!");
      startButton.disabled = false; // По завершении отсчета активируем кнопку "Start"
    } else {
      const timeData = convertMs(timeDifference);
      updateCountdownText(timeData);
    }
  }, 1000);
}
