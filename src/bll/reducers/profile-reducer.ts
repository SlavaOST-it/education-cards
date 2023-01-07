import {profileAPI} from "../../api/profileAPI";
import {AppThunkType} from "../store/store";
import {setAppStatusAC, SetAppStatusAT} from "./app-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";


export type SetUserProfileAT = ReturnType<typeof setUserProfileAC>
export type SetUserNameAC = ReturnType<typeof setUserNameAC>
export type SetUserPhotoAT = ReturnType<typeof setUserPhotoAC>
export type ProfileActionsType = SetUserProfileAT | SetUserNameAC | SetUserPhotoAT | SetAppStatusAT

type InitialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string | null;
    rememberMe: boolean;
}
const initialState: InitialStateType = {
    _id: '',
    email: '',
    name: 'test name',
    avatar: null,
    rememberMe: false,
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET_USER_PROFILE":
            return action.profile

        case "PROFILE/SET_USER_NAME":
            return {
                ...state,
                name: action.userName
            }

        case "PROFILE/SET_USER_PHOTO":
            return {
                ...state,
                avatar: action.photo
            }

        default:
            return {...state}
    }
}
// ==================ACTION CREATORS =======================//
export const setUserProfileAC = (profile: any) => ({type: "PROFILE/SET_USER_PROFILE", profile} as const)
export const setUserNameAC = (userName: string) => ({type: "PROFILE/SET_USER_NAME", userName} as const)
export const setUserPhotoAC = (photo: string) => ({type: "PROFILE/SET_USER_PHOTO", photo} as const)

// ==================THUNK CREATORS =======================//
export const changeNameThunkCreator = (newName: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        let res = await profileAPI.changeName(newName)
        dispatch(setUserNameAC(res.updatedUser.name))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const changeAvatarThunkCreator = (avatar: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        let res = await profileAPI.updatePhoto(avatar)
        dispatch(setUserPhotoAC(res.updatedUser.avatar))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}