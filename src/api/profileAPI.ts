import {instance} from "./apiConfig/instance";

export const profileAPI = {
    changeName(newName: string) {
        return instance.put(`/auth/me`, {name: newName})
            .then(res => res.data)
    },

    updatePhoto(avatar: string) {
        return instance.put(`/auth/me`, {avatar})
            .then(res => res.data)
    }
}