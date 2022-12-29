import React, {ChangeEvent} from 'react';
import {Pagination, Stack} from "@mui/material";
import {setPageAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {setPageCardsAC} from '../../../bll/reducers/cards-reducer'
import style from "./BasicPagination.module.css"
import {SelectPage} from "../handleChange/SelectPage";

type BasicPaginationType = { type: PaginationType }
type PaginationType = 'cards' | 'packs'

export const BasicPagination = (props: BasicPaginationType) => {
    const dispatch = useAppDispatch()
    const packsTotalCount = useAppSelector(state => state.packList.cardPacksTotalCount)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const pagePacksCount = useAppSelector(state => state.packList.pageCount)
    const pageCardsCount = useAppSelector(state => state.cards.pageCount)

    const onChangeHandler = (e: ChangeEvent<unknown>, page: number) => {
        dispatch(setPageAC(page))
        dispatch(setPageCardsAC(page))
    }

    let countPacks;
    props.type === 'packs' ? countPacks = Math.ceil(packsTotalCount / pagePacksCount) : countPacks = Math.ceil(cardsTotalCount / pageCardsCount)


    return (
        <Stack sx={{p: 1}} spacing={2}>
            <div className={style.container}>
                <Pagination onChange={onChangeHandler} count={countPacks} color="primary"/>
                Show <div className={style.page}><SelectPage/></div> Cards per Page
            </div>
        </Stack>
    );
};
