function insertMark(str, pos, len) {
  return `${str.slice(0, pos)}<mark>${str.slice(pos, pos + len)}</mark>${str.slice(pos + len)}`;
}