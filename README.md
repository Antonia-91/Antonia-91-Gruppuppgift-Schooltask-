# GruppuppgiftDynamiskWebbutveckling

How to start the project:
Clone the repo and  install npm: run “npm install”

Short description about the project:
The project is build by NodeJS, socket.io and ExpressJS with Monolit architecture. Prettier-code formatter is installed to form the code. 
Heroku link: https://grid-painter.herokuapp.com/

Short description about the game:
The game requires 4 players to play. Each player needs to login to with a color and a username. There are four colors and each one can only been choosen by one player. After login can all players send messages to each other in the chat box. 

In the nav bar there are few buttons.
New game: to start a new game
Save Image: to save the painted image/game
Load Image: to load the saved painted image/game
Clear board: to delete the painted image/game
Logout: to logout the game.

The game will be started for all the players as long as one player click the buttin New game. 
After a new game has been started the fact picture will been shown on the left side. The players needs to paint the grid area according to the fact picture. A 2 minutes timmer will be started as well. After 2 minutes the painted image will be compared with the fact picture and the result of the game will been shown above the grid area. If the players manage to complete the game/paintning with in 2 minutes. They can click the “finish” button. When all four players have clicked the finish button, the timmer will be paused and the painted image will be compared with the fact picture and the result of the game will been shown above the grid area.

