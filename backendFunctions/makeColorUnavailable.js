function makeColorUnavailable(user, colors) {
  let userColor = user.color;
  let username = user.username;
  colors.find((color) => color.nameOfColor == userColor).usedBy = username;
}

module.exports = makeColorUnavailable;
