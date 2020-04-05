function insertMark(str, pos, len) {
  return `${str.slice(0, pos)}<mark>${str.slice(pos, pos + len)}</mark>${str.slice(pos + len)}`;
}

function randomArrElement(arr) {
  return arr[ Math.floor(Math.random() * (arr.length)) ];
}

function addBodyClass() {
  document.querySelector('body').classList.add('shadow');
}

function removeBodyClass() {
  document.querySelector('body').classList.remove('shadow');
}