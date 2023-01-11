export default function useRegisterFields(errors) {
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
        password: {
            id: "password",
            autoComplete: 'off',
            required: 'required',
            hasError: errors.password,
            validation: {
                required: 'This filed is required',
                minLength: { value: 5, message: 'Required at least 5 charcters' }
            }
        }
    }
    return fields
}

