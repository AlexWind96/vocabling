import type { AxiosPromise } from 'axios'
import { Endpoints } from '../endpoints'
import { Page } from '../types'
import { Card, CardsQueryParams, CreateCardDTO, UpdateCardDTO } from './model'


export class CardEndpoints extends Endpoints {
  basePath: string = 'cards'

  getCards = (params: CardsQueryParams | undefined): AxiosPromise<Page<Card>> => {
    return this.instance.get(this.basePath, { params })
  }
  getCardById = (id: string): AxiosPromise<Card> => {
    return this.instance.get(this.basePath + `/${id}`)
  }
  updateCard = (id: string, body: UpdateCardDTO): AxiosPromise<Card> => {
    return this.instance.patch(this.basePath + `/${id}`, body)
  }

  createCard = (body: CreateCardDTO): AxiosPromise<Card> => {
    return this.instance.post(this.basePath, body)
  }

  deleteCard = (id: string): AxiosPromise<Card> => {
    return this.instance.delete(this.basePath + `/${id}`)
  }

  getLearnCard = (): AxiosPromise<Card | null> => {
    return this.instance.get(this.basePath + `/learn-card`)
  }

  registerRightAnswer = (id: string): AxiosPromise<Card> => {
    return this.instance.patch(this.basePath + `/${id}/right`)
  }

  registerWrongAnswer = (id: string): AxiosPromise<Card> => {
    return this.instance.patch(this.basePath + `/${id}/wrong`)
  }
}
