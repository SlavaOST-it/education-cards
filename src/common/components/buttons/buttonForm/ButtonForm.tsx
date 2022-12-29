import React, {FC} from 'react';
import Button from "@mui/material/Button";

type ButtonFormType = {
    nameButton: string
}
export const ButtonForm: FC<ButtonFormType> = ({nameButton}) => {
    return (
        <Button
            type={'submit'}
            variant={"contained"}
        >
            {nameButton}
        </Button>
    );
};