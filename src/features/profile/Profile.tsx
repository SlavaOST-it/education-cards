import React, {ChangeEvent, useRef, useState} from 'react';
import s from './Profile.module.css'
import pencilLogo from '../../assets/img/icons/pencil.png'
import {changeAvatarThunkCreator, changeNameThunkCreator, setUserPhotoAC} from "../../bll/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {LogOutButton} from "../../common/components/buttons/logOutButton/LogOutButton";
import {BackToPacksList} from "../../common/components/backToPacksLink/BackToPacksList";
import {AvatarUser} from "./avatarUser/AvatarUser";
import photoCamera from "../../assets/img/icons/photo-camera-svgrepo-com.svg";
import {convertFileToBase64} from "../../utils/convertFileToBase64/convertFileToBase64";
import customAvatar from "../../assets/img/icons/avatar_user.png"
import {setAppErrorAC} from "../../bll/reducers/app-reducer";


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
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
        dispatch(setAppErrorAC('Broken picture'))
    }

    if(isAvaBroken){
        dispatch(setUserPhotoAC(customAvatar))
        setIsAvaBroken(false)
    }

    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.profilePage}>

            <BackToPacksList/>

            <div className={s.profile}>
                <h2>Personal Information</h2>

                <div className={s.avatarBlock}>
                    <div>
                        <AvatarUser
                            onError={errorHandler}
                            className={s.avatar}/>
                    </div>

                    <div>
                        <button className={s.changeAvatarBtn} onClick={selectFileHandler}>
                            <img
                                className={s.changeAvatarBtn}
                                src={""}
                                alt={'change_photo'}
                            />
                        </button>
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
                            <img src={pencilLogo} alt={'change name'}/>
                        </span>
                        </div>)}
                </div>

                <div className={s.email}> {userEmail} </div>

                <LogOutButton/>
            </div>
        </div>
    );
};