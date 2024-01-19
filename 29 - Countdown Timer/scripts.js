let countdown;

function timer(seconds) {
  if (countdown) {
    clearInterval(countdown);
    countdown = null;
  }

  const now = Date.now();
  const then = now + seconds * 1000;
  displaySeconds(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      countdown = null;
      return;
    }

    displaySeconds(secondsLeft);
  }, 1000);
}

const displayTimeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

buttons.forEach(button => button.addEventListener("click", function () {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}))

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const seconds = parseInt(this.minutes.value) * 60;
  this.reset();
  timer(seconds);
});

function displaySeconds(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const [min, sec] = [minutes, seconds].map(time => time < 10 ? `0${time}` : time);
  const display = `${min}:${sec}`;
  displayTimeLeft.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const [hour, minute] = [end.getHours(), end.getMinutes()].map(time => time < 10 ? `0${time}` : time);
  endTime.textContent = `Be back at ${hour}:${minute}`;
}