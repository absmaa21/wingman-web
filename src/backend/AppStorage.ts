export default class AppStorage {

  static setItem(key: string, data: object | string) {
    const value = typeof data == 'string' ? data : JSON.stringify(data)
    localStorage.setItem(key, value)
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key)
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }

  static getAllKeys(): string[] {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const new_key = localStorage.key(i)
      if (new_key) keys.push(new_key)
    }
    return keys
  }

}