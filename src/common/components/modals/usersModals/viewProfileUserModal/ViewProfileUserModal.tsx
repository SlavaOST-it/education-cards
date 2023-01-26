import React, {FC} from 'react';
import Box from "@mui/material/Box";
import s from "./ViewProfileUserModal.module.css";
import {Button} from "@mui/material";
import Modal from "@mui/material/Modal";
import {UsersType} from "../../../../../api/usersAPI";
import customAvatar from "../../../../../assets/img/icons/avatar_user.png";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
};

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
            <Box sx={style}>
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

