function limitText(text, limit = 100) {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

function getAlphabetChar(index = 0) {
  return String.fromCharCode(65 + index);
}

module.exports = { limitText, getAlphabetChar };
