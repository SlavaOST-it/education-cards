import React, {useState} from 'react'
import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'
import {RegisterTC} from '../../../bll/reducers/registration-reducer'
import {PATH} from '../../../utils/routes/routes'
import {useAppDispatch, useAppSelector} from '../../../utils/hooks/hooks'
import {
    FormControl,
    FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from '@mui/material'
import commonStyle from "../../../common/styles/commonStyles.module.css";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ButtonForm} from "../../../common/components/buttons/buttonForm/ButtonForm";
import {InputPasswordType} from "../../../common/types/types";
import * as Yup from "yup";


export const Registration = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const isRegisterIn = useAppSelector(state => state.auth.isRegisterIn)

    const [inputPassword, setInputPassword] = useState<InputPasswordType>('text');
    const [inputConfirmPassword, setInputConfirmPassword] = useState<InputPasswordType>('text');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email field is required"),
            password: Yup.string().required("Password field is required").min(8, 'Password length less than 8 characters'),
            confirmPassword: Yup.string().required("Password field is required").min(8, 'Password length less than 8 characters')
        }),
        onSubmit: values => {
            dispatch(RegisterTC(values))
        },
    })

    const showPasswordHandler = () => setInputPassword('text')
    const hidePasswordHandler = () => setInputPassword('password')
    const showConfirmPasswordHandler = () => setInputConfirmPassword('text')
    const hideConfirmPasswordHandler = () => setInputConfirmPassword('password')

    if (isRegisterIn) {
        return <Navigate to={PATH.login}/>
    }

    if (loggedIn) {
        return <Navigate to={PATH.profile}/>
    }

    return (
        <div className={commonStyle.container}>

            <h2>Registration</h2>

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

                    <FormControl variant="outlined" sx={{marginBottom: '10px'}}>
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

                    <FormControl variant="outlined" sx={{marginBottom: '10px'}}>
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            type={inputConfirmPassword}
                            label="confirmPassword"
                            {...formik.getFieldProps('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={showConfirmPasswordHandler}
                                        onMouseDown={hideConfirmPasswordHandler}
                                        edge="end"
                                    >
                                        {inputConfirmPassword === 'text' ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <div className={commonStyle.errorInput}>{formik.errors.password}</div>}

                    <ButtonForm nameButton={"Registration"}/>

                </FormGroup>
            </form>

            <div className={commonStyle.textQuestion}>Already have an account?</div>

            <NavLink className={commonStyle.link} to={PATH.login}>
                Sign in
            </NavLink>
        </div>
    )
}