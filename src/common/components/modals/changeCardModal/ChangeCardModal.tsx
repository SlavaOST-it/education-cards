import React, {ChangeEvent, FC, useState} from 'react';
import {useAppDispatch} from "../../../../utils/hooks/hooks";
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import {changeCardTC} from "../../../../bll/reducers/cards-reducer";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120
}

type ChangeCardModalType = {
    cardId: string
    packId: string
    active: boolean
    setActive: (active: boolean) => void
    question: string
    answer: string
}
export const ChangeCardModal: FC<ChangeCardModalType> = ({
                                                             active,
                                                             setActive,
                                                             cardId,
                                                             packId,
                                                             question,
                                                             answer
                                                         }) => {
    const dispatch = useAppDispatch()

    const [valueQuestion, setValueQuestion] = useState(question)
    const [valueAnswer, setValueAnswer] = useState(answer)

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        dispatch(changeCardTC(packId, cardId, valueQuestion, valueAnswer))
        setActive(false)
    }

    const onCancelHandler = () => {
        setActive(false)
    }
    return (
        <BasicModal
            title={"Edit card"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={(valueQuestion.length && valueAnswer.length) === 0}
            styleButton={styleButtonMUI}
        >
            <div>
                <TextField value={valueQuestion} label="Question" margin="normal" fullWidth={true}
                           onChange={onChangeQuestionHandler}/>

                <TextField value={valueAnswer} label="Answer" margin="normal" fullWidth={true}
                           onChange={onChangeAnswerHandler}/>
            </div>

        </BasicModal>
    );
};
