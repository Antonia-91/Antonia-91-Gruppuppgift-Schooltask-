function loadLoginView(colors) {
  let template = `
  <div class="join-container">
  <header class="join-header">
    <h1 class="pattaya"><i class="fas fa-smile"></i> Log in</h1>
  </header>
  <main class="join-main">
    <form>
      <div class="form-control">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username..."
          required
        />
      </div>
      <div class="form-control">
        <label for="color">Color</label>
        <select name="color" id="color">
        <option selected disabled hidden value="SELECT A COLOR">SELECT A COLOR</option>`;
  for (let color of colors) {
    console.log('color: ', color);

    if (color.usedBy == null) {
      template += `<option value="${color.nameOfColor}">${color.nameOfColor}</option>`;
    } else {
      template += `<option disabled value="${color.nameOfColor}">${color.nameOfColor}</option>`;
    }
  }

  template += `
      </select>
    </div>
    <button c type="submit" id="login-form" class="btn pattaya">Join game</button>
  </form>
</main>
</div>`;

  document.querySelector('.login-board').innerHTML = template;
}

function clearLogin() {
  document.querySelector('.login-board').innerHTML = '';
}

export { loadLoginView, clearLogin };
