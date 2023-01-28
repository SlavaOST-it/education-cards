import React, {FC} from 'react';
import s from "./BackToPacksList.module.css";

import {NavLink} from "react-router-dom";

import arrowLogo from "../../../assets/img/icons/arrow.png";

import {AppStatus, PacksOrCardsOrUsersType} from "../../types/types";
import {PATH} from "../../../utils/routes/routes";
import {useAppSelector} from "../../../utils/hooks/hooks";
import {commonDisabled} from "../../../utils/disabledOnBoot/disabledOnBoot";


type BackToPacksListType = {
    type: PacksOrCardsOrUsersType
    callBack?: () => void
}

export const BackToPacksList: FC<BackToPacksListType> = ({type, callBack}) => {
    const appStatus = useAppSelector(state => state.app.status)

    return (
        <div>
            {type === "pack" &&
                <div className={s.back}>
                    <NavLink
                        to={commonDisabled(appStatus) ? "" : PATH.packList}
                        className={s.backLink}
                    >
                        <img src={arrowLogo} alt={'back'}/>
                        Back to packs list
                    </NavLink>
                </div>
            }

            {type === "card" &&
                <div className={s.back}>
                    <NavLink
                        onClick={() => callBack}
                        to={commonDisabled(appStatus) ? "" : PATH.cardList}
                        className={s.backLink}
                    >
                        <img src={arrowLogo} alt={'back'}/>
                        Back to cards list
                    </NavLink>
                </div>
            }
        </div>);
};
