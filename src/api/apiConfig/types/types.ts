
// ===== AUTH TYPE ===== //
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


// ===== PROFILE TYPE ===== //
export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar: null | string;
    publicCardPacksCount: number;
    rememberMe: boolean;
}


// ===== PACKS TYPE ===== //
export type PacksParamsType = {
    packName?: string;
    min?: string;
    max?: string;
    sortPacks?: string;
    page?: string;
    pageCount?: string;
    user_id?: string;
};

export type PacksType = {
    cardPacks: [];
    page: number;
    user_id: string;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
};



// ===== CARDS TYPE ===== //