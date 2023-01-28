import React, {ChangeEvent, FC, useState} from 'react';

import {Checkbox, TextField} from '@mui/material';

import {BasicModal} from "../../BasicModal";
import {changePackTC, setDeckCoverAC} from "../../../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../utils/hooks/hooks";
import {CoverInput} from "../../../coverInput/CoverInput";
import {baseDeckCover} from "../../../../../assets/baseDeckCover";
import {styleButtonMUI} from '../../stylesModal';



type EditPackModalType = {
    active: boolean
    setActive: (active: boolean) => void
    packId: string
    name: string
    deckCover: string
}

export const EditPackModal: FC<EditPackModalType> = ({deckCover, name, packId, active, setActive}) => {
    const dispatch = useAppDispatch()
    const myDeckCover = useAppSelector(state => state.packs.coverImg)

    const [value, setValue] = useState(name)
    const [checkValue, setCheckValue] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        dispatch(changePackTC(packId, value, checkValue, myDeckCover))
        dispatch(setDeckCoverAC(baseDeckCover))
        setActive(false)
    }

    const onCancelHandler = () => {
        setActive(false)
    }

    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckValue(e.currentTarget.checked)
    }

    return (
        <BasicModal
            title={"Edit pack"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={value.length === 0}
            styleButton={styleButtonMUI}
        >
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

            <CoverInput deckCover={deckCover}/>

            <div>
                <Checkbox onChange={onChangeChecked} value={checkValue}/>Private pack
            </div>
        </BasicModal>
    );
};