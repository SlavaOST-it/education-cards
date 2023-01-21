import {AppThunkType} from '../store/store'
import {setAppStatusAC} from './app-reducer'
import {CardResponseType, cardsAPI, GetCardsResponseType} from '../../api/cardsAPI'
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";

type SetCardsAT = ReturnType<typeof setCardsAC>
type SetSearchCardsAT = ReturnType<typeof setSearchCardsAC>
type SortCardsAT = ReturnType<typeof sortCardsAC>
type SetPageCardsAT = ReturnType<typeof setPageCardsAC>
type SetPageCardsCountAT = ReturnType<typeof setPageCardsCountAC>
type ResetCardsStatedAT = ReturnType<typeof resetCardsStatedAC>
type SetCurrentPackIdAT = ReturnType<typeof setCurrentPackIdAC>

export type CardsActionsType =
    SetCardsAT
    | SetSearchCardsAT
    | SortCardsAT
    | SetPageCardsAT
    | SetPageCardsCountAT
    | ResetCardsStatedAT
    | SetCurrentPackIdAT


const initialState = {
    cards: [] as CardResponseType[],

    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    page: 1,
    pageCount: 5,
    packName: '',
    packUserId: '',
    currentPackId: '',
    sortCards: '0updated',
    filterSearchValue: '',
}

type InitialStateType = typeof initialState

export const cardsReducer = (state = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
            return {
                ...state,
                cards: action.data.cards,
                packName: action.data.packName,
                cardsTotalCount: action.data.cardsTotalCount,
                minGrade: action.data.minGrade,
                maxGrade: action.data.maxGrade,
                page: action.data.page,
                pageCount: action.data.pageCount,
                packUserId: action.data.packUserId
            }

        case "CARDS/SET_CURRENT_PACK_ID":
            return {...state, currentPackId: action.currentPackId}

        case "CARDS/SET_PAGE":
            return {...state, page: action.page}

        case "CARDS/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount}

        case "CARDS/SET_SEARCH_CARDS":
            return {...state, filterSearchValue: action.search}

        case "CARDS/SORT_CARDS":
            return {...state, sortCards: action.sort}

        case "CARDS/RESET_STATE":
            return {
                ...state,
                packName: '',
                cards: [],
                cardsTotalCount: 0,
                maxGrade: 0,
                minGrade: 0,
                page: 1,
                pageCount: 5,
                packUserId: '',
                currentPackId: '',
                sortCards: '0updated',
                filterSearchValue: '',
            }

        default:
            return state
    }
}

// ==================ACTION CREATORS =======================//
export const setCardsAC = (data: GetCardsResponseType) => ({type: 'CARDS/SET_CARDS', data} as const)

export const setSearchCardsAC = (search: string) => {
    return {type: "CARDS/SET_SEARCH_CARDS", search} as const
}

export const sortCardsAC = (sort: string) => {
    return {type: "CARDS/SORT_CARDS", sort} as const
}

export const setPageCardsAC = (page: number) => {
    return {type: "CARDS/SET_PAGE", page} as const
}

export const setPageCardsCountAC = (pageCount: number) => {
    return {type: "CARDS/SET_PAGE_COUNT", pageCount} as const
}

export const setCurrentPackIdAC = (currentPackId: string) => {
    return {type: "CARDS/SET_CURRENT_PACK_ID", currentPackId} as const
}

export const resetCardsStatedAC = () => {
    return {type: "CARDS/RESET_STATE"} as const
}


// ==================THUNK CREATORS =======================//

export const getCardsTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    const cardsPack_id = getState().cards.currentPackId
    const page = getState().cards.page
    const pageCount = getState().cards.pageCount
    const cardQuestion = getState().cards.filterSearchValue
    const sortCards = getState().cards.sortCards

    try {
        const res = await cardsAPI.getCards({
            cardsPack_id,
            page,
            pageCount,
            sortCards,
            cardQuestion
        })
        dispatch(setCardsAC(res.data))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        return baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const addCardTC = (cardsPack_id: string, question: string, answer: string, questionImg?: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await cardsAPI.createCard({cardsPack_id, question, answer, questionImg})
        dispatch(getCardsTC())
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const deleteCardTC = (cardsPack_id: string, cardsId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await cardsAPI.deleteCard(cardsId)
        dispatch(getCardsTC())
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const changeCardTC = (
    cardsPack_id: string,
    _id: string,
    newQuestion: string,
    newAnswer: string,
    comment?: string
): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await cardsAPI.updateCard({_id: _id, question: newQuestion, answer: newAnswer, comments: comment})
        dispatch(getCardsTC())
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const learnCardTC = (packUserId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        const data: GetCardsParamsType = {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: packUserId,
            min: 0,
            max: 0,
            sortCards: '0question',
            page: 1,
            pageCount: 1000,
            id: ''
        }
        const res = await cardsAPI.getCards(data)
        dispatch(setCardsAC(res.data))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}


export type GetCardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string // обязательно!
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
    id: string
}
