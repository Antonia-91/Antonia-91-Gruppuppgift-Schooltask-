export function listenForPixelClick(socket) {
  socket.on('pixel clicked', function (divClicked) {
    // Logs all info about div clicked
    console.log(divClicked);

    // Logs in bash/zsh/cmd when event 'pixel clicked' is recieved
    console.log('Div nr: ' + divClicked.pixelIndex + ' was clicked');

    const listOfPixels = document.querySelectorAll('.gridPixel');
    const index = divClicked.pixelIndex;

    // Change pixel to users color
    listOfPixels[index].style.backgroundColor = divClicked.usersColor;
  });
}
