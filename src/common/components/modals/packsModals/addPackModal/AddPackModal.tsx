import React, {ChangeEvent, FC, useState} from 'react';

import {Checkbox, TextField} from '@mui/material';
import {styleButtonMUI} from '../../stylesModal';
import {BasicModal} from "../../BasicModal";

import {useAppDispatch, useAppSelector} from "../../../../../utils/hooks/hooks";
import {addNewPackTC, setDeckCoverAC} from "../../../../../bll/reducers/packs-reducer";
import {CoverInput} from "../../../coverInput/CoverInput";
import {baseDeckCover} from "../../../../../assets/baseDeckCover";


type AddPackModalType = {
    active: boolean
    setActive: (active: boolean) => void
}

export const AddPackModal: FC<AddPackModalType> = ({active, setActive}) => {
    const dispatch = useAppDispatch()
    const myDeckCover = useAppSelector(state => state.packs.coverImg)

    const [value, setValue] = useState('')
    const [checkValue, setCheckValue] = useState(false)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        dispatch(addNewPackTC(value, checkValue, myDeckCover))
        dispatch(setDeckCoverAC(baseDeckCover))
        setActive(false)
        setValue('')
    }

    const onCancelHandler = () => {
        setActive(false)
        setValue('')
    }

    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckValue(e.currentTarget.checked)
    }

    return (
        <BasicModal
            title={"Add new pack"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={value.length === 0}
            styleButton={styleButtonMUI}
        >
            <CoverInput deckCover={''}/>
            <div>
                <TextField
                    value={value}
                    label="Name pack"
                    margin="normal"
                    fullWidth={true}
                    placeholder={"Name pack"}
                    onChange={onChangeHandler}
                />
            </div>
            <div>
                <Checkbox onChange={onChangeChecked} value={checkValue}/>Private pack
            </div>
        </BasicModal>
    );
};
