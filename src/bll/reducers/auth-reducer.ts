import {authAPI} from "../../api/authAPI";
import {setAppStatusAC} from "./app-reducer";
import {AppThunkType} from "../store/store";
import {setInitializedAC} from "./app-reducer";
import {setUserProfileAC} from "./profile-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    data: {
        email: '',
        rememberMe: false,
        name: '',
        publicCardPacksCount: 0
    },
    loggedIn: false,
    passwordError: ''
}
type InitialStateType = typeof initialState
export type LoginActionType = loggedInACType | passwordErrorACType

export const authReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case "LOGGED_IN": {
            return {...state, loggedIn: action.loggedIn}
        }
        case "PASSWORD_ERROR": {
            return {...state, passwordError: action.error}
        }
        default:
            return {...state}
    }
}

// ===== ActionCreators ===== //
type loggedInACType = ReturnType<typeof loggedInAC>
export const loggedInAC = (loggedIn: boolean) => {
    return {type: "LOGGED_IN", loggedIn} as const
}

type passwordErrorACType = ReturnType<typeof passwordErrorAC>
export const passwordErrorAC = (error: string) => {
    return {type: "PASSWORD_ERROR", error} as const
}

// ===== ThunkCreators ===== //
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(email, password, rememberMe)
        dispatch(loggedInAC(true))
        dispatch(setInitializedAC(true))
        dispatch(setUserProfileAC(res))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const logoutThunkCreator = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    await authAPI.logout()
    try {
        dispatch(loggedInAC(false))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}
