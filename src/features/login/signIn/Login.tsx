import React, {useState} from 'react';
import {useFormik} from "formik";
import s from './Login.module.css'
import commonStyle from "../../../common/styles/commonStyles.module.css"
import {loginThunkCreator} from "../../../bll/reducers/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {Navigate, NavLink} from "react-router-dom";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {PATH} from "../../../utils/routes/routes";
import * as Yup from 'yup';
import {ButtonForm} from "../../../common/components/buttons/buttonForm/ButtonForm";
import {InputPasswordType} from "../../../common/types/types";


export const Login = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const [inputPassword, setInputPassword] = useState<InputPasswordType>('text');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },

        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email field is required"),
            password: Yup.string().required("Password field is required").min(8, 'Password length less than 8 characters'),
        }),

        onSubmit: values => {
            dispatch((loginThunkCreator(values.email, values.password, values.rememberMe)))
        }
    })

    const showPasswordHandler = () => setInputPassword('text')
    const hidePasswordHandler = () => setInputPassword('password')

    if (loggedIn) {
        return <Navigate to={PATH.profile}/>
    }

    return (
        <div className={commonStyle.container}>

            <h2>Sing in</h2>

            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div className={commonStyle.errorInput}>{formik.errors.email}</div>
                        }

                        <FormControl
                            variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                type={inputPassword}
                                label="Password"
                                {...formik.getFieldProps('password')}
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
                            />
                        </FormControl>
                        {formik.touched.password && formik.errors.password &&
                            <div className={commonStyle.errorInput}>{formik.errors.password}</div>}

                        <div className={s.checkbox}>
                            <FormControlLabel
                                control={<Checkbox name={'rememberMe'}
                                                   onChange={formik.handleChange}
                                                   value={formik.values.rememberMe}/>}
                                label="Remember me"/>
                        </div>

                        <NavLink className={s.forgot} to={PATH.passwordRecovery}>
                            Forgot Password?
                        </NavLink>

                        <ButtonForm nameButton={"Sign in"}/>

                    </FormGroup>
                </FormControl>
            </form>

            <div className={commonStyle.textQuestion}>Already have an account?</div>

            <NavLink className={commonStyle.link} to={PATH.registration}>
                Sign up
            </NavLink>
        </div>
    );
};