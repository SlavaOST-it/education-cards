import React, {FC} from 'react';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {setSortPacksValueAC} from "../../../../bll/reducers/packs-reducer";
import {PacksOrCardsType} from "../../../../common/types/types";
import {sortCardsAC} from "../../../../bll/reducers/cards-reducer";


type SelectSortType = {
    type: PacksOrCardsType,
    valueSort: string
}
export const SelectSort: FC<SelectSortType> = ({type, valueSort}) => {
    const dispatch = useAppDispatch()
    const selected = useAppSelector(state => state.packs.sortPacksValue)

    const onclickUpHandler = () => {
        if (type === "pack") dispatch(setSortPacksValueAC(`0${valueSort}`))
        else dispatch(sortCardsAC(`0${valueSort}`))
    }

    const onclickDownHandler = () => {
        if (type === "pack") dispatch(setSortPacksValueAC(`1${valueSort}`))
        else dispatch(sortCardsAC(`1${valueSort}`))
    }

    return (
        <div>
            {selected[0] === "1"
                ? <ArrowUpwardOutlinedIcon onClick={onclickUpHandler}/>
                : <ArrowDownwardOutlinedIcon onClick={onclickDownHandler}/>}
        </div>
    )
}