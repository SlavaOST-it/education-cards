import {AppThunkType} from "../store/store";
import {setAppStatusAC} from "./app-reducer";
import {CardsPackType, PackRequestType, packsAPI, PacksResponseType} from "../../api/cardsAPI";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";
import {TPack, TResponsePack} from "../../api/myAPI/myAPI";
import {baseDeckCover} from "../../assets/baseDeckCover";


const initialState = {
    cardPacks: [
        {
            _id: '',
            cardsCount: 0,
            created: '',
            grade: 0,
            more_id: '',
            path: '',
            name: '',
            type: '',
            private: false,
            rating: 0,
            shots: 0,
            updated: '',
            user_id: '',
            user_name: '',
            deckCover: '',
        }
    ] as TPack[],

    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    min: 0,
    max: 0,
    sortByAllMy: "All" as SortPacksAllMyType,
    searchInput: '',
    sortPacksValue: '0updated',
    rerender: true,
    coverImg: baseDeckCover,
}

export type InitialStatePacksType = typeof initialState


export const packsReducer = (state: InitialStatePacksType = initialState, action: ActionPackListType): InitialStatePacksType => {
    switch (action.type) {
        case "PACKS/SET_PACKS":
            return {
                ...state, cardPacks: [...action.data.cardPacks],
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



        // case 'PACKS/SET_SORT_MY_ALL':
        //     return { ...state, sortByAllMy: action.sortByAllMy }
        // case 'PACKS/SET-RERENDER':
        //     return {...state, rerender: action.rerender}
        // case 'PACKS/SET-COVER-IMG':
        //     return {...state, coverImg: action.coverImg}

        // case "PACK_LIST/SET_DATA_CARDS_PACK":
        //     return {...state, cardPacks: action.data, cardPacksTotalCount: action.cardPacksTotalCount}
        // case "PACK_LIST/SET_CARDS_COUNT":
        //     return {...state, minCardsCount: action.value[0], maxCardsCount: action.value[1]}
        // case "PACK_LIST/SET_SORT":
        //     return {...state, sort: action.sort, selected: action.selected}
        //
        // case "PACK_LIST/SET_PACK_ID":
        //     return {...state, packId: action.packId}
        //
        // case "PACK_LIST/SET_USER_ID":
        //     return {...state, userID: action.useId}
        //
        // case "PACK_LIST/SET_PACK_NAME":
        //     return {...state, packName: action.packName}

        default:
            return state
    }
}

// ==================ACTION CREATORS =======================//
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





export const setDataCardsPackAC = (data: CardsPackType[], cardPacksTotalCount: number) => {
    return {type: "PACKS/SET_DATA_CARDS_PACK", data, cardPacksTotalCount} as const
}

export const setCardsCountAC = (value: number[]) => {
    return {type: "PACKS/SET_CARDS_COUNT", value} as const
}


export const setSortAC = (sort: string, selected: boolean) => {
    return {type: "PACKS/SET_SORT_PACKS_VALUE", sort, selected} as const
}


export const setPackIdAC = (packId: string) => {
    return {type: "PACKS/SET_PACK_ID", packId} as const
}

export const setUserIdAC = (useId: string) => {
    return {type: "PACKS/SET_USER_ID", useId} as const
}
export const setPackNameAC = (packName: string) => {
    return {type: "PACKS/SET_PACK_NAME", packName} as const
}


// ==================THUNK CREATORS =======================//

export const getPacksTC = (changedSortByAllMy: boolean = false): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    const {
        page,
        pageCount,
        sortByAllMy,
        searchInput,
        min,
        max,
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
        return res.data
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const addNewPackTC = (newValue: string, privateStatus: boolean, deckCover?: string): AppThunkType => async (dispatch,) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await packsAPI.createPack(newValue, privateStatus, deckCover)
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
        await packsAPI.updatePack(id, name, isPrivate, deckCover)
        dispatch(getPacksTC())
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}


export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover: string
}


type SetPacksType = ReturnType<typeof setPacksAC>

export type SortPacksAllMyType = "All" | "My"
type SetRerenderAT = ReturnType<typeof setRerenderAC>
// type SetDataCardsPackType = ReturnType<typeof setDataCardsPackAC>
type setSearchPacksType = ReturnType<typeof setSearchInputPacksAC>
type setIsMyPacksType = ReturnType<typeof setIsMyPacksAC>
// type setCardsCountType = ReturnType<typeof setCardsCountAC>
type setPageType = ReturnType<typeof setPageAC>
type setPageCountType = ReturnType<typeof setPageCountAC>
type setSortType = ReturnType<typeof setSortPacksValueAC>
// type setPackIdType = ReturnType<typeof setPackIdAC>
// type setUserIdType = ReturnType<typeof setUserIdAC>
// type setPackNameType = ReturnType<typeof setPackNameAC>
type setDeckCoverType = ReturnType<typeof setDeckCoverAC>
type SetSortMinMaxCardsAT = ReturnType<typeof setSortMinMaxCardsAC>


export type ActionPackListType =
// SetDataCardsPackType
    | setSearchPacksType
    | setIsMyPacksType
    // | setCardsCountType
    | setPageType
    | setPageCountType
    | setSortType
    // | setPackIdType
    // | setUserIdType
    // | setPackNameType
    | setDeckCoverType
    | SetPacksType
    | SetSortMinMaxCardsAT
    | SetRerenderAT