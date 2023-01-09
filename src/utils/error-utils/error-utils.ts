import axios, {AxiosError} from "axios";
import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../bll/reducers/app-reducer";
import {Dispatch} from "redux";
import {AppStatus} from "../../common/types/types";


export const baseErrorHandler = (e: Error | AxiosError, dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>) =>{
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data
            ? (err.response.data as ({ error: string })).error
            : err.message
        dispatch(setAppStatusAC(AppStatus.FAILED))
        dispatch(setAppErrorAC(error))
}}