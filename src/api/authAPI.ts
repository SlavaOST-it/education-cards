import axios from "axios"
import {RegisterType} from '../bll/reducers/registration-reducer'
import {instance} from "./instance"


export const authAPI = {
    me() {
        return instance.post('auth/me').then(res => res.data)
    },
    login: (email: string, password: string, rememberMe: boolean) => {
        return instance.post<LoginResponseType>('auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe
        })
            .then(res => res.data)
    },
    logout: () => {
        return instance.delete('/auth/me')
    },
    register(data: RegisterType) {
        return instance.post<RegisterResponseType>('auth/register', data)
    }
}

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

export const forgotPassAPI = {
    sendEmail(email: string) {
        return axios.post(`https://neko-back.herokuapp.com/2.0/auth/forgot`,
            {
                email: email,
                message: "`<h3>password recovery link: <a href='http://localhost:3000/#/setNewPass/$token$'>link</a></h3>`"
            })
            .then(res => res.data)
    },
    setNewPas(newPass: string, token: string | undefined) {
        return axios.post(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, {
            password: newPass,
            resetPasswordToken: token
        }).then(res => res.data)
    }
}

//types response
export type RegisterResponseType = {
    addedUser: {}
    error?: string;
}

type LoginResponseType = {
    _id: string,
    email: string,
    name: string,
    rememberMe: boolean,
    publicCardPacksCount: number
}
