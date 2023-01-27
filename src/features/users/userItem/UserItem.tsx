import React, {FC, useState} from 'react';
import s from "./UserItem.module.css"
import customAvatar from "../../../assets/img/icons/avatar_user.png"
import style from "../../packs/Packs.module.css";
import {StyledTableCell, StyledTableRow} from "../../../common/styles/StyleForTables";
import {ViewProfileUserModal} from "../../../common/components/modals/usersModals/viewProfileUserModal/ViewProfileUserModal";
import {UsersType} from "../../../api/apiConfig/types/usersAPI-types";


type UserItemType = {
    item: UsersType
}
export const UserItem: FC<UserItemType> = ({item}) => {

    const [isOpenViewProfileModal, setIsOpenViewProfileModal] = useState(false)

    const onActiveModalHandler = () => {
        setIsOpenViewProfileModal(!isOpenViewProfileModal)
    }

    return (
        <StyledTableRow key={item._id} className={style.tableHeader}>

            <StyledTableCell align="center">
                <div className={s.nameAvatarBlock} onClick={onActiveModalHandler}>
                    <img src={item.avatar && item.avatar.length > 100 ? item.avatar : customAvatar}
                         className={s.userAvatar} alt={'avatar'}></img>
                    <div className={s.userName}>{item.name}</div>
                </div>
            </StyledTableCell>

            <StyledTableCell align="center">{item.email.substr(0, 40)}</StyledTableCell>

            <StyledTableCell align="center">{item.publicCardPacksCount}</StyledTableCell>

            <ViewProfileUserModal active={isOpenViewProfileModal} setActive={onActiveModalHandler} userItem={item}/>
        </StyledTableRow>
    )
};
