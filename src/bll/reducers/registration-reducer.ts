import {authAPI} from '../../api/authAPI'
import {setAppStatusAC} from "./app-reducer";
import {AppThunkType} from "../store/store";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";
import {RegisterRequestType} from "../../api/apiConfig/types/authAPI-types";


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


// ================== ACTION CREATORS =======================//
export const setRegisterIn = (isRegisterIn: boolean) => {
    return {
        type: "REGISTER/SET_REGISTER_IN",
        value: isRegisterIn
    } as const
}


// ================== THUNK CREATORS =======================//
export const RegisterTC = (data: RegisterRequestType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        await authAPI.register(data)
        dispatch(setRegisterIn(true))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}


// ================== ACTION TYPES =======================//
export type SetRegisterInType = ReturnType<typeof setRegisterIn>