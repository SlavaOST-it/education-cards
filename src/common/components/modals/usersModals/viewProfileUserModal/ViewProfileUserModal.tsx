import React, {FC} from 'react';
import s from "./ViewProfileUserModal.module.css";

import {Box, Button, Modal } from '@mui/material';
import {UsersType} from "../../../../../api/apiConfig/types/usersAPI-types";

import customAvatar from "../../../../../assets/img/icons/avatar_user.png";
import {styleUserModal} from "../../stylesModal";



type ViewProfileUserModalType = {
    active: boolean
    setActive: (active: boolean) => void
    userItem: UsersType
}

export const ViewProfileUserModal: FC<ViewProfileUserModalType> = ({active, setActive, userItem}) => {

    const handleClose = () => setActive(false)

    return (
        <Modal
            open={active}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleUserModal}>
                <div className={s.modal}>
                    <div className={s.modalHeader}>
                        <h2>User profile</h2>
                    </div>
                    <hr/>

                    <div>
                        <img src={userItem.avatar && userItem.avatar.length > 100 ? userItem.avatar : customAvatar}
                             alt={'avatar'} className={s.avatar}/>
                    </div>

                    <div className={s.info}>
                        <div className={s.userName}> Name: <b>{userItem.name}</b></div>

                        <div>Email: <b>{userItem.email.substr(0, 40)} </b></div>

                        <div>Card count: <b>{userItem.publicCardPacksCount}</b></div>
                    </div>
                </div>

                <div className={s.buttons}>
                    <Button variant={'contained'} sx={{borderRadius: 5}} onClick={handleClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    );
};
