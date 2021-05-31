export function displayTime() {
  document.querySelector('.time-board').innerHTML = '';
  let template = `
    <h2><span id="countDownSpan">00:00</span></h2>
    <button class="btn" id="finish">Finish</button>
    `;

  document.querySelector('.time-board').innerHTML = template;
}

// Helper function
function formatTime(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes} : ${seconds}`;
}

export function updateTime(secondsLeft) {
  document.getElementById('countDownSpan').innerHTML = formatTime(secondsLeft);
}

export function displayScore(percentCorrect) {
  document.querySelector('.score-board').innerHTML = '';
  let template = `
  <h2>You scored ${percentCorrect}% correct</h2>
  `;
  document.querySelector('.score-board').innerHTML = template;
}
