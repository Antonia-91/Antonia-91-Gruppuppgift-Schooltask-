var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const formatMessage = require('./backendFunctions/messages');
const makeColorUnavailable = require('./backendFunctions/makeColorUnavailable');
const makeColorAvailableAgain = require('./backendFunctions/makeColorAvailableAgain');

const facitArrays = require('./backEndVariables/facitArrays');

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let colorsInBank = [
  {
    nameOfColor: 'red',
    usedBy: null,
    saveGame: false,
  },
  {
    nameOfColor: 'blue',
    usedBy: null,
    saveGame: false,
  },
  {
    nameOfColor: 'green',
    usedBy: null,
    saveGame: false,
  },
  {
    nameOfColor: 'yellow',
    usedBy: null,
    saveGame: false,
  },
];

let gameBoard = new Array(225);
let savedImage = new Array(225);

let numOfUsers = 0;
const numberOfFinishedPlayers = new Set();
// -------------- SOCKET ON CHAT ----------- //
/*
    When a user connects to the server:
      The user automatically joins the chat room
      The server starts listening for clicks from the user
*/

io.on('connection', function (socket) {
  console.log('User connected: ', socket.id);

  numOfUsers++;
  console.log('numOfUsers: ', numOfUsers);

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
    numOfUsers--;
    console.log('numOfUsers: ', numOfUsers);
  });

  socket.emit('send colors from server', colorsInBank);
  // Emit which colors are available

  socket.on('user logged in', (userDetails) => {
    makeColorUnavailable(userDetails, colorsInBank);

    // Log colors
    console.log('colorsInBank: ', colorsInBank);

    // Emit to front end color is disabled
    socket.broadcast.emit('color unavailable', userDetails.color);
  });

  socket.on('user logs out', (color) => {
    // Update colorsInBank
    makeColorAvailableAgain(color, colorsInBank);

    // Log colors
    console.log('colorsInBank: ', colorsInBank);

    // Send all available colors
    socket.broadcast.emit('color available again', color);
  });
  // Listen for chatMessage
  socket.on('chatMessage', (messageObj) => {
    console.log(messageObj);
    io.emit('message', formatMessage(messageObj.player, messageObj.msg));
  });

  // -------------- SOCKET ON GAME ----------- //

  socket.on('user get newest gameboard', () => {
    // Emit current state of gameboard to the new user
    socket.emit('color grid from image', savedImage);
  });

  socket.on('new game button clicked', () => {
    // Clear gameboard on server
    gameBoard = new Array(225);

    // Reset all colors.savegame
    colorsInBank.forEach((player) => {
      player.saveGame = false;
    });

    console.log('numberOfFinishedPlayers');
    console.log(numberOfFinishedPlayers);
    // Clear array
    numberOfFinishedPlayers.forEach((element) => {
      console.log('element');
      console.log(element);
      numberOfFinishedPlayers.delete(element);
    });
    console.log('numberOfFinishedPlayers');
    console.log(numberOfFinishedPlayers);

    // Send empty board to all players
    io.emit('color grid from image', gameBoard);

    // Get random game from facitArray
    let randomGame = facitArrays[Math.floor(Math.random() * 5)];
    console.log(randomGame);

    // Send same reference image to all players
    io.emit('send random game from server', randomGame);

    timeLeft = 120;
    interval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        io.emit('all players clicked finish');
        clearInterval(interval);
      }
      console.log('timeLeft: ', timeLeft);
      io.emit('time left', timeLeft);
    }, 1000);
  });

  /* When a pixel is clicked:
    The server updates the global variable gameBoard
    The server emits the change to all users
  */

  socket.on('pixel clicked', function (divClicked) {
    // Update gameBoard on server with a color
    gameBoard[divClicked.pixelIndex] = divClicked.usersColor;
    savedImage[divClicked.pixelIndex] = divClicked.usersColor;

    // Emit new pixel with color to all connected players
    io.emit('pixel clicked', divClicked);
  });

  //----------SOCKET ON SAVE GAME--------------//
  // Update player
  socket.on('send players from client', (getUser) => {
    playerSaveGame(getUser, colorsInBank, numberOfFinishedPlayers);

    if (numberOfFinishedPlayers.size === 4) {
      io.emit('all players clicked finish');

      // Clear interval
      clearInterval(interval);
    }
  });

  // A player saves the current image
  socket.on('save image', () => {
    let clearImage = new Array(255);
    io.emit('color grid from image', clearImage);
  });

  // A player clears the current image
  socket.on('clear board', () => {
    savedImage = new Array(255);
    io.emit('color grid from image', savedImage);
  });

  // A player wants the latest saved image
  socket.on('load image', () => {
    io.emit('color grid from image', savedImage);
  });
});

let interval;
let timeLeft;

// Update player's saveGame status to "true"
function playerSaveGame(getUser, colorsInBank, numberOfFinishedPlayers) {
  colorsInBank.find((user) => user.usedBy == getUser).saveGame = true;
  console.log('Uppdated saveGame status:', colorsInBank);
  numberOfFinishedPlayers.add(getUser);
  console.log('numberOfsaveGame', numberOfFinishedPlayers);
}

module.exports = {
  app,
  server,
};
