import React, {FC, useState} from 'react';
import s from "./SettingsPack.module.css"
import {PackType} from "../../../api/apiConfig/types/types";
import {useAppSelector} from "../../../utils/hooks/hooks";
import {AppStatus} from "../../../common/types/types";
import Button from "@mui/material/Button";
import settingIcon from "../../../assets/img/icons/setting.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {DeleteAction, EditAction} from "../../cards/actionsPack/ActionsPack";
import {DeletePackModal} from "../../../common/components/modals/deletePackModal/DeletePackModal";
import {EditPackModal} from "../../../common/components/modals/changePackModal/EditPackModal";


type SettingsPackType = {
    selectedPack: PackType[]
}
export const SettingsPack: FC<SettingsPackType> = ({selectedPack}) => {
    const appStatus = useAppSelector((state) => state.app.status)

    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)


    const open = Boolean(anchorEl);
    const onActiveModal = () => setActiveDeleteModal(!activeDeleteModal)
    const onActiveEditModal = () => setActiveEditModal(!activeEditModal)

    const onClickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const onCloseHandle = () => {
        setAnchorEl(null);
    }


    const disableButton = appStatus === AppStatus.LOADING
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onClickHandle}
            >
                <img className={s.settingIcon} src={settingIcon} alt={'arrow menu'}/>
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
                    <EditAction disabled={disableButton} onClickCallback={onActiveEditModal}/>
                    <DeleteAction disabled={disableButton} onClickCallback={onActiveModal}/>

                </MenuItem>

            </Menu>
            {selectedPack.map(el =>
                <div>
                    <DeletePackModal cardId={''}
                                     type={'pack'}
                                     packId={el._id}
                                     name={el.name}
                                     active={activeDeleteModal}
                                     setActive={onActiveModal}
                    />
                    <EditPackModal deckCover={el.deckCover}
                                   name={el.name}
                                   packId={el._id}
                                   active={activeEditModal}
                                   setActive={onActiveEditModal}
                    />
                </div>)
            }
        </div>
    )
}
