import React, {FC} from 'react';
import s from "./SelectButton.module.css"
import {useAppSelector} from "../../../../../utils/hooks/hooks";
import {commonDisabled} from "../../../../../utils/disabledOnBoot/disabledOnBoot";


type SelectButtonType = {
    nameBtn: string,
    callBack?: ()=>void
    classNameBtn?: string
}

export const SelectButton: FC<SelectButtonType> = ({nameBtn, callBack, classNameBtn}) => {
    const appStatus = useAppSelector(state => state.app.status)

    const finalClassName = nameBtn === classNameBtn ? s.activeBtn : s.styleBtn

    return (
        <button
            className={finalClassName}
            onClick={callBack}
            disabled={commonDisabled(appStatus)}
        >
            { nameBtn }
        </button>
    );
};
