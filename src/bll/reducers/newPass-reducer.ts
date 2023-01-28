import {authAPI} from "../../api/authAPI";
import {AppThunkType} from "../store/store";
import {setAppStatusAC, SetAppStatusAT} from "./app-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";


const initialState = {
    infoMessage: '',
    statusChangePass: false
}
type InitialStateType = typeof initialState

export const setNewPassReducer = (state: InitialStateType = initialState, action: NewPassReducerActionType):InitialStateType => {
    switch (action.type) {
        case "NEW_PASS/SET_NEW_PASS":
            return {
                ...state,
                infoMessage: action.infoMessage,
                statusChangePass: true
            }
        default:
            return {...state}
    }
}

// ================== ACTION CREATORS =======================//
export const setNewPassAC = (infoMessage: string) => ({type: "NEW_PASS/SET_NEW_PASS", infoMessage} as const)


// ================== THUNK CREATORS =======================//
export const setNewPassTC = (newPassword: string, token: string | undefined): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        let res = await authAPI.setNewPas(newPassword, token)
        dispatch(setNewPassAC(res.info))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}


// ================== ACTION TYPES =======================//
export type SetNewPassAT = ReturnType<typeof setNewPassAC>

export type NewPassReducerActionType = SetNewPassAT | SetAppStatusAT