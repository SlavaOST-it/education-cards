import React, {ChangeEvent, useRef, useState} from 'react';
import {Navigate, NavLink} from "react-router-dom";

import s from './Profile.module.css'

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

import {changeAvatarThunkCreator, changeNameThunkCreator, setUserPhotoAC} from "../../bll/reducers/profile-reducer";
import {setAppErrorAC} from "../../bll/reducers/app-reducer";

import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {convertFileToBase64} from "../../utils/convertFileToBase64/convertFileToBase64";

import {BackToPacksList} from "../../common/components/backToPacksLink/BackToPacksList";
import {LogOutButton} from "../../common/components/buttons/logOutButton/LogOutButton";
import {AvatarUser} from "./avatarUser/AvatarUser";

import camera from "../../assets/img/icons/camera.png"
import customAvatar from "../../assets/img/icons/avatar_user.png"
import arrowLogo from "../../assets/img/icons/arrow.png";



export const Profile = () => {
    const dispatch = useAppDispatch()

    const userName = useAppSelector(state => state.profile.name)
    const userEmail = useAppSelector(state => state.profile.email)
    const loggedIn = useAppSelector(state => state.login.loggedIn)

    const [editMode, setEditMode] = useState<boolean>(false)
    const [name, setName] = useState<string>(userName)
    const [error, setError] = useState<string | null>(null)
    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const activateEditMode = () => {
        setEditMode(true);
        setName(userName);
    }

    const activateViewMode = () => {
        setEditMode(false);
        setError(null)
        if (name.length === 0) {
            setName(userName)
        } else {
            dispatch(changeNameThunkCreator(name));
        }
    }

    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setName(value)
        if (value.length < 1) {
            setError('Min name length 1 symbol')
        }
        if (value.length > 20) {
            setError('Max name length 20 symbol')
        } else {
            setError(null)
        }
    }

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.files
        if (value && value.length) {
            const file = value[0]
            if (file.size < 1000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeAvatarThunkCreator(file64))
                })
            } else {
                dispatch(setAppErrorAC('Файл слишком большого размера'))
            }
        }
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
        dispatch(setAppErrorAC('Broken picture'))
    }

    if (isAvaBroken) {
        dispatch(setUserPhotoAC(customAvatar))
        setIsAvaBroken(false)
    }

    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.profilePage}>
            <div className={s.nav}>
                <BackToPacksList type={'pack'}/>

                <NavLink to={PATH.users} className={s.linkToUsers}>
                    User list
                    <img src={arrowLogo} alt={'back'}/>
                </NavLink>
            </div>

            <div className={s.profile}>
                <h2>Personal Information</h2>

                <div className={s.avatarBlock}>
                    <div className={s.ava}>
                        <AvatarUser
                            onError={errorHandler}
                            className={s.avatar}/>
                    </div>

                    <div className={s.avaCamera}>
                        <img
                            onClick={selectFileHandler}
                            className={s.changeAvatarBtn}
                            src={camera}
                            alt={'change_photo'}
                        />
                        <input
                            style={{display: 'none'}}
                            ref={inputRef}
                            type="file"
                            accept={"image/*"}
                            onChange={uploadHandler}
                        />
                    </div>
                </div>

                <div className={s.name}>
                    {editMode
                        ? (<div>
                            <input
                                type='text'
                                className={s.input_name}
                                autoFocus={true}
                                onBlur={activateViewMode}
                                value={name}
                                onChange={changeNameHandler}
                            />
                            {error && (<div className={s.errorSpan}>{error}</div>)}
                        </div>)
                        : (<div>
                        <span
                            className={s.span_name}
                            onDoubleClick={activateEditMode}
                        >
                            {userName}
                            <BorderColorOutlinedIcon fontSize={'small'} sx={{marginLeft: '15px'}}/>
                        </span>

                        </div>)
                    }
                </div>

                <div className={s.email}> {userEmail} </div>

                <LogOutButton/>
            </div>
        </div>
    );
};
