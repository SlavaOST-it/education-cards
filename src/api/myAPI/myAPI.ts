import {instance} from "../apiConfig/instance";
import {PackType} from "../../bll/reducers/packs-reducer";


export const myPackAPI = {
    getPacks(params: PacksParamsType){
        return instance.get<TResponsePack>(`cards/pack`, {params})
    }
}




export type PacksParamsType = {
    packName?: string;
    min?: string;
    max?: string;
    sortPacks?: string;
    page?: string;
    pageCount?: string;
    user_id?: string;
};

export type TResponsePack = {
    cardPacks: TPack[];
    page: number;
    user_id: string;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
};

export type TPack = {
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