import React, {ChangeEvent, FC} from 'react';
import s from "./BasicPagination.module.css"
import {Pagination, Stack} from "@mui/material";
import {setPageAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {setPageCardsAC} from '../../../bll/reducers/cards-reducer'
import {SelectPage} from "../handleChange/SelectPage";
import {PacksOrCardsType} from "../../types/types";
import {setPageUsersAC} from "../../../bll/reducers/users-reducer";
import {commonDisabled} from "../../../utils/disabledOnBoot/disabledOnBoot";


type BasicPaginationType = {
    type: PacksOrCardsType
}

export const BasicPagination: FC<BasicPaginationType> = ({type}) => {
    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)

    const pagePacks = useAppSelector(state => state.packs.page)
    const packsTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const pagePacksCount = useAppSelector(state => state.packs.pageCount)

    const pageCards = useAppSelector(state => state.cards.page)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const pageCardsCount = useAppSelector(state => state.cards.pageCount)

    const pageUser = useAppSelector(state => state.users.page)
    const pageCountUsers = useAppSelector(state => state.users.pageCount)
    const usersTotalCount = useAppSelector(state => state.users.usersTotalCount)


    const onChangeHandler = (e: ChangeEvent<unknown>, page: number) => {
        if (type === 'pack') dispatch(setPageAC(page))
        if (type === 'card') dispatch(setPageCardsAC(page))
        if (type === 'users') dispatch(setPageUsersAC(page))
    }

    let countPacks;
    if(type === 'pack') {
        countPacks = Math.ceil(packsTotalCount / pagePacksCount)
    }
    if(type === 'card'){
        countPacks = Math.ceil(cardsTotalCount / pageCardsCount)
    }
    if(type === 'users'){
        countPacks = Math.ceil(usersTotalCount / pageCountUsers)
    }


    let valuePage
    if(type === 'pack'){
        valuePage = pagePacks
    }
    if(type === 'card'){
        valuePage = pageCards
    }
    if(type === 'users'){
        valuePage = pageUser
    }

    return (
        <Stack sx={{p: 1}} spacing={2}>
            <div className={s.container}>
                <Pagination
                    page={valuePage}
                    onChange={onChangeHandler}
                    count={countPacks}
                    disabled={commonDisabled(appStatus)}
                    color="primary"
                />

                Show <div className={s.page}><SelectPage/></div> Cards per Page
            </div>
        </Stack>
    );
};
