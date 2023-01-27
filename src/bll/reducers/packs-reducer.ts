import {AppThunkType} from "../store/store";
import {setAppStatusAC} from "./app-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";
import {PacksResponseType, PackType} from "../../api/apiConfig/types/packsAPI-types";
import {packsAPI} from "../../api/packsAPI";


const initialState = {
    cardPacks: [] as PackType[],

    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 100,

    min: 0,
    max: 0,
    sortByAllMy: "All" as SortPacksAllMyType,
    searchInput: '',
    sortPacksValue: '0updated',
    rerender: true,
    coverImg: "",
}

export type InitialStatePacksType = typeof initialState

export const packsReducer = (state: InitialStatePacksType = initialState, action: PackListActionsType): InitialStatePacksType => {
    switch (action.type) {
        case "PACKS/SET_PACKS":
            return {
                ...state,
                cardPacks: [...action.data.cardPacks],
                page: action.data.page,
                pageCount: action.data.pageCount,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                minCardsCount: action.data.minCardsCount,
                maxCardsCount: action.data.maxCardsCount,
            }

        case "PACKS/SET_PAGE":
            return {...state, page: action.page}

        case "PACKS/SET_PAGE_COUNT":
            return {...state, pageCount: action.PageCount}

        case 'PACKS/SET_SORT_MIN_MAX_CARDS':
            return {...state, min: action.min, max: action.max}

        case "PACKS/SET_SORT_MY_ALL":
            return {...state, sortByAllMy: action.sortByAllMy}

        case "PACKS/SET_SEARCH_PACKS":
            return {...state, searchInput: action.search}

        case 'PACKS/SET_SORT_PACKS_VALUE':
            return {...state, sortPacksValue: action.sortPacksValue}

        case 'PACKS/SET_RERENDER':
            return {...state, rerender: action.rerender}

        case "PACKS/SET_DECK_COVER":
            return {...state, coverImg: action.deckCover}

        default:
            return state
    }
}

// ================== ACTION CREATORS =======================//
export const setPacksAC = (data: PacksResponseType) => {
    return {type: "PACKS/SET_PACKS", data} as const
}

export const setPageAC = (page: number) => {
    return {type: "PACKS/SET_PAGE", page} as const
}

export const setPageCountAC = (PageCount: number) => {
    return {type: "PACKS/SET_PAGE_COUNT", PageCount} as const
}

export const setSortMinMaxCardsAC = (min: number, max: number) => {
    return {
        type: 'PACKS/SET_SORT_MIN_MAX_CARDS',
        min,
        max,
    } as const
}

export const setIsMyPacksAC = (sortByAllMy: SortPacksAllMyType) => {
    return {type: "PACKS/SET_SORT_MY_ALL", sortByAllMy} as const
}

export const setSearchInputPacksAC = (search: string) => {
    return {type: "PACKS/SET_SEARCH_PACKS", search} as const
}

export const setSortPacksValueAC = (sortPacksValue: string) => {
    return {
        type: 'PACKS/SET_SORT_PACKS_VALUE',
        sortPacksValue,
    } as const
}

export const setRerenderAC = (rerender: boolean) => {
    return {
        type: 'PACKS/SET_RERENDER',
        rerender,
    } as const
}

export const setDeckCoverAC = (deckCover: string) => {
    return {type: "PACKS/SET_DECK_COVER", deckCover} as const
}


// ================== THUNK CREATORS =======================//

export const getPacksTC = (selectAllOrMyPacks = false): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    const {
        page,
        pageCount,
        sortByAllMy,
        searchInput,
        min = selectAllOrMyPacks ? undefined : getState().packs.minCardsCount,
        max = selectAllOrMyPacks ? undefined : getState().packs.maxCardsCount,
        sortPacksValue
    } = getState().packs

    const myId = getState().profile._id
    const user_id = sortByAllMy === 'All' ? '' : myId

    try {
        const res = await packsAPI.getPacks(
            {
                page,
                pageCount,
                sortByAllMy,
                user_id,
                min,
                max,
                packName: searchInput,
                sortPacks: sortPacksValue,
            })

        dispatch(setPacksAC(res.data))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const addNewPackTC = (newValue: string, privateStatus: boolean, deckCover?: string): AppThunkType => async (dispatch,) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await packsAPI.createPack({name: newValue, isPrivate: privateStatus, deckCover})
        dispatch(getPacksTC())
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const deletePackTC = (id: string): AppThunkType => async (dispatch,) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await packsAPI.deletePack(id)
        dispatch(getPacksTC())
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const changePackTC = (id: string, name: string, isPrivate: boolean, deckCover?: string): AppThunkType => async (dispatch,) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await packsAPI.updatePack({_id: id, name, isPrivate, deckCover})
        dispatch(getPacksTC())
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}


export type SortPacksAllMyType = "All" | "My"
type SetPacksType = ReturnType<typeof setPacksAC>
type SetRerenderAT = ReturnType<typeof setRerenderAC>
type setSearchPacksType = ReturnType<typeof setSearchInputPacksAC>
type setIsMyPacksType = ReturnType<typeof setIsMyPacksAC>
type setPageType = ReturnType<typeof setPageAC>
type setPageCountType = ReturnType<typeof setPageCountAC>
type setSortType = ReturnType<typeof setSortPacksValueAC>
type setDeckCoverType = ReturnType<typeof setDeckCoverAC>
type SetSortMinMaxCardsAT = ReturnType<typeof setSortMinMaxCardsAC>


export type PackListActionsType =
    | setSearchPacksType
    | setIsMyPacksType
    | setPageType
    | setPageCountType
    | setSortType
    | setDeckCoverType
    | SetPacksType
    | SetSortMinMaxCardsAT
    | SetRerenderAT