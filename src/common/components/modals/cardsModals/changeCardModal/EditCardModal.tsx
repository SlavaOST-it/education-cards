import React, {ChangeEvent, FC, useState} from 'react';
import {useAppDispatch} from "../../../../../utils/hooks/hooks";
import {BasicModal} from "../../BasicModal";
import TextField from "@mui/material/TextField";
import {changeCardTC} from "../../../../../bll/reducers/cards-reducer";
import {ImageQuestionLoader} from "../imageQuestionLoader/ImageQuestionLoader";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120
}

type EditCardModalType = {
    cardId: string
    packId: string
    active: boolean
    setActive: (active: boolean) => void
    question: string
    questionImg: string
    answer: string
}
export const EditCardModal: FC<EditCardModalType> = ({
                                                         active,
                                                         setActive,
                                                         cardId,
                                                         packId,
                                                         question,
                                                         questionImg,
                                                         answer
                                                     }) => {
    const dispatch = useAppDispatch()

    const [valueQuestion, setValueQuestion] = useState(question)
    const [imageQuestion, setImageQuestion] = useState(questionImg)
    const [valueAnswer, setValueAnswer] = useState(answer)

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        dispatch(changeCardTC(packId, cardId, valueQuestion, valueAnswer, imageQuestion))
        setActive(false)
    }

    const onCancelHandler = () => {
        setValueQuestion(question)
        setValueAnswer(answer)
        setActive(false)
    }

    const disabledButton = (questionImg !== "") ? imageQuestion === "" : valueQuestion.length === 0

    return (
        <BasicModal
            title={"Edit card"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={disabledButton || valueAnswer.length === 0}
            styleButton={styleButtonMUI}
        >
            <div>
                {(questionImg === '') &&
                    <TextField value={valueQuestion} label="Question" margin="normal" fullWidth={true}
                               onChange={onChangeQuestionHandler}/>
                }

                {(questionImg !== '') &&
                    <ImageQuestionLoader
                        questionImg={questionImg}
                        setValueQuestionImg={setImageQuestion}/>
                }
            </div>

            <div>
                <TextField
                    value={valueAnswer}
                    label="Answer"
                    margin="normal"
                    fullWidth={true}
                    onChange={onChangeAnswerHandler}/>
            </div>
        </BasicModal>
    );
};
