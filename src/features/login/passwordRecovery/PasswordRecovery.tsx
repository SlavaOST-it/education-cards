import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

import { FormGroup, TextField } from '@mui/material';
import commonStyle from "../../../common/styles/commonStyles.module.css"

import * as Yup from "yup";
import {useFormik} from "formik";

import {sendEmailTC} from "../../../bll/reducers/passRecovery-reducer";

import {CheckEmail} from "../checkEmail/CheckEmail";
import {ButtonForm} from "../../../common/components/buttons/buttonForm/ButtonForm";

import {PATH} from "../../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";



export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()

    const statusSendMessage = useAppSelector(state => state.passRecovery.statusSendMessage)

    const [email, setEmail] = useState('')

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email field is required")
        }),
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