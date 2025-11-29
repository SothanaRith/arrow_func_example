export const localStorageUtils = {
    get: (key) => {
        const data = localStorage.getItem(key)
        if (!data) return null
        try {
            return JSON.parse(data)
        } catch {
            return null
        }
    },

    set: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    },
    remove: (key) => {
        localStorage.removeItem(key)
    },
    clearAll: () => {
        localStorage.clear()
    }
}
