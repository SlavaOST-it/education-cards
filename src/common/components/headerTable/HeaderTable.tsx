import React, {FC} from 'react';
import style from "./HeaderTable.module.css";
import Button from "@mui/material/Button";

type HeaderType={
    callbackToAdd:()=>void
    title?:string
    titleButton: string
    disabled?: boolean
}

export const HeaderTable:FC<HeaderType> = ({callbackToAdd, title,titleButton, disabled}) => {
    return (
        <div className={style.header}>
            <h2>{title}</h2>
            <div>
                <Button
                    disabled={disabled}
                    onClick={callbackToAdd}
                    sx={{borderRadius: 5}} size="small"
                    variant="contained"
                >
                    {titleButton}
                </Button>
            </div>
        </div>
    );
};