const STORAGE_KEY = 'thumbgrab_history'

export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHistoryItem(item) {
  if (!item || !item.id) return
  try {
    const list = getHistory().filter((x) => x.id !== item.id)
    const updated = [{ id: item.id, title: item.title || '', author: item.author || '', time: Date.now() }, ...list].slice(0, 10)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Ignore storage errors
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore
  }
}
