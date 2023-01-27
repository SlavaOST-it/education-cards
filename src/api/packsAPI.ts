import {instance} from "./apiConfig/instance";
import {
    CreatePackType,
    PacksRequestType,
    PacksResponseType,
    PackType,
    UpdatePackType
} from "./apiConfig/types/packsAPI-types";


export const packsAPI = {
    getPacks(payload: PacksRequestType) {
        return instance.get<PacksResponseType>('cards/pack', {params: {...payload}})
    },

    createPack(payload: CreatePackType) {
        return instance.post<PackType>('cards/pack', {cardsPack: {...payload}})
    },

    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },

    updatePack(payload: UpdatePackType) {
        return instance.put<PackType>('cards/pack', {cardsPack: {...payload}})
    }
}
