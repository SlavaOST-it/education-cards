import * as React from 'react';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import {FormControl} from "@mui/material";
import {setPageCountAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {useState} from "react";
import {setPageCardsCountAC} from "../../../bll/reducers/cards-reducer";

export const SelectPage = () => {
    const dispatch = useAppDispatch()
    const pageCount = useAppSelector(state => JSON.stringify(state.packs.pageCount))
    const [page, setPage] = useState(pageCount)

    const onChangeHandler = (e: SelectChangeEvent) => {
        dispatch(setPageCountAC(JSON.parse(e.target.value)))
        dispatch(setPageCardsCountAC(JSON.parse(e.target.value)))
        setPage(e.target.value)
    }

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                <Select onChange={onChangeHandler} value={page}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}