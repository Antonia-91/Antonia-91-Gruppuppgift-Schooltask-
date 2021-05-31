export function printGrid() {
  document.querySelector('.game-board').innerHTML = '';

  let gridPainterCanvas = document.createElement('div');
  gridPainterCanvas.id = 'gridPainterCanvas';

  // Add 225 pixles with class, id and background-color
  for (let i = 0; i < 225; i++) {
    let div = document.createElement('div');
    div.style.backgroundColor = 'white';
    div.id = 'gridPixelNr' + i;
    div.classList.add('gridPixel');
    gridPainterCanvas.appendChild(div);
  }

  document.querySelector('.game-board').insertAdjacentElement('afterbegin', gridPainterCanvas);
}
