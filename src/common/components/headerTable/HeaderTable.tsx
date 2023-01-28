import React, {FC, ReactNode} from 'react';
import s from "./HeaderTable.module.css";

import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";


type HeaderType = {
    type: "myPack" | "userPack"
    callbackToAdd: () => void
    title?: string
    nameButton?: string
    disabled?: boolean
    children?: ReactNode | JSX.Element
}

export const HeaderTable: FC<HeaderType> = ({
                                                type,
                                                children,
                                                callbackToAdd, title, nameButton,
                                                disabled
                                            }) => {

    return (
        <div className={s.header}>
            <div className={s.namePack}>
                <div>
                    <h2>{title}</h2>
                </div>
                {children}
            </div>

            {type === "myPack" &&
                (<Button
                    onClick={callbackToAdd}
                    sx={{borderRadius: 5}} size="small"
                    variant="contained"
                >
                    {nameButton}
                </Button>)
            }

            {type === "userPack" &&
                (<Button
                    disabled={disabled}
                    sx={{borderRadius: 5}} size="small"
                    variant="contained"
                >
                    <NavLink className={s.learnButton} to={PATH.learn} onClick={callbackToAdd}>
                        Learn this pack
                    </NavLink>
                </Button>)
            }
        </div>
    );
};
