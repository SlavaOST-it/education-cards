import React, {ChangeEvent, FC} from 'react';
import s from "./BasicPagination.module.css"
import {Pagination, Stack} from "@mui/material";
import {setPageAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {setPageCardsAC} from '../../../bll/reducers/cards-reducer'
import {SelectPage} from "../handleChange/SelectPage";
import {AppStatus, PacksOrCardsType} from "../../types/types";


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


    const onChangeHandler = (e: ChangeEvent<unknown>, page: number) => {
        if (type === 'pack') dispatch(setPageAC(page))
        if (type === 'card') dispatch(setPageCardsAC(page))
    }

    let countPacks;
    type === 'pack' ? countPacks = Math.ceil(packsTotalCount / pagePacksCount) : countPacks = Math.ceil(cardsTotalCount / pageCardsCount)

    const valuePage = type === 'pack' ? pagePacks : pageCards

    return (
        <Stack sx={{p: 1}} spacing={2}>
            <div className={s.container}>
                <Pagination
                    page={valuePage}
                    onChange={onChangeHandler}
                    count={countPacks}
                    disabled={appStatus === AppStatus.LOADING}
                    color="primary"
                />

                Show <div className={s.page}><SelectPage/></div> Cards per Page
            </div>
        </Stack>
    );
};
