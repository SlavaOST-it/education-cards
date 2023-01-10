import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../../utils/hooks/hooks";
import {setSearchInputPacksAC} from "../../../../bll/reducers/packs-reducer";
import {AppStatus, PacksOrCardsType} from "../../../../common/types/types";
import {setSearchCardsAC} from "../../../../bll/reducers/cards-reducer";


type SearchInputType = {
    type: PacksOrCardsType
}
export const SearchInput: FC<SearchInputType> = ({type}) => {
    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)
    const searchInputPacks = useAppSelector(state => state.packs.searchInput)
    const searchInputCards = useAppSelector(state => state.cards.cardQuestion)

    const valueInput = type === 'pack' ? searchInputPacks : searchInputCards
    const [value, setValue] = useState(valueInput)
    const debouncedValue = useDebounce<string>(value, 700)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    useEffect(()=>{
        setValue(valueInput)
    }, [valueInput])

    useEffect(() => {
        if(debouncedValue !== valueInput)
        if(type==='pack'){
            dispatch(setSearchInputPacksAC(debouncedValue))
        } else {
            dispatch(setSearchCardsAC(debouncedValue))
        }
    }, [debouncedValue])

    return (
        <div>
            <TextField
                onChange={onChangeHandler}
                value={value}
                size="small"
                id="input-with-icon-textfield"
                disabled={appStatus === AppStatus.LOADING}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
            />
        </div>
    );
};

