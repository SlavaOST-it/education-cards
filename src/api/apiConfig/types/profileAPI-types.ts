export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar: null | string;
    publicCardPacksCount: number;
    rememberMe: boolean;
}

export type UserResponseType = {
    updatedUser: {
        _id: string;
        email: string;
        name: string;
        avatar: null | string;
        publicCardPacksCount: number;
        rememberMe: boolean;
    }
}