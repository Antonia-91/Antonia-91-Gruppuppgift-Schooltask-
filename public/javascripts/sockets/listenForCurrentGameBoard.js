export function listenForCurrentGameBoard(socket) {
  socket.on('color grid from image', function (imageGridArray) {
    const listOfPixels = document.querySelectorAll('.gridPixel');

    listOfPixels.forEach((pixel, index) => {
      pixel.style.backgroundColor = imageGridArray[index] || 'white';
    });
  });
}
