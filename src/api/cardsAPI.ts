import {instance} from "./apiConfig/instance"
import {
    CardsRequestType,
    CardsResponseType,
    CardType, CreateCardRequestType, UpdateCardRequestType,
    UpdatedGradeResponseType,
    UpdateGradeType
} from "./apiConfig/types/cardsAPI-types";


export const cardsAPI = {
    getCards(data: CardsRequestType) {
        return instance.get<CardsResponseType>('cards/card', {params: {...data}})
    },

    createCard(payload: CreateCardRequestType) {
        return instance.post<CardType>("cards/card", {card: {...payload}})
    },

    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`);
    },

    updateCard(payload: UpdateCardRequestType) {
        return instance.put<CardType>(`cards/card`, {card: {...payload}})
    },

    updateGradeCard(data: UpdateGradeType) {
        return instance.put<UpdatedGradeResponseType>(`cards/grade`, data)
    }
}
