import * as React from 'react';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import {setSortAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {sortCardsAC} from '../../../bll/reducers/cards-reducer'

export const SelectSort = () => {
    const dispatch = useAppDispatch()
    const selected = useAppSelector(state => state.packList.selected)

    const onclickUpHandler = () => {
        dispatch(setSortAC('0name', false))
        dispatch(sortCardsAC('0question', false))
    }
    const onclickDownHandler = () => {
        dispatch(setSortAC('1name', true))
        dispatch(sortCardsAC('1question', true))
    }
    return <div>
        {selected ? <ArrowUpwardOutlinedIcon onClick={onclickUpHandler}/> :
            <ArrowDownwardOutlinedIcon onClick={onclickDownHandler}/>}
    </div>

}