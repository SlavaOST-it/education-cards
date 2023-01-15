import React from 'react';
import {useAppSelector} from "../../utils/hooks/hooks";
import incubatorLogo from "../../assets/img/icons/incubator_logo.png"
import s from './Header.module.css'
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
                    <a href="https://it-incubator.io/" target="_blank" className={s.logo} rel="noreferrer">
                        <img src={incubatorLogo} alt="incubatorLogo"/>
                    </a>
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
