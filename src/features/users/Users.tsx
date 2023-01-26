import React, {useEffect} from 'react';
import s from "./Users.module.css"
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {Navigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {
    getUsersTC,
    setPageCountUsersAC,
    setPageUsersAC,
    setUserNameSearchAC,
    setValueSortUsersAC
} from "../../bll/reducers/users-reducer";
import {BackToPacksList} from "../../common/components/backToPacksLink/BackToPacksList";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {SearchInput} from "../packs/filters/search/SearchInput";
import {RangeSlider} from "../packs/filters/rangeSlider/RangeSlider";
import {ResetFilters} from "../packs/filters/resetFilters/ResetFilters";
import {UsersTable} from "./usersTable/UsersTable";


export const Users = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)

    const page = useAppSelector(state => state.users.page)
    const pageCount = useAppSelector(state => state.users.pageCount)
    const min = useAppSelector(state => state.users.min)
    const max = useAppSelector(state => state.users.max)
    const userNameSearch = useAppSelector(state => state.users.userName)
    const sortCountCardUser = useAppSelector(state => state.users.sortUsers)

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fromUrlPage = searchParams.get('page')
        const fromUrlPageCount = searchParams.get('pageCount')
        const fromUrlMin = searchParams.get('min')
        const fromUrlMax = searchParams.get('max')
        const fromUrlUserNameSearch = searchParams.get('userNameSearch')
        const fromUrlSortCountCardUser = searchParams.get('sortCountCardUser')

        if (fromUrlPage !== null) {
            dispatch(setPageUsersAC(Number(fromUrlPage)))
        }
        if (fromUrlPage !== null) {
            dispatch(setPageCountUsersAC(Number(fromUrlPageCount)))
        }
        if (fromUrlUserNameSearch !== null) {
            dispatch(setUserNameSearchAC(fromUrlUserNameSearch))
        }
        if ( fromUrlSortCountCardUser !== null){
            dispatch(setValueSortUsersAC(fromUrlSortCountCardUser))
        }
    }, [])

    useEffect(() => {
        setSearchParams({
            page: `${page}`,
            pageCount: `${pageCount}`,
            min: `${min}`,
            max: `${max}`,
            userNameSearch: `${userNameSearch}`,
            sortCountCardUser: `${sortCountCardUser}`
        })

        dispatch(getUsersTC())
    }, [page, pageCount, min, max, userNameSearch, sortCountCardUser])

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.container}>

            <BackToPacksList type={'pack'} callBack={() => {
            }}/>

            <div className={s.filtersBlock}>
                <div className={s.searchInput}>
                    Search
                    <SearchInput type={'users'}/>
                </div>

                <div className={s.rangeSlider}>
                    Number of cards
                    <RangeSlider type={'users'}/>
                </div>

                <div>
                    <ResetFilters type={'users'}/>
                </div>
            </div>

            <div className={s.usersTable}>
                <UsersTable/>
            </div>

            <div className={s.pagination}>
                <BasicPagination type={"users"}/>
            </div>
        </div>
    );
};
