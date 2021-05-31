export function socketForChat(socket) {
  // get input
  let msg = document.getElementById('msg').value;

  // get player from ls
  let player = JSON.parse(localStorage.getItem('keyPlayer')).username;

  let messageObj = {
    msg: msg,
    player: player,
  };
  console.log(messageObj);
  // emit message to server
  socket.emit('chatMessage', messageObj);
  // clear input
  document.getElementById('msg').value = '';
}

// output message to DOM function
export function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.player} <span> ${message.time}</span></p>
      <p class="text">
       ${message.msg}
      </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}