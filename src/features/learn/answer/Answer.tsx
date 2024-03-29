import React, {FC, useState} from 'react';

import s from "../LearnPage.module.css";

import {CardType} from "../../../api/apiConfig/types/cardsAPI-types";
import {deleteStudiedCardAC, questionsCompletedAC, setGradeCardTC} from "../../../bll/reducers/learn-reducer";

import {Grade} from "../grade/Grade";
import Button from "@mui/material/Button";

import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {commonDisabled} from "../../../utils/disabledOnBoot/disabledOnBoot";


type AnswerType = {
    card: CardType
}
export const Answer: FC<AnswerType> = ({card}) => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.status)

    const cards = useAppSelector(state => state.learn.cards)


    const [isHiddenAnswer, setIsHiddenAnswer] = useState(true)
    const [valueGrade, setValueGrade] = useState(0)

    const nextQuestionHandler = () => {
        setIsHiddenAnswer(true)
        setValueGrade(0)
        dispatch(setGradeCardTC(valueGrade, card._id))

        if (cards && cards.length === 1) {
            dispatch(questionsCompletedAC(true))
            return
        }

        if (cards) {
            const index = cards.findIndex(c => c._id === card._id)
            cards.splice(index, 1)
            dispatch(deleteStudiedCardAC([...cards]))
        }
    }

    if (isHiddenAnswer) {
        return (
            <div>
                <Button variant="contained" sx={{borderRadius: 5, marginTop: 3}} size={'large'}
                        onClick={() => setIsHiddenAnswer(false)}
                        disabled={commonDisabled(appStatus)}
                >
                    Show answer
                </Button>
            </div>


        )
    } else {
        return (
            <div>
                <div className={s.question}>
                    <b>Answer: </b>
                    {card.answerImg && card.answerImg !== ''
                        ? (<>
                            <img src={card.answerImg} alt={"question"}
                                 className={s.questionImg}/>
                        </>)
                        : (<>
                            {card.answer}
                        </>)
                    }
                </div>

                <div className={s.gradeBlock}>
                    Rate yourself:
                    <Grade setCurrentGrade={setValueGrade}/>
                </div>

                <Button
                    variant="contained"
                    sx={{borderRadius: 5, marginTop: 3}}
                    size={'large'}
                    onClick={nextQuestionHandler}
                    disabled={valueGrade === 0}
                >
                    NEXT QUESTION
                </Button>
            </div>
        )
    }
}
