export function nav() {
  const chatMessages = document.querySelector('.chat-messages');
  document.querySelector('.nav-holder').innerHTML = '';

  let template = ` 
<nav class="navbar">
<div class="brand-title"><span id="span">Grid </span>Paint</div>

<div class="navbar-links">
  <ul>
    <li id="new-game">NEW GAME</li>
    <li id="clear-board">Clear board</li>
    <li id="save-image">Save Image</li>
    <li id="load-image">Load Image</li>
    <li id="rules">Rules</li>
    <li id="logout">Logout</li>
  </ul>
</div>
</nav>
`;

  document.querySelector('.nav-holder').innerHTML = template;
}
