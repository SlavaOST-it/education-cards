import React, {ChangeEvent, FC, useState} from 'react';
import s from "./AddCardModal.module.css"
import { styleButtonMUI } from '../../stylesModal';

import {BasicModal} from "../../BasicModal";
import {useAppDispatch} from "../../../../../utils/hooks/hooks";
import {addCardTC} from "../../../../../bll/reducers/cards-reducer";
import {ImageQuestionLoader} from "../imageQuestionLoader/ImageQuestionLoader";
import {FormControl, FormGroup, InputLabel, MenuItem, Select, TextField, SelectChangeEvent} from "@mui/material";



type AddCardsModalType = {
    packId: string
    active: boolean
    setActive: (active: boolean) => void
}

export const AddCardModal: FC<AddCardsModalType> = ({
                                                                packId,
                                                                active,
                                                                setActive
                                                            }) => {
    const dispatch = useAppDispatch()

    const [typeQuestion, setTypeQuestion] = useState<"text" | "image" | "">("")
    const [valueQuestion, setValueQuestion] = useState("")

    const [imageQuestion, setImageQuestion] = useState("")
    const [valueAnswer, setValueAnswer] = useState("")


    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueAnswer(e.currentTarget.value)
    }

    const changeTypeQuestionHandler = (event: SelectChangeEvent) => {
        setTypeQuestion(event.target.value as "text" | "image");
    };

    const onSaveHandler = () => {
        dispatch(addCardTC(packId, valueQuestion, valueAnswer, imageQuestion))
        setTypeQuestion("")
        setValueQuestion("")
        setImageQuestion("")
        setValueAnswer("")
        setActive(false)
    }

    const onCancelHandler = () => {
        setTypeQuestion("")
        setValueQuestion("")
        setValueAnswer("")
        setActive(false)
    }

    const disabledButton = typeQuestion === "image" ? imageQuestion === "" : valueQuestion.length === 0

    return (
        <BasicModal
            title={"Add new card"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={disabledButton || valueAnswer.length === 0}
            styleButton={styleButtonMUI}
        >
            <div className={s.questionBlock}>
                <h4>Choose question format</h4>
                <FormControl fullWidth>
                    <FormGroup>
                        <InputLabel htmlFor="question-format">format</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="question-format"
                            value={typeQuestion}
                            label="Question"
                            onChange={changeTypeQuestionHandler}
                        >
                            <MenuItem value={"text"}>Text question</MenuItem>
                            <MenuItem value={"image"}>Image question</MenuItem>
                        </Select>
                    </FormGroup>
                </FormControl>

                <div className={s.valueBlock}>
                    {typeQuestion === "text" &&
                        <TextField value={valueQuestion} label="Enter your question" margin="normal" fullWidth={true}
                                   onChange={onChangeQuestionHandler}/>
                    }

                    {typeQuestion === "image" &&
                        <ImageQuestionLoader
                            questionImg={''}
                            setValueQuestionImg={setImageQuestion}
                        />
                    }
                </div>
            </div>

            <div className={s.answerBlock}>
                <TextField
                    value={valueAnswer}
                    label="Enter your answer"
                    margin="normal"
                    fullWidth={true}
                    onChange={onChangeAnswerHandler}/>
            </div>
        </BasicModal>
    );
};
