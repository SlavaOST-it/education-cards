import {profileAPI} from "../../api/profileAPI";
import {AppThunkType} from "../store/store";
import {setAppStatusAC, SetAppStatusAT} from "./app-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {UserType} from "../../api/apiConfig/types/profileAPI-types";
import {AxiosError} from "axios";
import {AppStatus} from "../../common/types/types";


const initialState: UserType = {
    _id: '',
    email: '',
    name: 'User',
    avatar: null as null | string,
    publicCardPacksCount: 0,
    rememberMe: false,
}

export const profileReducer = (state: UserType = initialState, action: ProfileActionsType): UserType => {
    switch (action.type) {
        case "PROFILE/SET_USER_PROFILE":
            return action.profile

        case "PROFILE/SET_USER_NAME":
            return {...state, name: action.userName}

        case "PROFILE/SET_USER_PHOTO":
            return {...state, avatar: action.photo}

        default:
            return {...state}
    }
}


// ================== ACTION CREATORS =======================//
export const setUserProfileAC = (profile: any) => ({type: "PROFILE/SET_USER_PROFILE", profile} as const)
export const setUserNameAC = (userName: string) => ({type: "PROFILE/SET_USER_NAME", userName} as const)
export const setUserPhotoAC = (photo: string | null) => ({type: "PROFILE/SET_USER_PHOTO", photo} as const)


// ================== THUNK CREATORS =======================//
export const changeNameThunkCreator = (newName: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        let res = await profileAPI.changeName(newName)
        dispatch(setUserNameAC(res.data.updatedUser.name))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const changeAvatarThunkCreator = (avatar: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC(AppStatus.LOADING))
    try {
        let res = await profileAPI.updatePhoto(avatar)
        dispatch(setUserPhotoAC(res.data.updatedUser.avatar))
        dispatch(setAppStatusAC(AppStatus.SUCCEED))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}


// ================== ACTION TYPES =======================//
export type SetUserNameAC = ReturnType<typeof setUserNameAC>
export type SetUserPhotoAT = ReturnType<typeof setUserPhotoAC>
export type SetUserProfileAT = ReturnType<typeof setUserProfileAC>

export type ProfileActionsType = SetUserProfileAT | SetUserNameAC | SetUserPhotoAT | SetAppStatusAT