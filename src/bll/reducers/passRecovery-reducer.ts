import {authAPI} from "../../api/authAPI";
import {AppThunkType} from "../store/store";
import {setAppStatusAC, SetAppStatusAT} from "./app-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";


export type InfoMessageAT = ReturnType<typeof infoMessageAC>
export type StatusSendMessageAT = ReturnType<typeof statusSendMessageAC>
export type PassRecoveryActionsType = InfoMessageAT | StatusSendMessageAT | SetAppStatusAT

const initialState = {
    textMessage: '',
    statusSendMessage: false
}
type InitialStateType = typeof initialState

export const passRecoveryReducer = (state: InitialStateType = initialState, action: PassRecoveryActionsType): InitialStateType => {      // вместо any указать типизицию
    switch (action.type) {
        case "PASS_RECOVERY/PASS_RECOVERY":
            return {
                ...state,
                textMessage: action.infoMessage
            }
        case "PASS_RECOVERY/CHANGE_STATUS_SEND_MESSAGE":
            return {
                ...state,
                statusSendMessage: true
            }
        default:
            return {...state}
    }
}


// ================== ACTION CREATORS =======================//
export const infoMessageAC = (infoMessage: string) => ({type: "PASS_RECOVERY/PASS_RECOVERY", infoMessage} as const)

export const statusSendMessageAC = (status: boolean) => ({
    type: "PASS_RECOVERY/CHANGE_STATUS_SEND_MESSAGE",
    status
} as const)


// ================== THUNK CREATORS =======================//
export const sendEmailTC = (email: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        let res = await authAPI.sendEmail(email)
        dispatch(infoMessageAC(res.info))
        dispatch(statusSendMessageAC(true))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}