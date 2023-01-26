import React, {FC, useEffect, useState} from 'react';
import s from "./RangeSlider.module.css"

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import {useAppDispatch, useAppSelector, useDebounce} from "../../../../utils/hooks/hooks";
import {AppStatus, PacksOrCardsType} from "../../../../common/types/types";
import {setSortMinMaxCardsAC} from "../../../../bll/reducers/packs-reducer";
import {setValueMinMaxCardsUsersAC} from "../../../../bll/reducers/users-reducer";
import {commonDisabled} from "../../../../utils/disabledOnBoot/disabledOnBoot";


type RangeSliderType = {
    type: PacksOrCardsType
}

export const RangeSlider: FC<RangeSliderType> = ({type}) => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.status)

    const minCards = useAppSelector(state => state.packs.min)
    const maxCards = useAppSelector(state => state.packs.max)
    const minCardsPackCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsPackCount = useAppSelector(state => state.packs.maxCardsCount)

    const minCardsUser = useAppSelector(state => state.users.min)
    const maxCardsUser = useAppSelector(state => state.users.max)
    const minPublicCardPacksCount = useAppSelector(state => state.users.minPublicCardPacksCount)
    const maxPublicCardPacksCount = useAppSelector(state => state.users.maxPublicCardPacksCount)


    let min = 0
    let max = 0
    let minCardsCount = 0
    let maxCardsCount = 0

    if (type === 'pack') {
        min = minCards
        max = maxCards
        minCardsCount = minCardsPackCount
        maxCardsCount = maxCardsPackCount
    }

    if (type === 'users') {
        min = minCardsUser
        max = maxCardsUser
        minCardsCount = minPublicCardPacksCount
        maxCardsCount = maxPublicCardPacksCount
    }

    const [value, setValue] = useState<number[]>([min, max]);
    const debouncedValue = useDebounce<number[]>(value, 700)

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        setValue([0, maxCardsCount])
    }, [maxCardsCount])


    useEffect(() => {
        setValue([min, max])
    }, [min, max])


    useEffect(() => {
        if (type === 'pack') dispatch(setSortMinMaxCardsAC(debouncedValue[0], debouncedValue[1]))
        if (type === 'users') dispatch(setValueMinMaxCardsUsersAC(debouncedValue[0], debouncedValue[1]))
    }, [debouncedValue])

    return (
        <Box sx={{width: 300}}>
            <div className={s.container}>
                <div className={s.value}>
                    {value[0]}
                </div>
                <Slider
                    disabled={commonDisabled(appStatus)}
                    value={value}
                    min={minCardsCount}
                    max={maxCardsCount}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
                <div className={s.value}>
                    {value[1]}
                </div>
            </div>
        </Box>
    );
}