import React, {FC} from 'react';
import s from "./BackToPacksList.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import arrowLogo from "../../../assets/img/icons/arrow.png";
import {AppStatus, PacksOrCardsType} from "../../types/types";
import {useAppSelector} from "../../../utils/hooks/hooks";


type BackToPacksListType = {
    type: PacksOrCardsType
    callBack?: () => void
}
export const BackToPacksList: FC<BackToPacksListType> = ({type, callBack}) => {
    const appStatus = useAppSelector(state => state.app.status)

    return (
        <div>
            {type === "pack" &&
                <div className={s.back}>
                    <NavLink
                        to={appStatus === AppStatus.LOADING ? "" : PATH.packList}
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
                        to={appStatus === AppStatus.LOADING ? "" : PATH.cardList}
                        className={s.backLink}
                    >
                        <img src={arrowLogo} alt={'back'}/>
                        Back to cards list
                    </NavLink>
                </div>
            }
        </div>);
};