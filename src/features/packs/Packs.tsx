import React, {useEffect, useState} from 'react';
import {Navigate, useSearchParams} from "react-router-dom";

import s from "./Packs.module.css"

import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";

import {HeaderTable} from "../../common/components/headerTable/HeaderTable";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {AddPackModal} from "../../common/components/modals/packsModals/addPackModal/AddPackModal";

import {
    getPacksTC,
    setIsMyPacksAC,
    setPageAC,
    setPageCountAC, setRerenderAC,
    setSearchInputPacksAC,
    setSortMinMaxCardsAC,
    setSortPacksValueAC
} from "../../bll/reducers/packs-reducer";
import {PacksTable} from "./packsList/PacksTable";
import {Filters} from "./filters/Filters";
import {AppStatus} from "../../common/types/types";


export const Packs = () => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state=> state.app.status)
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)

    const page = useAppSelector(state => state.packs.page)
    const dataPacks = useAppSelector(state => state.packs.cardPacks)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const filterSearchValue = useAppSelector(state => state.packs.searchInput)
    const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
    const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const rerender = useAppSelector(state => state.packs.rerender)


    const [openAddPackModal, setOpenAddPackModal] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fromUrlPage = searchParams.get('page')
        const fromUrlPageCount = searchParams.get('pageCount')
        const fromUrlFilterSearchValue = searchParams.get('filterSearchValue')
        const fromUrlSortByAllMy = searchParams.get('sortByAllMy')
        const fromUrlSortPacksValue = searchParams.get('sortPacksValue')
        const fromUrlMin = searchParams.get('min')
        const fromUrlMax = searchParams.get('max')

        if (fromUrlPage !== null) {
            dispatch(setPageAC(Number(fromUrlPage)))
        }
        if (fromUrlPageCount !== null) {
            dispatch(setPageCountAC(Number(fromUrlPageCount)))
        }
        if (fromUrlFilterSearchValue !== null) {
            dispatch(setSearchInputPacksAC(fromUrlFilterSearchValue))
        }
        if (fromUrlSortByAllMy === 'All' || fromUrlSortByAllMy === 'My') {
            dispatch(setIsMyPacksAC(fromUrlSortByAllMy))
        }
        if (fromUrlSortPacksValue !== null) {
            dispatch(setSortPacksValueAC(fromUrlSortPacksValue))
        }
    }, [])

    useEffect(() => {
        setSearchParams({
            page: `${page}`,
            pageCount: `${pageCount}`,
            filterSearchValue: `${filterSearchValue}`,
            sortByAllMy: `${sortByAllMy}`,
            sortPacksValue: `${sortPacksValue}`,
            min: `${min}`,
            max: `${max}`,
        })
        if (!rerender) {
            dispatch(setRerenderAC(true))
            return
        }
        dispatch(getPacksTC())
    }, [page, pageCount, filterSearchValue, sortPacksValue, min, max])

    const addNewPackHandler = () => {
        setOpenAddPackModal(!openAddPackModal)
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.container}>
            <div>
                <HeaderTable type={"myPack"} title={'Packs list'} nameButton={'Add new pack'} callbackToAdd={addNewPackHandler}/>
            </div>

            <AddPackModal active={openAddPackModal} setActive={addNewPackHandler}/>

            {!dataPacks.length && appStatus === AppStatus.SUCCEED &&
                <div>В данной колоде нету карточек удовлетворяющих поиску</div>}

            <div>
                <Filters/>
            </div>

            <div>
                <PacksTable/>
            </div>

            <div className={s.pagination}>
                <BasicPagination type={'pack'}/>
            </div>
        </div>
    );
};
