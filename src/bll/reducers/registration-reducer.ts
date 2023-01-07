import {authAPI} from '../../api/authAPI'
import {setAppStatusAC} from "./app-reducer";
import {AppThunkType} from "../store/store";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";

export type SetRegisterInType = ReturnType<typeof setRegisterIn>
export type RegisterType = {
    email: string
    password: string
}

const initialState = {
    isRegisterIn: false
}

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: SetRegisterInType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET_REGISTER_IN":
            return {isRegisterIn: action.value}
        default:
            return state
    }
}

// ===== Action Creators ===== //
export const setRegisterIn = (isRegisterIn: boolean) => {
    return {
        type: "REGISTER/SET_REGISTER_IN",
        value: isRegisterIn
    } as const
}

// ===== Thunk Creators ===== //
export const RegisterTC = (data: RegisterType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await authAPI.register(data)
        dispatch(setRegisterIn(true))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}
