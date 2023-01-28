import React, {FC} from 'react';
import s from "./RepeatLearning.module.css"

import {getCardsForLearnTC, questionsCompletedAC} from "../../../bll/reducers/learn-reducer";

import {BackToPacksList} from "../../../common/components/backToPacksLink/BackToPacksList";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../utils/hooks/hooks";



type RepeatLearningType = {
    callBackToCards: () => void
    packName: string
}

export const RepeatLearning: FC<RepeatLearningType> = ({callBackToCards, packName}) => {
    const dispatch = useAppDispatch()

    const tryAgainLearningHandler = () => {
        dispatch(questionsCompletedAC(false))
        dispatch(getCardsForLearnTC())
    }

    return (
        <div className={s.container}>
            <div>
                <BackToPacksList type={"card"} callBack={callBackToCards}/>
            </div>

            <div className={s.namePack}>
                <h3>Learn pack "{packName}"</h3>
            </div>
            <div className={s.text}>
                You answered all the questions. <br/>
                Repeat again?
            </div>

            <Button
                variant="contained"
                sx={{borderRadius: 5, marginTop: 3}}
                size={'large'}
                onClick={tryAgainLearningHandler}
            >
                try again
            </Button>
        </div>
    );
};
