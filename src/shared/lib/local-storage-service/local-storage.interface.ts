export interface ILocalStorage {
  get: (itemName: string) => any
  set: (itemName: string, item: any) => any
  remove: (itemName: string) => any
}
