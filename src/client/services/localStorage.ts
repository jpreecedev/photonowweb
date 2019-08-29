function getItem(key) {
  if (global.localStorage) {
    return global.localStorage.getItem(key)
  }
  return false
}

export { getItem }
