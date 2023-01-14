import React, {FC, useState} from 'react';
import {CardResponseType} from "../../../api/cardsAPI";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {deleteStudiedCardAC, questionsCompletedAC, setGradeCardTC} from "../../../bll/reducers/learn-reducer";
import {Grade} from "../grade/Grade";


type AnswerType = {
    card: CardResponseType
}
export const Answer: FC<AnswerType> = ({card}) => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.learn.cards)


    const [isHiddenAnswer, setIsHiddenAnswer] = useState(true)
    const [valueGrade, setValueGrade] = useState(1)


    const nextQuestionHandler = () => {
        setIsHiddenAnswer(true)
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
            <button onClick={() => setIsHiddenAnswer(false)}>
                Show answer
            </button>
        )
    } else {
        return (
            <div>
                <div>
                    Answer: {card.answer}
                </div>

                <div>
                    <p>Rate yourself:</p>
                    <Grade  setCurrentGrade={setValueGrade}/>
                </div>
                {valueGrade}
                <button onClick={nextQuestionHandler}>
                    NEXT QUESTION
                </button>
            </div>
        )
    }

}

