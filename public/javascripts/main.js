// ----- imports from modules folder ----- //
import { loadLoginView, clearLogin } from './modules/login.js';
import { nav } from './modules/nav.js';
import { printGrid } from './modules/gridPage.js';
import { chat } from './modules/chat.js';
import { displayRandomImg } from './modules/newGame.js';
import { displayTime, updateTime, displayScore } from './modules/countDownTimer.js';

// ----- imports from sockets folder ----- //
import { listenForPixelClick } from './sockets/listenPixelClick.js';
import { emitPixelHasBeenClicked } from './sockets/emitPixelClick.js';
import { listenForCurrentGameBoard } from './sockets/listenForCurrentGameBoard.js';
import { socketForChat, outputMessage } from './sockets/socketForChat.js';

//-------------- INIT SOCKET.IO --------------- //
const socket = io();

// --------------  GLOBAL VARIABLES -------------- //
let playerConnected = JSON.parse(localStorage.getItem('keyPlayer'));

let getUser;
let getColor;
if (playerConnected) {
  getUser = JSON.parse(localStorage.getItem('keyPlayer')).username;
  getColor = JSON.parse(localStorage.getItem('keyPlayer')).color;
}
let availableColors = [];

let countDownTimer;

// -------------- SOCKET on updating colors -------------- //
socket.on('send colors from server', (colors) => {
  availableColors = colors;
  if (playerConnected == null) {
    loadLoginView(colors);

    socket.on('color unavailable', (colorUnavailable) => {
      let listOfOptions = Array.from(document.querySelectorAll('#color option'));

      listOfOptions.find((option) => option.value == colorUnavailable).disabled = true;
    });

    socket.on('color available again', (color) => {
      let listOfOptions = Array.from(document.querySelectorAll('#color option'));

      listOfOptions.find((option) => option.value == color).disabled = false;
    });
  } else {
    loginUser(playerConnected);
  }
});

//--------------  GLOBAL EVENTLISTENERS --------------- //
window.addEventListener('click', (e) => {
  // login
  if (e.target.matches('#login-form')) {
    e.preventDefault();

    let player = {
      username: document.querySelector('#username').value,
      color: document.querySelector('#color').value,
    };
    if (player.color !== 'SELECT A COLOR' && player.username !== '') {
      loginUser(player);
    }
  }

  // show rules
  if (e.target.matches('#rules')) {
    const dropDownDiv = document.getElementById('drop-dow-div');
    dropDownDiv.classList.toggle('active');
  }
  // Start countdown
  if (e.target.matches('#countDownBtn')) {
  }

  // Stop count and stop game
  if (e.target.matches('#finish')) {
    clearInterval(countDownTimer);
    socket.emit('send players from client', getUser);
  }

  if (e.target.matches('#logout')) {
    // GET color from ls
    let userColor = JSON.parse(localStorage.getItem('keyPlayer')).color;

    // Send color to server
    socket.emit('user logs out', userColor);

    // Clear ls
    localStorage.clear();

    // clear
    clearLoggedInView();

    // Get loginview
    loadLoginView(availableColors);
  }

  //  new game
  // Någon startar spelet
  if (e.target.matches('#new-game')) {
    document.querySelector('.score-board').innerHTML = '';
    document.getElementById('new-game').style.visibility = 'hidden';
    document.getElementById('clear-board').style.visibility = 'hidden';
    document.getElementById('save-image').style.visibility = 'hidden';
    document.getElementById('load-image').style.visibility = 'hidden';
    socket.emit('new game button clicked');
  }

  // chat
  if (e.target.matches('#chat-form-btn')) {
    // handel sockets on chat
    socketForChat(socket);
  }

  // -------------- IO EMITS --------------- //
  if (e.target.matches('.gridPixel')) {
    let getColor = JSON.parse(localStorage.getItem('keyPlayer')).color;
    emitPixelHasBeenClicked(socket, e.target, getColor);
  }

  // save game
  if (e.target.matches('#save-image')) {
    socket.emit('save image');
  }

  // load game
  if (e.target.matches('#load-image')) {
    socket.emit('load image');
  }

  // clear image
  if (e.target.matches('#clear-board')) {
    socket.emit('clear board');
  }
});

//-------------- IO LISTENERS --------------- //
listenForPixelClick(socket);
listenForCurrentGameBoard(socket);

let facit;
socket.on('send random game from server', (randomGame) => {
  //Make sure user is logged in
  if (playerConnected) {
    // Update view for user
    printGrid();
    displayTime();
    displayRandomImg(randomGame.name);

    // Spara facitArray för att jämföra senare
    facit = randomGame.data;
  }
});

// message from server
socket.on('message', (message) => {
  outputMessage(message);
});

// message from server
socket.on('time left', (secondsLeft) => {
  updateTime(secondsLeft);
});

// All players finished
socket.on('all players clicked finish', () => {
  document.getElementById('new-game').style.visibility = 'visible';
  document.getElementById('clear-board').style.visibility = 'visible';
  document.getElementById('save-image').style.visibility = 'visible';
  document.getElementById('load-image').style.visibility = 'visible';

  // Display result in %
  let nodelist1 = document.querySelectorAll('.gridPixel');
  let myarray = Array.from(nodelist1);
  let newarr2 = myarray.map((div) => div.style.cssText.split(': ')[1]);

  let correctPixels = 0;
  newarr2.forEach((pixel, index) => {
    if (facit[index] === pixel) {
      correctPixels++;
    }
  });
  let percentCorrect = ((correctPixels / 225) * 100).toFixed(2);
  displayScore(percentCorrect);
  nav();
});

// ---- FUNCTIONS  view holders ---- //
function loginUser(player) {
  // Set player object local
  addPlayerToLS(player);

  // Remove login view
  clearLogin();

  // Load game views
  loadLoggedInView();

  // Emit to server that a player has taken a color
  socket.emit('user logged in', player);
}

function addPlayerToLS(player) {
  localStorage.setItem('keyPlayer', JSON.stringify(player));
  playerConnected = JSON.parse(localStorage.getItem('keyPlayer'));
  getUser = JSON.parse(localStorage.getItem('keyPlayer')).username;
  getColor = JSON.parse(localStorage.getItem('keyPlayer')).color;
}

function loadLoggedInView() {
  nav();
  printGrid();
  socket.emit('user get newest gameboard');
  chat();
}

function clearLoggedInView() {
  document.querySelector('.game-board').innerHTML = '';
  document.querySelector('.nav-holder').innerHTML = '';
  document.querySelector('.dash-board').innerHTML = '';
  document.querySelector('.score-board').innerHTML = '';
  document.querySelector('.time-board').innerHTML = '';
  document.querySelector('.image-board').innerHTML = '';
}
