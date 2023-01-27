import {authAPI} from "../../api/authAPI";
import {setAppStatusAC, setInitializedAC} from "./app-reducer";
import {AppThunkType} from "../store/store";
import {setUserProfileAC} from "./profile-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";


type LoggedInAT = ReturnType<typeof loggedInAC>
export type LoginActionsType = LoggedInAT


const initialState = {
    data: {
        email: '',
        rememberMe: false,
        name: '',
        publicCardPacksCount: 0
    },
    loggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case "LOGGED_IN": {
            return {...state, loggedIn: action.loggedIn}
        }

        default:
            return {...state}
    }
}


// ================== ACTION CREATORS =======================//
export const loggedInAC = (loggedIn: boolean) => ({type: "LOGGED_IN", loggedIn} as const)


// ================== THUNK CREATORS =======================//
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        const res = await authAPI.login(email, password, rememberMe)
        dispatch(loggedInAC(true))
        dispatch(setInitializedAC(true))
        dispatch(setUserProfileAC(res))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const logoutThunkCreator = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    await authAPI.logout()
    try {
        dispatch(loggedInAC(false))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}
