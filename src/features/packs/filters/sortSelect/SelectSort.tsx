import React, {FC} from 'react';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {setSortPacksValueAC} from "../../../../bll/reducers/packs-reducer";
import {PacksOrCardsType} from "../../../../common/types/types";
import {getCardsTC, sortCardsAC} from "../../../../bll/reducers/cards-reducer";


type SelectSortType = {
    type: PacksOrCardsType,
    valueSort: string
}
export const SelectSort: FC<SelectSortType> = ({type, valueSort}) => {
    const dispatch = useAppDispatch()
    const selectedPacks = useAppSelector(state => state.packs.sortPacksValue)
    const selectedCards = useAppSelector(state => state.cards.sortCards)

    const onclickUpHandler = () => {
        if (type === "pack") dispatch(setSortPacksValueAC(`0${valueSort}`))
        if (type === "card") {
            dispatch(sortCardsAC(`0${valueSort}`))
            dispatch(getCardsTC())
        }
    }

    const onclickDownHandler = () => {
        if (type === "pack") dispatch(setSortPacksValueAC(`1${valueSort}`))
        if (type === "card") {
            dispatch(sortCardsAC(`1${valueSort}`))
            dispatch(getCardsTC())
        }
    }

    return (
        <div>
            {(selectedPacks[0] === "1") || (selectedCards[0] === "1")
                ? <ArrowUpwardOutlinedIcon onClick={onclickUpHandler}/>
                : <ArrowDownwardOutlinedIcon onClick={onclickDownHandler}/>}
        </div>
    )
}