import {authAPI} from "../../api/authAPI";
import {AppThunkType} from "../store/store";
import {setAppStatusAC, SetAppStatusAT} from "./app-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";


export type InfoMessageAT = ReturnType<typeof infoMessageAC>
export type StatusSendMessageAT = ReturnType<typeof statusSendMessageAC>
export type PassRecoveryActionType = InfoMessageAT | StatusSendMessageAT | SetAppStatusAT

const initialState = {
    textMessage: '',
    statusSendMessage: false
}
type InitialStateType = typeof initialState

export const passRecoveryReducer = (state: InitialStateType = initialState, action: PassRecoveryActionType) :InitialStateType => {      // вместо any указать типизицию
    switch (action.type) {
        case "PASS_RECOVERY/passRecovery":
            return {
                ...state,
                textMessage: action.infoMessage
            }
        case "PASS_RECOVERY/CHANGE-STATUS-SEND-MESSAGE":
            return {
                ...state,
                statusSendMessage: true
            }
        default:
            return {...state}
    }
}
// ======ActionCreators ===== //
export const infoMessageAC = (infoMessage: string) => ({type: "PASS_RECOVERY/passRecovery", infoMessage} as const)
export const statusSendMessageAC = (status: boolean) => ({
    type: "PASS_RECOVERY/CHANGE-STATUS-SEND-MESSAGE",
    status
} as const)

// ======ThunkCreators ===== //
export const sendEmailTC = (email: string):AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authAPI.sendEmail(email)
        dispatch(infoMessageAC(res.info))
        dispatch(statusSendMessageAC(true))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}