function randomInteger(min, max) {
  const res = min + Math.random() * (max - min + 1);
  return Math.floor(res);
}

function maxStringLength(str, maxLength) {
  return str.length <= maxLength;
}
