exports.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.shuffle = function(array) {
  const shuffledArray = [...array];
  let unshuffledItemIndex = array.length

  // While there remain elements to shuffle…
  while (unshuffledItemIndex) {
    // Pick a remaining element…
    const randomItem = Math.floor(Math.random() * unshuffledItemIndex--);
    // And swap it with the current element.
    const shuffledItem = shuffledArray[unshuffledItemIndex];
    shuffledArray[unshuffledItemIndex] = shuffledArray[randomItem];
    shuffledArray[randomItem] = shuffledItem;
  }

  return shuffledArray;
}
