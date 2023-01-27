import {SortPacksAllMyType} from "../../../bll/reducers/packs-reducer";

export type PacksRequestType = {
    page?: number,
    pageCount?: number,
    sortByAllMy: SortPacksAllMyType,
    searchInput?: string
    sortPacks?: string,
    packName?: string,
    user_id?: string,
    min?: number,
    max?: number
}

export type PacksResponseType = {
    cardPacks: PackType[],
    page: number,
    pageCount: number,
    sort: string,
    search: string,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
}

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

export type CreatePackType = {
    name: string,
    isPrivate: boolean,
    deckCover?: string
}

export type UpdatePackType = {
    _id: string,
    name: string,
    isPrivate: boolean,
    deckCover?: string
}