import React, {ChangeEvent, FC} from 'react';


type GradeType = {
    setCurrentGrade: (grade: number) => void
}

export const Grade: FC<GradeType> = ({setCurrentGrade}) => {

    const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

    const setGrade = (e: ChangeEvent<HTMLInputElement>) => {
        const grade = e.currentTarget.value
        setCurrentGrade(grades.findIndex(g => g === grade) + 1)
    }

    return (
        <div>
            <ul>
                {grades.map((grade, i) => {
                    return(
                        <li key={i}>
                            <input
                                id={'grade' + i}
                                type={"radio"}
                                value={grade}
                                onChange={setGrade}
                            />
                            {grade}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

