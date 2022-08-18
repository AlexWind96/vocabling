export type CreateWordFormValues = {
  foreignWord: string
  nativeWord: string
  foreignExample: string
  nativeExample: string
}

export interface IExampleItem {
  value: string
  position: number
  isStudyVocab: boolean
}
