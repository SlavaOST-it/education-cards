import React, {FC, ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import s from "./BasicModals.module.css"
import {Button} from "@mui/material";


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

type BasicModalsType = {
    active: boolean
    setActive: (active: boolean) => void
    onSaveCallback: () => void
    styleButton?: {}
    disabledButton?: boolean
    nameButton: string
    title: string
    children: ReactNode | JSX.Element
}

export const BasicModal: FC<BasicModalsType> = ({
                                                    children,
                                                    active,
                                                    setActive,
                                                    title,
                                                    styleButton,
                                                    disabledButton,
                                                    onSaveCallback,
                                                    nameButton

                                                }) => {


    const handleClose = () => setActive(false)

    return (
        <div>
            <Modal
                open={active}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={s.modalHeader}>
                        <div>
                            <h4>{title}</h4>
                        </div>
                        <div>
                            <button className={s.modalCloseBtn} onClick={handleClose}>x</button>
                        </div>
                    </div>
                    <hr/>
                    {children}
                    <div className={s.buttons}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" sx={styleButton} disabled={disabledButton}
                                onClick={onSaveCallback}>{nameButton}</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};