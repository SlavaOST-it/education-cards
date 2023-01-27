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
    avatar: null | string
}