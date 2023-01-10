import {instance} from "./apiConfig/instance"
import {SortPacksAllMyType} from "../bll/reducers/packs-reducer";
import {PackType} from "./apiConfig/types/types";


export const packsAPI = {
    getPacks(data: PackRequestType) {
        return instance.get<PacksResponseType>('cards/pack', {params: {...data}})
    },

    createPack(value: string, privateStatus?: boolean, deckCover?: string) {
        return instance.post('cards/pack', {cardsPack: {name: value, private: privateStatus, deckCover: deckCover}})
    },

    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },

    updatePack(_id: string, name: string, isPrivate: boolean, deckCover?: string) {
        return instance.put('cards/pack', {cardsPack: {_id, name, private: isPrivate, deckCover}})
    }
}

export const cardsAPI = {
    getCards(data: GetCardsRequestType) {
        return instance.get<GetCardsResponseType>('cards/card', {params: {...data}})
    },

    createCard(payload = {} as CardRequestType) {
        return instance.post("cards/card", {
            card: {
                ...payload,
            },
        })
    },

    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`);
    },

    updateCard(payload = {} as UpdateCardType) {
        return instance.put(`cards/card`, {
            card: {
                ...payload,
            },
        })
    },
}


export type GetCardsRequestType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type GetCardsResponseType = {
    packName: string
    cards: CardResponseType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type PacksResponseType = {
    cardPacks: PackType[],
    page: number,
    pageCount: number,
    sort: string,
    search: string,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,

}

export type CardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type CardRequestType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    shots?: number
    grade?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    comments?: string
}

export type CardResponseType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    min: number
    max: number
    _id: string
}

export type CardsResponseType = {
    cards: CardResponseType[]
    cardsTotalCount: number
    cardAnswer: string
    cardQuestion: string
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    cardsPack_id: string
    packName: string
    id: string
    infoMessage?: string
    sortCards: string
}

export type CardsPackType = {
    _id: string
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    deckCover: string,

    packId: '',
    userID: '',
    packName: '',
}

export type PackRequestType = {
    page?: number,
    pageCount?: number,
    sortByAllMy: SortPacksAllMyType,
    searchInput?: string
    sortPacks?: string,
    packName?: string,
    user_id?: string,
    min?: number,
    max?: number
}