function makeColorAvailableAgain(colorNowAvailable, listOfColors) {
  listOfColors.find((color) => color.nameOfColor == colorNowAvailable).usedBy = null;
}

module.exports = makeColorAvailableAgain;
