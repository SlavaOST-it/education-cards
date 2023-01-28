import React, {ChangeEvent, FC} from 'react';
import s from "../LearnPage.module.css"
import {InputRadio} from "../../../common/components/inputRadio/InputRadio";


const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

type GradeType = {
    setCurrentGrade: (grade: number) => void
}

export const Grade: FC<GradeType> = ({setCurrentGrade}) => {

    const setGrade = (e: ChangeEvent<HTMLInputElement>) => {
        const grade = e.currentTarget.value
        setCurrentGrade(grades.findIndex(g => g === grade) + 1)
    }

    return (
        <div className={s.grade}>
            {grades.map((grade, i) => {
                return (
                    <li key={i}>
                        <InputRadio id={'grade' + i} name={'grade'} type={"radio"} value={grade} onChange={setGrade}/>
                    </li>
                )
            })}
        </div>
    );
};
