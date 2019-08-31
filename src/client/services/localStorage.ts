function getItem(key) {
  if (global.localStorage) {
    return global.localStorage.getItem(key)
  }
  return false
}

function loadState() {
  try {
    const serializedState = global.localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

function saveState(state) {
  try {
    const serializedState = JSON.stringify(state)
    global.localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}

export { getItem, loadState, saveState }
