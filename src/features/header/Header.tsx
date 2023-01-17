import React from 'react';
import s from './Header.module.css'
import {useAppSelector} from "../../utils/hooks/hooks";
import logotype from "../../assets/img/logotype.jpg"

import {HeaderItem} from "./headerItem/HeaderItem";
import {SignInButton} from "../../common/components/buttons/signInButton/SignInButton";
import {AppStatus} from "../../common/types/types";
import LinearProgress from "@mui/material/LinearProgress";


export const Header = () => {
    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const appStatus = useAppSelector((state) => state.app.status)

    return (
        <div className={s.header}>

            <div className={s.headerWrapper}>

                <div>
                    <img src={logotype} alt={"education cards"}/>
                </div>

                {loggedIn
                    ? <HeaderItem/>
                    : <SignInButton/>
                }
            </div>
            {appStatus === AppStatus.LOADING && <LinearProgress/>}
        </div>
    )
};
