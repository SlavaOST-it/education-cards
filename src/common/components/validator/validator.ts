type ErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
    rememberMe?: boolean
}

export const validator = (values: ErrorsType) => {
    const errors: ErrorsType = {};
    if (!values.email) {
        errors.email = 'Email field is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Password field is required'
    } else if (values.password.length < 8) {
        errors.password = 'Password length less than 8 characters'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Password field is required'
    } else if (values.confirmPassword.length < 8) {
        errors.confirmPassword = 'Password length less than 8 characters'
    }

    return errors
};