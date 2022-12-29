import React, {FC, useEffect, useState} from 'react';
import teacherLogo from "../../../assets/img/icons/packs/teacher.png"
import editLogo from "../../../assets/img/icons/packs/Edit.png"
import deleteLogo from "../../../assets/img/icons/packs/Delete.png"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import s from "./ActionsPack.module.css"
import {DeletePackModal} from "../../../common/components/modals/deletePackModal/DeletePackModal";
import {EditAndAddCardsModal} from "../../../common/components/modals/addCardsModal/EditAndAddCardsModal";
import {setCardIdAC} from "../../../bll/reducers/cards-reducer";


type ActionsCardType = {
    cardId: string,
    answer: string
    question:string

}

export const ActionsCard: FC<ActionsCardType> = ({
                                                     cardId,
                                                     answer,question
                                                 }) => {
    const myId = useAppSelector(state => state.profile._id)
    const userId=useAppSelector(state=>state.packList.userID)
    const packId =useAppSelector(state=>state.packList.packId)
    const packName =useAppSelector(state=>state.packList.packName)
    const dispatch=useAppDispatch()

    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)


    const learnPackHandler = () => {
        alert('112')
    }


    const onActiveModal = () => setActiveDeleteModal(!activeDeleteModal)
    const onActiveEditModal = () => setActiveEditModal(!activeEditModal)

    useEffect(()=>{
        dispatch(setCardIdAC(cardId))
    },[])
    return (
        <div className={s.actionBtn}>
            <div className={s.button} onClick={learnPackHandler}>
                    <img src={teacherLogo} alt={'learn card'}/>
                </div>

            {myId === userId && (
                <>
                    <div className={s.button} onClick={onActiveEditModal}>
                        <img src={editLogo} alt={'edit card'}/>
                    </div>
                    <div className={s.button} onClick={onActiveModal}>
                        <img src={deleteLogo} alt={'delete cars'}/>
                    </div>
                    <DeletePackModal cardId={cardId} type={'card'} packId={packId} name={packName} active={activeDeleteModal} setActive={onActiveModal}
                                    />
                    <EditAndAddCardsModal questionCard={question} answerCard={answer}  cardsPackId={packId} type={'edit'}   active={activeEditModal} setActive={onActiveEditModal}/>

                </>
            )}
        </div>
    );
};