import React from 'react';
import {useNavigate} from "react-router-dom";
import s from "./PageNotFound.module.css"


export const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <div className={s.error_page}>
            <div className={s.error_404}>Ooops... Error 404</div>

            <div className={s.error_text}>Sorry, but the page you are looking for doesn't exist.</div>

            <button onClick={() => {navigate(-1)}} className={s.error_btn}>BACK</button>

            <div>
                <img className={s.error_img} src={'https://cdn.wallpapersafari.com/84/92/kiyMfq.jpg'}
                     alt={"error-img"}/>
            </div>
        </div>
    );
};