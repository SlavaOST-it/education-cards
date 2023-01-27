import {usersAPI} from "../../api/usersAPI";
import {AppThunkType} from "../store/store";
import {setAppStatusAC} from "./app-reducer";
import {AppStatus} from "../../common/types/types";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {UsersResponseType, UsersType} from "../../api/apiConfig/types/usersAPI-types";


type SetUsersAT = ReturnType<typeof setUsersAC>
type SetPageUsersAT = ReturnType<typeof setPageUsersAC>
type SetPageCountUsersAT = ReturnType<typeof setPageCountUsersAC>
type SetUserNameSearchAT = ReturnType<typeof setUserNameSearchAC>
type SetValueSortUsersAT = ReturnType<typeof setValueSortUsersAC>
type SetValueMinMaxCardsUsersAT = ReturnType<typeof setValueMinMaxCardsUsersAC>

export type  UsersListActionType =
    SetUsersAT
    | SetPageUsersAT
    | SetPageCountUsersAT
    | SetUserNameSearchAT
    | SetValueSortUsersAT
| SetValueMinMaxCardsUsersAT

const initialState = {
    users: [] as UsersType[],

    page: 1,
    pageCount: 5,
    usersTotalCount: 0,
    minPublicCardPacksCount: 0,
    maxPublicCardPacksCount: 0,

    min: 0,
    max: 0,
    userName: '',
    sortUsers: "0publicCardPacksCount"
}

export type InitialStateUsersType = typeof initialState

export const usersReducer = (state: InitialStateUsersType = initialState, action: UsersListActionType): InitialStateUsersType => {
    switch (action.type) {
        case "USERS/SET_USERS":
            return {
                ...state,
                users: [...action.data.users],
                page: action.data.page,
                pageCount: action.data.pageCount,
                usersTotalCount: action.data.usersTotalCount,
                minPublicCardPacksCount: action.data.minPublicCardPacksCount,
                maxPublicCardPacksCount: action.data.maxPublicCardPacksCount,
            }

        case "USERS/SET_PAGE_USERS":
            return {
                ...state, page: action.page
            }

        case "USERS/SET_PAGE_COUNT_USERS":
            return {
                ...state, pageCount: action.count
            }

        case "USERS/SET_USER_NAME_SEARCH":
            return {
                ...state, userName: action.value
            }

        case "USERS/SET_VALUE_SORT_USERS": {
            return {
                ...state, sortUsers: action.value
            }
        }

        case "USERS/SET_VALUE_MIN_MAX_CARDS_USERS":
            return {
                ...state, min: action.min, max: action.max
            }

        default:
            return state
    }
}


// ==================ACTION CREATORS =======================//

export const setUsersAC = (data: UsersResponseType) => ({type: "USERS/SET_USERS", data} as const)
export const setPageUsersAC = (page: number) => ({type: "USERS/SET_PAGE_USERS", page} as const)
export const setPageCountUsersAC = (count: number) => ({type: "USERS/SET_PAGE_COUNT_USERS", count} as const)
export const setUserNameSearchAC = (value: string) => ({type: "USERS/SET_USER_NAME_SEARCH", value} as const)
export const setValueSortUsersAC = (value: string) => ({type: "USERS/SET_VALUE_SORT_USERS", value} as const)
export const setValueMinMaxCardsUsersAC = (min: number, max: number) => (
    {
        type: "USERS/SET_VALUE_MIN_MAX_CARDS_USERS",
        min,
        max
    } as const
)

// ==================THUNK CREATORS =======================//

export const getUsersTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    const {
        page,
        pageCount,
        min,
        max,
        userName,
        sortUsers
    } = getState().users

    try {
        const res = await usersAPI.getUsers(
            {
                page,
                pageCount,
                min,
                max,
                userName,
                sortUsers
            })

        dispatch(setUsersAC(res.data))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}