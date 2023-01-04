import React from 'react';
import {useNavigate} from "react-router-dom";
import style from "./PageNotFound.module.css"


export const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <div className={style.error_page}>
            <div className={style.error_404}>Ooops... Error 404</div>

            <div className={style.error_text}>Sorry, but the page you are looking for doesn't exist.</div>

            <button onClick={() => {navigate(-1)}} className={style.error_btn}>BACK</button>

            <div>
                <img className={style.error_img} src={'https://cdn.wallpapersafari.com/84/92/kiyMfq.jpg'}
                     alt={"error-img"}/>
            </div>
        </div>
    );
};