
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
    cardPacks: PackType[];
    page: number;
    user_id: string;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
};

export type PackType = {
    _id: string;
    cardsCount: number;
    created: string;
    grade: number;
    more_id: string;
    path: string;
    name: string;
    type: string;
    private: boolean;
    rating: number;
    shots: number;
    updated: string;
    user_id: string;
    user_name: string;
    deckCover: string;
};

// ===== CARDS TYPE ===== //