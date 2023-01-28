import React, {FC} from 'react';

import {deletePackTC} from "../../../../../bll/reducers/packs-reducer";
import {deleteCardTC} from "../../../../../bll/reducers/cards-reducer";

import {BasicModal} from "../../BasicModal";
import {styleButtonRedMUI} from "../../stylesModal";
import {useAppDispatch} from "../../../../../utils/hooks/hooks";



type DeletePackModalType = {
    active: boolean
    setActive: (active: boolean) => void
    name: string
    packId: string
    type: "card" | "pack"
    cardId: string
}

export const DeletePackModal: FC<DeletePackModalType> = ({cardId, packId, active, setActive, name, type}) => {
    const dispatch = useAppDispatch()

    const onSaveCallback = () => {
        if (type === "pack") {
            dispatch(deletePackTC(packId))
        } else {
            dispatch(deleteCardTC(packId, cardId))
        }
        setActive(false)
    }

    const onCloseHandler = () => {
        setActive(false)
    }

    return (
        <BasicModal
            active={active}
            setActive={onCloseHandler}
            onSaveCallback={onSaveCallback}
            nameButton={"Delete"}
            title={`Delete ${type}`}
            styleButton={styleButtonRedMUI}
        >
            {type === "pack" && (
                <div>
                    Do you really want to remove <b>{name}</b>?
                    All cards will be deleted.
                </div>
            )}

            {type === "card" && (
                <div>
                    Do you really want to remove <b>{name}</b>?
                    Card will be deleted.
                </div>
            )}

        </BasicModal>
    );
};
