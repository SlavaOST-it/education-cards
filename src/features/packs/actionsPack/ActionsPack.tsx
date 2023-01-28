import React, {FC, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

import s from "./ActionsPack.module.css"

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import {setCurrentPackIdAC} from "../../../bll/reducers/cards-reducer";
import {setCardsPackIdInLearnAC} from "../../../bll/reducers/learn-reducer";

import {AppStatus} from "../../../common/types/types";
import {AddCardModal} from "../../../common/components/modals/cardsModals/addCardModal/AddCardModal";
import {EditPackModal} from "../../../common/components/modals/packsModals/editPackModal/EditPackModal";
import {EditCardModal} from "../../../common/components/modals/cardsModals/changeCardModal/EditCardModal";
import {DeletePackModal} from "../../../common/components/modals/packsModals/deletePackModal/DeletePackModal";

import {PATH} from "../../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {commonDisabled} from "../../../utils/disabledOnBoot/disabledOnBoot";



type ActionsPackType = {
    type: 'pack' | 'card'
    packId: string,
    cardId: string
    userId: string,
    packName: string
    deckCover: string
    question: string
    questionImg: string
    answer: string
    disabled: boolean
}

export const ActionsPack: FC<ActionsPackType> = ({
                                                     type,
                                                     deckCover,
                                                     userId,
                                                     packId,
                                                     cardId,
                                                     packName,
                                                     question,
                                                     questionImg,
                                                     answer,
                                                     disabled
                                                 }) => {
    const dispatch = useAppDispatch()

    const myId = useAppSelector(state => state.profile._id)
    const appStatus = useAppSelector((state) => state.app.status)

    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeEditCardModal, setActiveEditCardModal] = useState(false)

     const learnPackHandler = () => {
        dispatch(setCardsPackIdInLearnAC(packId))
        dispatch(setCurrentPackIdAC(packId))
    }

    const onActiveModal = () => setActiveDeleteModal(!activeDeleteModal)
    const onActiveEditModal = () => setActiveEditModal(!activeEditModal)
    const onActiveEditCardModal = () => setActiveEditCardModal(!activeEditCardModal)

    return (
        <div className={s.actionBtn}>
            {((type === 'pack') && ((myId !== userId))) &&
                (<NavLink className={s.learnButton} to={disabled ? "" : PATH.learn}>
                    <LearnAction disabled={commonDisabled(appStatus) || disabled} onClickCallback={learnPackHandler}/>
                </NavLink>)
            }

            {((type === 'pack') && (myId === userId)) &&
                (
                    <>
                        <EditAction disabled={commonDisabled(appStatus)} onClickCallback={onActiveEditModal}/>
                        <DeleteAction disabled={commonDisabled(appStatus)} onClickCallback={onActiveModal}/>
                    </>
                )}

            {(type === 'card' && myId === userId) && (
                <>
                    <EditAction disabled={commonDisabled(appStatus)} onClickCallback={onActiveEditCardModal}/>
                    <DeleteAction disabled={commonDisabled(appStatus)} onClickCallback={onActiveModal}/>
                </>

            )}

            <DeletePackModal cardId={cardId}
                             type={type}
                             packId={packId}
                             name={packName}
                             active={activeDeleteModal}
                             setActive={onActiveModal}
            />
            <EditPackModal deckCover={deckCover}
                           name={packName}
                           packId={packId}
                           active={activeEditModal}
                           setActive={onActiveEditModal}
            />
            <EditCardModal cardId={cardId}
                           packId={packId}
                           active={activeEditCardModal}
                           setActive={onActiveEditCardModal}
                           question={question}
                           questionImg={questionImg}
                           answer={answer}
            />
        </div>
    );
};


type ActionsType = {
    disabled: boolean
    onClickCallback: () => void
}

export const LearnAction = (props: ActionsType) => {
    return (
        <button className={s.button} disabled={props.disabled} onClick={props.onClickCallback}>
            <SchoolOutlinedIcon fontSize={'small'}/>
        </button>
    )
}

export const EditAction = (props: ActionsType) => {
    return (
        <button disabled={props.disabled} className={s.button} onClick={props.onClickCallback}>
            <BorderColorOutlinedIcon fontSize={'small'}/>
        </button>
    )
}

export const DeleteAction = (props: ActionsType) => {
    return (
        <button disabled={props.disabled} className={s.button} onClick={props.onClickCallback}>
            <DeleteIcon fontSize={'small'}/>
        </button>
    )
}
