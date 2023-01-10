import React, {ChangeEvent, FC, useState} from 'react';
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {addCardTC, changeCardTC} from "../../../../bll/reducers/cards-reducer";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120
}
type EditAndAddCardsModalType = {
    active: boolean
    setActive: (active: boolean) => void
    cardsPackId: string
    type: 'edit' | 'add'
    answerCard: string
    questionCard: string
}
export const EditAndAddCardsModal: FC<EditAndAddCardsModalType> = ({
                                                                       answerCard,
                                                                       questionCard,
                                                                       type,
                                                                       active,
                                                                       setActive,
                                                                       cardsPackId
                                                                   }) => {
    const dispatch = useAppDispatch()
    //const cardID = useAppSelector(state => state.cards.cards._id)

    const [question, setQuestion] = useState(questionCard)
    const [answer, setAnswer] = useState(answerCard)


    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        if (type === 'add') {
            dispatch(addCardTC(cardsPackId, question, answer))
            setActive(false)
            setQuestion('')
            setAnswer('')
        } else {
            // dispatch(changeCardTC(cardsPackId, cardID, question, answer))
            setActive(false)
        }

    }

    const onCancelHandler = () => {
        setActive(false)
    }


    return (
        <BasicModal
            title={"Add new pack"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={question.length === 0 || answer.length === 0}
            styleButton={styleButtonMUI}
        >
            <div>
                <TextField value={question} label="Card question" margin="normal" fullWidth={true}
                           placeholder={"Card question"}
                           onChange={onChangeQuestionHandler}/>
            </div>
            <div>
                <TextField value={answer} label="Card answer" margin="normal" fullWidth={true}
                           placeholder={"Card answer"}
                           onChange={onChangeAnswerHandler}/>
            </div>

        </BasicModal>
    );
};