import React from 'react';
import s from "./BackToPacksList.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import arrowLogo from "../../../assets/img/icons/arrow.png";

export const BackToPacksList = () => {
    return (
        <div className={s.back}>
            <NavLink to={PATH.packList} className={s.backLink}>
                <img src={arrowLogo} alt={'back'}/>
                Back to Packs List
            </NavLink>
        </div>
    );
};