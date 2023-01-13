import React, {FC, ReactNode} from 'react';
import s from "./HeaderTable.module.css";
import Button from "@mui/material/Button";


type HeaderType = {
    callbackToAdd: () => void
    title?: string
    titleButton: string
    disabled?: boolean
    children?: ReactNode | JSX.Element
}

export const HeaderTable: FC<HeaderType> = ({
                                                children,
                                                callbackToAdd, title,
                                                titleButton,
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