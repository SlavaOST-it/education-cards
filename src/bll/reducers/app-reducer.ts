import {authAPI} from "../../api/authAPI";
import {setUserProfileAC} from "./profile-reducer";
import {loggedInAC} from "./auth-reducer";
import {AppThunkType} from "../store/store";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";


const initialState = {
    status: AppStatus.IDLE,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_INITIALIZED":
            return {...state, isInitialized: action.value}

        case "APP/SET_APP_STATUS":
            return {...state, status: action.status}

        case 'APP/SET_ERROR':
            return {...state, error: action.error}

        default:
            return {...state}
    }
}


// ================== ACTION CREATORS =======================//
export const setInitializedAC = (value: boolean) => ({type: "APP/SET_INITIALIZED", value} as const)
export const setAppStatusAC = (status: AppStatus) => ({
    type: 'APP/SET_APP_STATUS' as const,
    status
})
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)


// ================== THUNK CREATORS =======================//
export const initializeAppTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        const res = await authAPI.me()
        dispatch(loggedInAC(true))
        dispatch(setInitializedAC(true))
        dispatch(setUserProfileAC(res))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    } finally {
        dispatch(setInitializedAC(true))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    }
}


// ================== ACTION TYPES =======================//

export type SetInitializedAT = ReturnType<typeof setInitializedAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

export type AppActionType = SetInitializedAT | SetAppStatusAT | SetAppErrorAT