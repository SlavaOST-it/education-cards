import {authAPI} from "../../api/authAPI";
import {setUserProfileAC} from "./profile-reducer";
import {loggedInAC} from "./auth-reducer";
import {AppThunkType} from "../store/store";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";

export type AppStatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type SetInitializedAT = ReturnType<typeof setInitializedAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type AppActionType = SetInitializedAT | SetAppStatusAT | SetAppErrorAT


const initialState = {
    status: 'idle' as AppStatusType,
    error: null as string | null,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}

        case "APP/SET-APP-STATUS":
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        default:
            return {...state}
    }
}

// ===== ActionCreators ===== //
export const setInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)
export const setAppStatusAC = (status: AppStatusType) => ({
    type: 'APP/SET-APP-STATUS' as const,
    status
})
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

// ===== ThunkCreators ===== //
export const initializeAppTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        dispatch(loggedInAC(true))
        dispatch(setInitializedAC(true))
        dispatch(setUserProfileAC(res))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    } finally {
        dispatch(setInitializedAC(true))
    }
}