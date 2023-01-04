import {RegisterType} from '../bll/reducers/registration-reducer'
import {instance} from "./apiConfig/instance"
import {LoginResponseType, RegisterResponseType} from "./apiConfig/types";


export const authAPI = {
    me() {
        return instance.post('auth/me').then(res => res.data)
    },

    login: (email: string, password: string, rememberMe: boolean) => {
        return instance.post<LoginResponseType>('auth/login',
            {
                email: email,
                password: password,
                rememberMe: rememberMe
            })
            .then(res => res.data)
    },

    logout: () => {
        return instance.delete('/auth/me')
    },

    register(data: RegisterType) {
        return instance.post<RegisterResponseType>('auth/register', data)
            .then(res => res.data)
    },

    sendEmail(email: string) {
        return instance.post(`auth/forgot`,
            {
                email: email,
                from: "Education cards",
                message: mailMessage
            })
            .then(res => res.data)
    },

    setNewPas(newPass: string, token: string | undefined) {
        return instance.post(`auth/set-new-password`,
            {
                password: newPass,
                resetPasswordToken: token
            })
            .then(res => res.data)
    }
}

const mailMessage = `<div style="text-align: center; background-color: #fff; color: black;">
    <p style="font-size: 26px; font-weight: 600; text-align: center; color: #4F659E;">
        Need to reset your password?
    </p>
    <p style="opacity: 0.5; line-height: 24px; text-align: center;">Click on the button</p>
    <div style="text-align: center">
        <a 
        href="https://SlavaOST-it.github.io/Education_cards/#/setNewPass/$token$"
        style="
            color: #fff; 
            display: inline-block; 
            padding: 10px 30px;  
            border-radius: 20px; 
            background-color: #7398CE;  
            text-align: center; 
            text-decoration: none; 
            font-size: 16px; 
            letter-spacing: 1px;"
        >
            Reset your password
        </a>
    </div>
    <p style="opacity: 0.5; line-height: 24px; text-align: center;">
        If you did not forget your password, you can ignore this email.
    </p>
</div>`;