export default function useRegisterFields(watch, errors) {
    const fields = {
        username: {
            id: "username",
            autoComplete: 'off',
            required: 'required',
            hasError: errors.username,
            validation: {
                required: 'This filed is required',
                minLength: { value: 4, message: 'Required at least 4 charcters' }
            }
        },
        email: {
            id: "email",
            autoComplete: 'off',
            required: 'required',
            hasError: errors.email,
            validation: {
                required: 'This filed is required',
                pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z]+\.(com|bg|net)$/, message: 'This email is invalid' }
            }
        },
        password: {
            id: "password",
            autoComplete: 'off',
            required: 'required',
            hasError: errors.password,
            validation: {
                required: 'This filed is required',
                minLength: { value: 5, message: 'Required at least 5 charcters' }
            }
        },
        confirmPassword: {
            id: "confirmPassword",
            autoComplete: 'off',
            required: 'required',
            hasError: errors.confirmPassword,
            validation: {
                required: 'This filed is required',
                validate: (value) => {
                    if (watch('password') !== value) {
                        return "Passwords do not match!";
                    }
                }
            }
        }
    }
    return fields
}

