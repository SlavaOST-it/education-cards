import {instance} from "./apiConfig/instance";
import {UserResponseType} from "./apiConfig/types/profileAPI-types";


export const profileAPI = {
    changeName(newName: string) {
        return instance.put<UserResponseType>(`/auth/me`, {name: newName})
    },

    updatePhoto(avatar: string) {
        return instance.put<UserResponseType>(`/auth/me`, {avatar})
    }
}

