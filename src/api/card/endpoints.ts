import type { AxiosPromise } from 'axios'
import { Endpoints } from '@/shared/api'
import { Page, PaginationArgs } from '../types'
import { Card, CardQueryArgs, CreateCardDTO, UpdateCardDTO } from './model'

export class CardEndpoints extends Endpoints {
  getCards = (params: (CardQueryArgs & PaginationArgs) | undefined): AxiosPromise<Page<Card>> => {
    return this.instance.get(this.getEndpoint(), { params })
  }
  getCardById = (id: string): AxiosPromise<Card> => {
    return this.instance.get(this.getEndpoint(`/${id}`))
  }
  updateCard = (id: string, body: UpdateCardDTO): AxiosPromise<Card> => {
    return this.instance.patch(this.getEndpoint(`/${id}`), body)
  }

  createCard = (body: CreateCardDTO): AxiosPromise<Card> => {
    return this.instance.post(this.getEndpoint(), body)
  }

  deleteCard = (id: string): AxiosPromise<Card> => {
    return this.instance.delete(this.getEndpoint(`/${id}`))
  }

  getLearnCard = (): AxiosPromise<Card | null> => {
    return this.instance.get(this.getEndpoint(`/learn-card`))
  }

  registerRightAnswer = (id: string): AxiosPromise<Card> => {
    return this.instance.patch(this.getEndpoint(`/${id}/right`))
  }

  registerWrongAnswer = (id: string): AxiosPromise<Card> => {
    return this.instance.patch(this.getEndpoint(`/${id}/wrong`))
  }
}
