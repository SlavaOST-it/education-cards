export type RegisterResponseType = {
    addedUser: {}
    error?: string;
}

export type LoginResponseType = {
    _id: string,
    email: string,
    name: string,
    rememberMe: boolean,
    publicCardPacksCount: number
}
