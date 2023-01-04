import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {setNewPassTC} from "../../../bll/reducers/newPass-reducer";
import commonStyle from "../../../common/styles/commonStyles.module.css";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import {IconButton, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ButtonForm} from "../../../common/components/buttons/buttonForm/ButtonForm";
import {InputPasswordType} from "../../../common/types/types";
import * as Yup from "yup";


export const NewPass = () => {
    const dispatch = useAppDispatch()
    const statusChangePass = useAppSelector<boolean>(state => state.newPassword.statusChangePass)
    const {token} = useParams<string>()

    const [inputPassword, setInputPassword] = React.useState<InputPasswordType>('text');

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Password field is required").min(8, 'Password length less than 8 characters'),
        }),
        onSubmit: (values) => {
            dispatch(setNewPassTC(values.password, token))
            formik.resetForm()
        }
    })

    const showPasswordHandler = () => {
        setInputPassword('text')
    }

    const hidePasswordHandler = () => {
        setInputPassword('password')
    }

    if (statusChangePass) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={commonStyle.container}>

            <h2>Create new password</h2>

            <form onSubmit={formik.handleSubmit}>
                <FormGroup>

                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        type={inputPassword}
                        label="Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={showPasswordHandler}
                                    onMouseDown={hidePasswordHandler}
                                    edge="end"
                                >
                                    {inputPassword === 'text' ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div className={commonStyle.error}>{formik.errors.password}</div>}


                    <div className={commonStyle.textInfo}>
                        Create new password and we will send you further instructions to email
                    </div>

                    <ButtonForm nameButton={"Create new password"}/>

                </FormGroup>
            </form>
        </div>
    );
};