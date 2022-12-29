import {AppThunkType} from "../store/store";
import {setAppStatusAC} from "./app-reducer";
import {CardsPackType, PackRequestType, packsAPI} from "../../api/cardsAPI";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {baseDeckCover} from "../../assets/baseDeckCover";


let initialState = {
    cardPacks: [{
        _id: '',
        user_id: '',
        user_name: '',
        private: false,
        name: '',
        grade: 0,
        shots: 0,
        cardsCount: 0,
        type: '',
        rating: 0,
        created: '',
        updated: '',
        deckCover:''

    }],
    page: 0,
    pageCount: 5,
    sort: "1name",
    search: '',
    isMyPacks: false,
    minCardsCount: 0,
    maxCardsCount: 100,
    cardPacksTotalCount: 0,
    selected: true,
    userID: '',
    packId: '',
    packName: '',
    myDeckCover: baseDeckCover

}
export type InitialStatePacksType = typeof initialState

type SetDataCardsPackType = ReturnType<typeof setDataCardsPackAC>
type setSearchPacksType = ReturnType<typeof setSearchPacksAC>
type setIsMyPacksType = ReturnType<typeof setIsMyPacksAC>
type setCardsCountType = ReturnType<typeof setCardsCountAC>
type setPageType = ReturnType<typeof setPageAC>
type setPageCountType = ReturnType<typeof setPageCountAC>
type setSortType = ReturnType<typeof setSortAC>
type setPackIdType = ReturnType<typeof setPackIdAC>
type setUserIdType = ReturnType<typeof setUserIdAC>
type setPackNameType = ReturnType<typeof setPackNameAC>
type setDeckCoverType = ReturnType<typeof setDeckCoverAC>


export type ActionPackListType =
    SetDataCardsPackType
    | setSearchPacksType
    | setIsMyPacksType
    | setCardsCountType
    | setPageType
    | setPageCountType
    | setSortType
    | setPackIdType
    | setUserIdType
    | setPackNameType
    | setDeckCoverType


export const packsReducer = (state: InitialStatePacksType = initialState, action: ActionPackListType): InitialStatePacksType => {
    switch (action.type) {
        case "PACK_LIST/SET_DATA_CARDS_PACK":
            return {...state, cardPacks: action.data, cardPacksTotalCount: action.cardPacksTotalCount}

        case "PACK_LIST/SET_SEARCH_PACKS":
            return {...state, search: action.search}

        case "PACK_LIST/SET_IS_MY_PACKS":
            return {...state, isMyPacks: action.isMyPacks}

        case "PACK_LIST/SET_CARDS_COUNT":
            return {...state, minCardsCount: action.value[0], maxCardsCount: action.value[1]}

        case "PACK_LIST/SET_PAGE":
            return {...state, page: action.page}

        case "PACK_LIST/SET_PAGE_COUNT":
            return {...state, pageCount: action.PageCount}

        case "PACK_LIST/SET_SORT":
            return {...state, sort: action.sort, selected: action.selected}

        case "PACK_LIST/SET_PACK_ID":
            return {...state, packId: action.packId}

        case "PACK_LIST/SET_USER_ID":
            return {...state, userID: action.useId}

        case "PACK_LIST/SET_PACK_NAME":
            return {...state, packName: action.packName}

        case "PACK_LIST/SET_DECK_COVER":
            return {...state,myDeckCover:action.deckCover}

        default:
            return state
    }
}


export const setDataCardsPackAC = (data: CardsPackType[], cardPacksTotalCount: number) => {
    return {type: "PACK_LIST/SET_DATA_CARDS_PACK", data, cardPacksTotalCount} as const
}

export const setSearchPacksAC = (search: string) => {
    return {type: "PACK_LIST/SET_SEARCH_PACKS", search} as const
}

export const setIsMyPacksAC = (isMyPacks: boolean) => {
    return {type: "PACK_LIST/SET_IS_MY_PACKS", isMyPacks} as const
}

export const setCardsCountAC = (value: number[]) => {
    return {type: "PACK_LIST/SET_CARDS_COUNT", value} as const
}

export const setPageAC = (page: number) => {
    return {type: "PACK_LIST/SET_PAGE", page} as const
}

export const setPageCountAC = (PageCount: number) => {
    return {type: "PACK_LIST/SET_PAGE_COUNT", PageCount} as const
}

export const setSortAC = (sort: string, selected: boolean) => {
    return {type: "PACK_LIST/SET_SORT", sort, selected} as const
}

export const setPackIdAC = (packId: string) => {
    return {type: "PACK_LIST/SET_PACK_ID", packId} as const
}

export const setUserIdAC = (useId: string) => {
    return {type: "PACK_LIST/SET_USER_ID", useId} as const
}
export const setPackNameAC = (packName: string) => {
    return {type: "PACK_LIST/SET_PACK_NAME", packName} as const
}
export const setDeckCoverAC = (deckCover: string) => {
    return {type: "PACK_LIST/SET_DECK_COVER", deckCover} as const
}


export const getPackListTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const {
            page,
            pageCount,
            sort,
            search,
            isMyPacks,
            minCardsCount,
            maxCardsCount,
        } = getState().packList
        const {_id} = getState().profile
        let my_id = ''
        if (isMyPacks) {
            my_id = _id
        }
        const data: PackRequestType = {
            page: page,
            pageCount: pageCount,
            sortPacks: sort,
            packName: search,
            user_id: my_id,
            min: minCardsCount,
            max: maxCardsCount
        }
        const res = await packsAPI.getCardPacks(data)
        dispatch(setDataCardsPackAC(res.data.cardPacks, res.data.cardPacksTotalCount))
        dispatch(setPageCountAC(res.data.pageCount))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const addNewPackTC = (newValue: string, privateStatus: boolean,deckCover?:string): AppThunkType => async (dispatch,) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.createPack(newValue, privateStatus,deckCover)
        dispatch(getPackListTC())
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const deletePackTC = (id: string): AppThunkType => async (dispatch,) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.deletePack(id)
        dispatch(getPackListTC())
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const changePackTC = (id: string, name: string, isPrivate: boolean,deckCover?:string): AppThunkType => async (dispatch,) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.updatePack(id, name, isPrivate,deckCover)
        dispatch(getPackListTC())
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}