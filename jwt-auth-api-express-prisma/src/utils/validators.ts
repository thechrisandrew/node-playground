import Joi from "joi";

export const validateRegisterInput = (username: string, email: string, password: string, confirmPassword: string) => {
    const registerSchema = Joi.object().keys({
        username: Joi.string().alphanum().min(6).max(30).required().trim(),
        email: Joi.string().email().required().trim(),
        password: Joi.string().trim().min(8).required(),
        confirmPassword: Joi.string().trim().valid(Joi.ref("password")).required().messages({
            "any.only": `"password" must match`,
        }),
    });

    const { error } = registerSchema.validate({ username, email, password, confirmPassword }, { abortEarly: false });

    return error;
};
