import React from 'react';
import s from "./SignInButton.module.css"

import {Link} from "react-router-dom";

import Button from "@mui/material/Button";

import {PATH} from "../../../../utils/routes/routes";


export const SignInButton = () => {
    return (
        <Link to={PATH.login} className={s.signInButtonLink}>
            <Button type="submit" variant="contained" style={{borderRadius: '20px'}}>
                Sign In
            </Button>
        </Link>
    );
};
