import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {logoutThunkCreator} from "../../../bll/reducers/auth-reducer";
import s from "./HeaderItem.module.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import arrowDown from "../../../assets/img/icons/down-arrow-svgrepo-com.svg";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {AvatarUser} from "../../profile/avatarUser/AvatarUser";


export const HeaderItem = () => {
    const dispatch = useAppDispatch()
    const userName = useAppSelector(state => state.profile.name)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl);

    const onClickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const onCloseHandle = () => {
        setAnchorEl(null);
    }

    const logOutHandle = () => {
        onCloseHandle()
        dispatch(logoutThunkCreator())
    }

    return (
        <div className={s.userInfo}>
            <div className={s.userName}>{userName}</div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onClickHandle}
            >
                <div>
                    <AvatarUser className={s.avatar}/>
                </div>
                <div>
                    <img className={s.arrowDown} src={arrowDown} alt={'arrow menu'}/>
                </div>
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onCloseHandle}
                MenuListProps={{
                    'aria-labelledby': 'basic-buttons',
                }}
            >
                <MenuItem onClick={onCloseHandle}>
                    <NavLink to={PATH.profile} className={s.menuLink}>
                        Profile
                    </NavLink></MenuItem>
                <MenuItem onClick={logOutHandle}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
};