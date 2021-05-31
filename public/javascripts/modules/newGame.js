//Displays the randomised reference image
export function displayRandomImg(facitImage) {
  document.querySelector('.image-board').innerHTML = '';
  let template = `

    <img src="./images/playableGamesImages/${facitImage}.png" alt="">
 
    `;
  document.querySelector('.image-board').innerHTML = template;
}
