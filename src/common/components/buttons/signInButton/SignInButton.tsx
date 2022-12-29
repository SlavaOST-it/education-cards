import React from 'react';
import {PATH} from "../../../../utils/routes/routes";
import s from "./SignInButton.module.css"
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";


export const SignInButton = () => {
    return (
        <Link to={PATH.login} className={s.signInButtonLink}>
            <Button type="submit" variant="contained" style={{borderRadius: '20px'}}>
                Sign In
            </Button>
        </Link>
    );
};