import React, {FC} from "react";
import mailLogo from "../../../assets/img/icons/mail.png";
import s from "./CheckEmail.module.css";
import commonStyle from "../../../common/styles/commonStyles.module.css";
import {Link} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {ButtonForm} from "../../../common/components/buttons/buttonForm/ButtonForm";


type CheckEmailType = {
    email: string
}

export const CheckEmail: FC<CheckEmailType> = ({email}) => {
    return (
        <div>
            <h2>Check Email</h2>

            <div>
                <img src={mailLogo} alt={"mail"}/>
            </div>

            <div className={commonStyle.textInfo}>
                We’ve sent an Email with instructions to
                <div className={s.textInfo_email}>{email}</div>
            </div>

            <div>
                <Link to={PATH.login} className={s.backToLoginBTN}>
                    <ButtonForm nameButton={"Back to login"}/>
                </Link>
            </div>
        </div>
    )
}