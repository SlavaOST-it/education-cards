import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {Login} from "../login/signIn/Login";
import {Profile} from "../profile/Profile";
import {PageNotFound} from "../errorPage/PageNotFound";
import {PasswordRecovery} from "../login/passwordRecovery/PasswordRecovery";
import {Registration} from '../login/registration/Registration';
import {NewPass} from "../login/newPassword/NewPass";
import {PacksList} from "../cards/PacksList";
import {CardList} from "../cards/cards/CardList";

export const Main = () => {

    return (
        <div className={""}>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.login}/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.registration} element={<Registration/>}/>
                <Route path={PATH.profile} element={<Profile/>}/>
                <Route path={PATH.passwordRecovery} element={<PasswordRecovery/>}/>
                <Route path={PATH.setNewPassword} element={<NewPass/>}/>
                <Route path={PATH.packList} element={<PacksList/>}/>
                <Route path={PATH.cardList} element={<CardList/>}/>
                <Route path={'/*'} element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
};