import {CardResponseType, cardsAPI, GetCardsResponseType} from "../../api/cardsAPI";
import {AppThunkType} from "../store/store";
import {setAppStatusAC} from "./app-reducer";
import {AppStatus} from "../../common/types/types";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";


type SetCardsForLearnAT = ReturnType<typeof setCardsForLearnAC>
type SetCardsPackIdInLearnAT = ReturnType<typeof setCardsPackIdInLearnAC>
type SetStatusLearnAT = ReturnType<typeof setStatusLearnAC>
type SetNamePackForLearnAT = ReturnType<typeof setNamePackForLearnAC>
type QuestionsCompletedAT = ReturnType<typeof questionsCompletedAC>
type ResetLearnCardStateAT = ReturnType<typeof resetLearnCardStateAC>
type DeleteStudiedCardAT = ReturnType<typeof deleteStudiedCardAC>
export type LearnActionsType =
    SetCardsForLearnAT
    | SetCardsPackIdInLearnAT
    | SetStatusLearnAT
    | SetNamePackForLearnAT
    | QuestionsCompletedAT
    | ResetLearnCardStateAT
    | DeleteStudiedCardAT


const initialState = {
    cards: null as CardResponseType[] | null,

    cardsPack_id: '',
    packName: '',
    cardsTotalCount: 0,
    pageCount: 10,
    packUserId: '',
    questionsCompleted: false,
    statusLearn: true,
}

type InitialStateType = typeof initialState

export const learnReducer = (state: InitialStateType = initialState, action: LearnActionsType): InitialStateType => {
    switch (action.type) {
        case "LEARN/SET_LEARN_CARDS":
            debugger
            return {
                ...state,
                cards: action.data.cards,
                packName: action.data.packName,
                cardsTotalCount: action.data.cardsTotalCount,
                packUserId: action.data.packUserId
            }
        case "LEARN/SET_CARDS_PACK_ID":
            return {...state, cardsPack_id: action.cardsPack_id}

        case "LEARN/SET_STATUS_LEARN":
            return {...state, statusLearn: action.value}

        case "LEARN/SET_NAME_PACK_LEARN":
            return {...state, packName: action.namePack}

        case "LEARN/QUESTIONS_COMPLETED":
            return {...state, questionsCompleted: action.value}

        case "LEARN/DELETE_STUDIED_CARD":
            return {...state, cards: action.cards}

        case "LEARN/RESET_CARD_STATE":
            return {
                ...state,
                cards: null,
                cardsPack_id: '',
                packName: '',
                cardsTotalCount: 0,
                pageCount: 10,
                packUserId: '',
                questionsCompleted: false,
                statusLearn: true
            }
        default:
            return state
    }
}


// ==================ACTION CREATORS =======================//
export const setCardsForLearnAC = (data: GetCardsResponseType) => ({type: "LEARN/SET_LEARN_CARDS", data} as const)

export const setCardsPackIdInLearnAC = (cardsPack_id: string) => {
    return {type: "LEARN/SET_CARDS_PACK_ID", cardsPack_id} as const
}

export const setStatusLearnAC = (value: boolean) => ({type: "LEARN/SET_STATUS_LEARN", value} as const)

export const setNamePackForLearnAC = (namePack: string) => ({type: "LEARN/SET_NAME_PACK_LEARN", namePack} as const)

export const questionsCompletedAC = (value: boolean) => ({type: "LEARN/QUESTIONS_COMPLETED", value} as const)

export const deleteStudiedCardAC = (cards: CardResponseType[]) => ({type: "LEARN/DELETE_STUDIED_CARD", cards} as const)

export const resetLearnCardStateAC = () => ({type: "LEARN/RESET_CARD_STATE"} as const)


// ==================THUNK CREATORS =======================//
export const getCardsForLearnTC = (): AppThunkType => async (dispatch, getState) => {
    debugger
    dispatch(setAppStatusAC(AppStatus.LOADING))
    const cardsPack_id = getState().learn.cardsPack_id
    const pageCount = getState().learn.pageCount

    try {
        const res = await cardsAPI.getCards({cardsPack_id, pageCount})
        dispatch(setCardsForLearnAC(res.data))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}


export const setGradeCardTC = (grade: number, card_id: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        const res = await cardsAPI.updateGradeCard({grade, card_id})
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}