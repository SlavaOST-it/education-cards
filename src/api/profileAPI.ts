import {instance} from "./apiConfig/instance";

export const profileAPI = {
    changeName(newName: string) {
        return instance.put(`/auth/me`, {name: newName})
    },

    updatePhoto(avatar: string) {
        return instance.put(`/auth/me`, {avatar})
    }
}

