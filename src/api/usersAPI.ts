import {instance} from "./apiConfig/instance";


export const usersAPI = {
    getUsers(data: UsersRequestType) {
        return instance.get<UsersResponseType>('/social/users', {params: {...data}})
    }
}


export type UsersRequestType = {
    userName?: string
    min?: number
    max?: number
    sortUsers?: string
    page?: number
    pageCount?: number
}

export type UsersResponseType = {
    users: UsersType[],

    page: number,
    pageCount: number,
    usersTotalCount: number,
    minPublicCardPacksCount: number,
    maxPublicCardPacksCount: number,
    sortUsers: string
}

export type UsersType = {
    _id: string
    email: string
    isAdmin: boolean,
    name: string,
    verified: false,
    publicCardPacksCount: number,
    avatar: string
}