export const validateSignUpForm = (dataUser) => {
    console.log(dataUser);
    const errors = [];

    if (!dataUser .username) {
        errors.push("El nombre de usuario es obligatorio.");
    }

    if (!dataUser .email) {
        errors.push("El correo electrónico es obligatorio.");
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(dataUser .email)) {
        errors.push("El email es inválido.");
    }

    if (!dataUser .password) {
        errors.push("La contraseña es obligatoria.");
    } else if (dataUser .password.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres.");
    }

    if (dataUser .password !== dataUser .confirmPassword) {
        errors.push("Las contraseñas no coinciden.");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};
