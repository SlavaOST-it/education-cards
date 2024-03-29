import React, {ChangeEvent, FC, useEffect, useState} from 'react';

import {Search} from "@mui/icons-material";
import {InputAdornment, TextField} from "@mui/material";

import {setSearchCardsAC} from "../../../../bll/reducers/cards-reducer";
import {setUserNameSearchAC} from "../../../../bll/reducers/users-reducer";
import {setSearchInputPacksAC} from "../../../../bll/reducers/packs-reducer";

import {PacksOrCardsOrUsersType} from "../../../../common/types/types";

import {commonDisabled} from "../../../../utils/disabledOnBoot/disabledOnBoot";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../../utils/hooks/hooks";



type SearchInputType = {
    type: PacksOrCardsOrUsersType
}

export const SearchInput: FC<SearchInputType> = ({type}) => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.status)

    const searchInputPacks = useAppSelector(state => state.packs.searchInput)

    const searchInputCards = useAppSelector(state => state.cards.filterSearchValue)
    const searchInputUsers = useAppSelector(state => state.users.userName)


    let valueInput = ''
    if (type === 'pack') valueInput = searchInputPacks
    if (type === 'card') valueInput = searchInputCards
    if (type === 'users') valueInput = searchInputUsers

    const [value, setValue] = useState(valueInput)
    const debouncedValue = useDebounce<string>(value, 700)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        setValue(valueInput)
    }, [valueInput])

    useEffect(() => {
        if (debouncedValue !== valueInput) {
            if (type === 'pack') {
                dispatch(setSearchInputPacksAC(debouncedValue))
            }
            if (type === 'card') {
                dispatch(setSearchCardsAC(debouncedValue))
            }
            if (type === 'users') {
                dispatch(setUserNameSearchAC(debouncedValue))
            }
        }
    }, [debouncedValue])

    return (
        <div>
            <TextField
                onChange={onChangeHandler}
                value={value}
                size="small"
                id="input-with-icon-textfield"
                disabled={commonDisabled(appStatus)}
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
