const video = document.querySelector(".player video");
const playerButton = document.querySelector(".player .player__button.toggle");
const progressBar = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");
const skipButtons = document.querySelectorAll(".player__button[data-skip]");
const playerRange = document.querySelectorAll(".player .player__slider");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  playerButton.textContent = video.paused ? "►" : "❚ ❚";
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function skipProcessTime() {
  video.currentTime += parseFloat(this.dataset.skip);
  if (video.currentTime < 0) video.currentTime = 0;
}

function updateRange() {
  // console.log(e, this.name, this.value)
  video[this.name] = this.value;
}

function setProgress(e) {
  // offsetWidth: width of the entire progress bar, content width + padding + border
  // offsetX: relation the target element, the progress bar
  const percent = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = percent;
}

playerButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
skipButtons.forEach((button) => button.addEventListener("click", skipProcessTime));
playerRange.forEach((range) => range.addEventListener("change", updateRange));
playerRange.forEach((range) => range.addEventListener("mousemove", updateRange));

progress.addEventListener("click", setProgress);
let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && setProgress(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);