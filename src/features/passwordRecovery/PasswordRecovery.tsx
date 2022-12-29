import React, {useState} from 'react';
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import commonStyle from "../../common/styles/commonStyles.module.css"
import {sendEmailTC} from "../../bll/reducers/passRecovery-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {CheckEmail} from "./checkEmail/CheckEmail";
import {validator} from "../../common/components/validator/validator";
import {ButtonForm} from "../../common/components/buttons/buttonForm/ButtonForm";


export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()
    const statusSendMessage = useAppSelector(state => state.passRecovery.statusSendMessage)

    const [email, setEmail] = useState('')

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            return validator(values)
        },
        onSubmit: (values) => {
            dispatch(sendEmailTC(values.email))
            setEmail(values.email)
            formik.resetForm()
        }
    })

    return (
        <div className={commonStyle.container}>

            {statusSendMessage
                ? (<CheckEmail email={email}/>)
                : (<div>

                    <h2>Forgot your password?</h2>

                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div className={commonStyle.errorInput}>{formik.errors.email}</div>
                            }

                            <div className={commonStyle.textInfo}>
                                Enter your email address and we will send you further instructions
                            </div>

                            <ButtonForm nameButton={"Send Instructions"}/>

                        </FormGroup>
                    </form>

                    <div className={commonStyle.textQuestion}>Did you remember your password?</div>

                    <div>
                        <NavLink to={PATH.login} className={commonStyle.link}>
                            Try logging in
                        </NavLink>
                    </div>
                </div>)
            }
        </div>
    )
};