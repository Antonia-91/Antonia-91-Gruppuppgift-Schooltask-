// ----------  GLOBAL VARIABLES ---------- //
let countDownTimer;
let totalSeconds;

// ----------  TIMER FUNCTIONS ---------- //
function countTimer() {
  --totalSeconds;
  renderTimer();

  if (totalSeconds <= 0) {
    clearInterval(countDownTimer);
    timerEnd();
  }
}

function renderTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  document.getElementById('countDownSpan').innerHTML = minutes + ':' + seconds;
}

function resetTimer() {
  totalSeconds = 120;
  clearInterval(countDownTimer);
  renderTimer();
}

function timerEnd() {
  console.log('Tiden är ute!');
}
