import React, {FC, ReactNode, useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {setSortPacksValueAC} from "../../../../bll/reducers/packs-reducer";
import {AppStatus, PacksOrCardsType} from "../../../../common/types/types";
import {getCardsTC, sortCardsAC} from "../../../../bll/reducers/cards-reducer";
import {setValueSortUsersAC} from "../../../../bll/reducers/users-reducer";
import {commonDisabled} from "../../../../utils/disabledOnBoot/disabledOnBoot";


type SelectSortType = {
    type: PacksOrCardsType,
    valueSort: string,
    children?: ReactNode | JSX.Element
}
export const SelectSort: FC<SelectSortType> = ({type, valueSort,children}) => {
    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)

    const [selectedSort, setSelectedSort] = useState(true)

    const onclickUpHandler = () => {
        if(commonDisabled(appStatus)) {
            return
        }

        if (type === "pack")
            if(selectedSort){
                dispatch(setSortPacksValueAC(`0${valueSort}`))
            }else {
                dispatch(setSortPacksValueAC(`1${valueSort}`))
            }

        if (type === "card") {
            if (selectedSort){
                dispatch(sortCardsAC(`0${valueSort}`))
                dispatch(getCardsTC())
            }else {
                dispatch(sortCardsAC(`1${valueSort}`))
                dispatch(getCardsTC())
            }

        }

        if(type === 'users'){
            if(selectedSort){
                dispatch(setValueSortUsersAC(`1${valueSort}`))
            } else {
                dispatch(setValueSortUsersAC(`0${valueSort}`))
            }
        }
        setSelectedSort(!selectedSort)
    }

    return (
        <div onClick={onclickUpHandler}>
            {children}
            {selectedSort
                ? <ArrowDropDownIcon />
                : <ArrowDropDownIcon style={{transform: 'rotate(180deg)'}}/>}
        </div>
    )
}
