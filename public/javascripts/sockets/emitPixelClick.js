export function emitPixelHasBeenClicked(socket, pixel, color) {
  socket.emit('pixel clicked', {
    user: socket.id,
    pixelIndex: parseInt(pixel.id.split('gridPixelNr')[1], 10),
    usersColor: color,
  });
}
