import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import s from "./RangeSlider.module.css"
import {useAppDispatch, useAppSelector, useDebounce} from "../../../../utils/hooks/hooks";
import {AppStatus} from "../../../../common/types/types";
import {setSortMinMaxCardsAC} from "../../../../bll/reducers/packs-reducer";


export const RangeSlider = () => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.status)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const rerender = useAppSelector(state => state.packs.rerender)
    const minCardsPackCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsPackCount = useAppSelector(state => state.packs.maxCardsCount)


    const [value, setValue] = useState<number[]>([min, max]);
    const debouncedValue = useDebounce<number[]>(value, 700)

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {

            setValue([0, maxCardsPackCount])

    }, [maxCardsPackCount])


    useEffect(() => {
        setValue([min, max])
    }, [min, max])


    useEffect(() => {
        dispatch(setSortMinMaxCardsAC(debouncedValue[0], debouncedValue[1]))
    }, [debouncedValue])

    return (
        <Box sx={{width: 300}}>
            <div className={s.container}>
                <div className={s.value}>
                    {value[0]}
                </div>
                <Slider
                    disabled={appStatus === AppStatus.LOADING}
                    // getAriaLabel={() => 'cards count range'}
                    value={value}
                    min={0}
                    max={maxCardsPackCount}
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