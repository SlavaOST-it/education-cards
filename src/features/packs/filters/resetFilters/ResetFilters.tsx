import React, {FC} from 'react';
import Button from "@mui/material/Button";
import {
    getPacksTC,
    setIsMyPacksAC, setPageAC, setRerenderAC,
    setSearchInputPacksAC,
    setSortMinMaxCardsAC, setSortPacksValueAC
} from "../../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {setSearchCardsAC} from "../../../../bll/reducers/cards-reducer";
import {AppStatus, PacksOrCardsType} from "../../../../common/types/types";
import {
    setPageCountUsersAC,
    setPageUsersAC,
    setUserNameSearchAC, setValueMinMaxCardsUsersAC,
    setValueSortUsersAC
} from "../../../../bll/reducers/users-reducer";


const styleButton = {
    borderRadius: 5,
    fontSize: 10
}

type  ResetFiltersType = {
    type: PacksOrCardsType
}
export const ResetFilters: FC<ResetFiltersType> = ({type}) => {

    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)

    const page = useAppSelector(state => state.packs.page)
    const filterSearchValue = useAppSelector(state => state.packs.searchInput)
    const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
    const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const pageUsers = useAppSelector(state => state.users.page)
    const pageCountUsers = useAppSelector(state => state.users.pageCount)
    const searchNameUser = useAppSelector(state => state.users.userName)
    const sortUsers = useAppSelector(state => state.users.sortUsers)
    const minCardUsers = useAppSelector(state => state.users.min)
    const maxCardUsers = useAppSelector(state => state.users.max)
    const maxPublicCardPacksCount = useAppSelector(state => state.users.maxPublicCardPacksCount)

    const onclickResetFiltersPacksHandler = () => {
        if (
            page === 1 &&
            filterSearchValue === '' &&
            sortByAllMy === 'All' &&
            sortPacksValue === '0updated' &&
            min === 0 &&
            max === maxCardsCount
        ) {
            return
        }

        dispatch(setPageAC(1))
        dispatch(setSearchInputPacksAC(''))
        dispatch(setSearchCardsAC(''))
        dispatch(setIsMyPacksAC("All"))
        dispatch(setSortPacksValueAC(('0updated')))
        dispatch(setRerenderAC(false))
        dispatch(setSortMinMaxCardsAC(0, maxCardsCount))
        dispatch(getPacksTC())
    }

    const onclickResetFiltersUsersHandler = () => {
        if (
            pageUsers === 1 &&
            pageCountUsers === 5 &&
            searchNameUser === '' &&
            sortUsers === '0publicCardPacksCount' &&
            minCardUsers === 0 &&
            maxCardUsers === maxPublicCardPacksCount
        ) {
            return
        }

        dispatch(setPageUsersAC(1))
        dispatch(setPageCountUsersAC(5))
        dispatch(setUserNameSearchAC(""))
        dispatch(setValueSortUsersAC('0publicCardPacksCount'))
        dispatch(setValueMinMaxCardsUsersAC(0, maxPublicCardPacksCount))
    }

    const selectOnclickHandler = type === 'pack' ? onclickResetFiltersPacksHandler : onclickResetFiltersUsersHandler
    return (
        <Button sx={styleButton}
                size="small" variant="contained"
                onClick={selectOnclickHandler}
                disabled={appStatus === AppStatus.LOADING}
        >
            Reset
        </Button>
    );
};
