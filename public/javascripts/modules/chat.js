export function chat() {
  document.querySelector('.dash-board').innerHTML = '';

  let template = `
  <div class="chat-board">
    <div class="chat-container">
      <header class="chat-header">
        <h1 class="pattaya"><i class="fas fa-smile"></i> chat</h1>
       
      </header>
      <main class="chat-main">
        <div class="chat-sidebar">
          <h3><i class="fas fa-users"></i> </h3>
          <ul id="users"></ul>
        </div>
        <div class="chat-messages"></div>
      </main>
      <div class="chat-form-container">
    
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autocomplete="off"
        />
        <button id="chat-form-btn" class="btn">
          <i class="fas fa-paper-plane"></i> Send
        </button>
  
      </div>
    </div>
  </div>
    
    `;
  document.querySelector('.dash-board').innerHTML = template;
}
