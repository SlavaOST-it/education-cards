import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import style from "./RangeSlider.module.css"
import {useAppDispatch, useAppSelector, useDebounce} from "../../../utils/hooks/hooks";
import {setCardsCountAC} from "../../../bll/reducers/packs-reducer";


export function RangeSlider() {
    const minCardsCount = useAppSelector(state => state.packList.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packList.maxCardsCount)
    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);
    const debouncedValue = useDebounce<number[]>(value, 700)
    const isStatus=useAppSelector(state=>state.app.status)

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    useEffect(() => {
        dispatch(setCardsCountAC(debouncedValue))
    }, [debouncedValue])

    useEffect(() => {
        setValue([minCardsCount, maxCardsCount])
    }, [minCardsCount, maxCardsCount])

    return (
        <Box sx={{width: 300}}>
            <div className={style.container}>
                <div className={style.value}>
                    {value[0]}
                </div>
                <Slider
                    disabled={isStatus==='loading'}
                    getAriaLabel={() => 'cards count range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
                <div className={style.value}>
                    {value[1]}
                </div>
            </div>

        </Box>
    );
}