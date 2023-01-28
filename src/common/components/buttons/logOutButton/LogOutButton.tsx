import React from 'react';
import s from "./LogOutButton.module.css"
import {logoutThunkCreator} from "../../../../bll/reducers/auth-reducer";
import {useAppDispatch} from "../../../../utils/hooks/hooks";


export const LogOutButton = () => {
    const dispatch = useAppDispatch()

    const logOutHandle = () => {
        dispatch(logoutThunkCreator())
    }

    return (
        <button
            className={s.logOutBtn}
            onClick={logOutHandle}
        >
            Log out
        </button>
    );
};