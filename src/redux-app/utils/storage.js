const STORAGE_KEY = 'gameState';
const STORAGE_VERSION = 2;

export const getSavedState = () => {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { version: STORAGE_VERSION, state: {} }
  if (savedData.version === STORAGE_VERSION) {
    return savedData.state
  }
  return {}
}

export const saveState = state => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    version: STORAGE_VERSION,
    state,
  }))
}
