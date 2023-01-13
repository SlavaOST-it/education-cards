import React, {FC, useState} from 'react';
import {useAppSelector} from "../../../utils/hooks/hooks";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import s from "./ActionsPack.module.css"
import {DeletePackModal} from "../../../common/components/modals/deletePackModal/DeletePackModal";
import {EditPackModal} from "../../../common/components/modals/changePackModal/EditPackModal";
import {ChangeCardModal} from "../../../common/components/modals/changeCardModal/ChangeCardModal";
import {AppStatus} from "../../../common/types/types";


type ActionsPackType = {
    type: 'pack' | 'card'
    packId: string,
    cardId: string
    userId: string,
    packName: string
    deckCover: string
    question: string
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
                                                     answer,
                                                     disabled
                                                 }) => {

    const myId = useAppSelector(state => state.profile._id)
    const appStatus = useAppSelector((state) => state.app.status)

    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeEditCardModal, setActiveEditCardModal] = useState(false)

    const learnPackHandler = () => {
        alert('Learn pack')
    }

    const onActiveModal = () => setActiveDeleteModal(!activeDeleteModal)
    const onActiveEditModal = () => setActiveEditModal(!activeEditModal)
    const onActiveEditCardModal = () => setActiveEditCardModal(!activeEditCardModal)

    const disableButton = appStatus === AppStatus.LOADING

    return (
        <div className={s.actionBtn}>
            {((type === 'pack') && ((myId !== userId))) &&
                (<LearnAction disabled={disableButton || disabled} onClickCallback={learnPackHandler}/>)
            }

            {((type === 'pack') && (myId === userId)) &&
                (
                    <>
                        <EditAction disabled={disableButton} onClickCallback={onActiveEditModal}/>
                        <DeleteAction disabled={disableButton} onClickCallback={onActiveModal}/>
                    </>
                )}

            {(type === 'card' && myId === userId) && (
                <>
                    <EditAction disabled={disableButton} onClickCallback={onActiveEditCardModal}/>
                    <DeleteAction disabled={disableButton} onClickCallback={onActiveModal}/>
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
            <ChangeCardModal cardId={cardId}
                             packId={packId}
                             active={activeEditCardModal}
                             setActive={onActiveEditCardModal}
                             question={question}
                             answer={answer}
            />
        </div>
    );
};

type ActionsType = {
    disabled: boolean
    onClickCallback: () => void
}

const LearnAction = (props: ActionsType) => {
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