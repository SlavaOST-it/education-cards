import {instance} from "./apiConfig/instance";
import {UsersRequestType, UsersResponseType} from "./apiConfig/types/usersAPI-types";


export const usersAPI = {
    getUsers(data: UsersRequestType) {
        return instance.get<UsersResponseType>(`/social/users`, {params: {...data}})
    }
}
