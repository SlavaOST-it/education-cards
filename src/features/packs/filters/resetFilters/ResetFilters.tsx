import React from 'react';
import Button from "@mui/material/Button";
import {
    getPacksTC,
    setIsMyPacksAC, setPageAC, setRerenderAC,
    setSearchInputPacksAC,
    setSortMinMaxCardsAC, setSortPacksValueAC
} from "../../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {setSearchCardsAC} from "../../../../bll/reducers/cards-reducer";
import {AppStatus} from "../../../../common/types/types";


const styleButton = {
    borderRadius: 5,
    fontSize: 10
}
export const ResetFilters = () => {

    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)

    const page = useAppSelector(state => state.packs.page)

    const filterSearchValue = useAppSelector(state => state.packs.searchInput)
    const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
    const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)

    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)


    const onclickResetFiltersHandler = async () => {
        dispatch(setPageAC(1))
        dispatch(setSearchInputPacksAC(''))
        dispatch(setSearchCardsAC(''))
        dispatch(setIsMyPacksAC("All"))
        dispatch(setSortPacksValueAC(('0updated')))
        dispatch(setSortMinMaxCardsAC(0, maxCardsCount))
    }

    return (
        <Button sx={styleButton}
                size="small" variant="contained"
                onClick={onclickResetFiltersHandler}
                disabled={appStatus === AppStatus.LOADING}
        >
            Reset
        </Button>
    );
};
