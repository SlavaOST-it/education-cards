import React, {useEffect, useState} from 'react';
import s from "./LearnPage.module.css"
import {CardResponseType} from "../../api/cardsAPI";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {Navigate, NavLink, useSearchParams} from "react-router-dom";
import {BackToPacksList} from "../../common/components/backToPacksLink/BackToPacksList";
import {
    getCardsForLearnTC,
    questionsCompletedAC,
    resetLearnCardStateAC,
    setCardsPackIdInLearnAC
} from "../../bll/reducers/learn-reducer";
import {getCard} from "../../utils/getCard/getCard";
import {setCurrentPackIdAC} from "../../bll/reducers/cards-reducer";
import {Answer} from "./answer/Answer";
import {PATH} from "../../utils/routes/routes";


const initialCard = {
    _id: '',
    answer: '',
    question: '',
    cardsPack_id: '',
    grade: 0,
    shots: 0,
    type: '',
    user_id: '',
    created: '',
    updated: '',
    min: 0,
    max: 0
}

export const LearnPage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)
    const cards = useAppSelector(state => state.learn.cards)
    const namePack = useAppSelector(state => state.learn.packName)
    const cardsPack_id = useAppSelector(state => state.learn.cardsPack_id)
    const questionsCompleted = useAppSelector(state => state.learn.questionsCompleted)


    const [card, setCard] = useState<CardResponseType>(initialCard)
    const [urlParams, setUrlParams] = useSearchParams()

    useEffect(() => {
        const fromUrlCurrentPackId = urlParams.get('currentPackId')

        if (fromUrlCurrentPackId !== null) {
            dispatch(setCardsPackIdInLearnAC(fromUrlCurrentPackId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (cardsPack_id !== '') {
            setUrlParams({
                currentPackId: `${cardsPack_id}`,
            })
        }
        debugger
        dispatch(getCardsForLearnTC())
        dispatch(questionsCompletedAC(false))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (cards) {
            setCard(getCard(cards))
        }
    }, [cards])

    const backToCardsListHandler = () => {
        dispatch(setCurrentPackIdAC(cardsPack_id))
        // dispatch(resetLearnCardStateAC())
    }

    if (questionsCompleted) {
        return (<div>Карточки в данной колоде изучены. Хотите повторить? <NavLink onClick={backToCardsListHandler} to={PATH.cardList}>back to cards</NavLink></div>
        )
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }
    debugger
    return (
        <div className={s.container}>
            <div>
                <BackToPacksList type={"card"} callBack={backToCardsListHandler}/>
            </div>

            <div className={s.blockLearn}>
                <div className={s.namePack}>
                    <h3>Learn pack "{namePack}"</h3>
                </div>

                <div className={s.question}>
                    <b>Question:</b> {card.question}
                </div>

                <div className={s.shots}>
                    Количество попыток ответов на вопрос: <span>{card.shots}</span>
                </div>

                <div>
                    <Answer card={card}/>
                </div>
            </div>

        </div>
    );
};
