import { ILocalStorage } from './local-storage.interface'

export class LocalStorageService implements ILocalStorage {
  public get(itemName: string): object | number | string | null {
    const item = localStorage.getItem(itemName)
    const numPatt = new RegExp(/^\d+$/)
    const jsonPatt = new RegExp(/[\[\{].*[\}\]]/)

    if (item) {
      if (jsonPatt.test(item)) {
        return JSON.parse(item)
      } else if (numPatt.test(item)) {
        return parseFloat(item)
      } else {
        return item
      }
    } else {
      return null
    }
  }

  public set(itemName: string, item: any): void {
    if (typeof item === 'object') {
      localStorage.setItem(itemName, JSON.stringify(item))
    } else {
      localStorage.setItem(itemName, item)
    }
  }

  public remove(itemName: string): void {
    localStorage.removeItem(itemName)
  }
}
