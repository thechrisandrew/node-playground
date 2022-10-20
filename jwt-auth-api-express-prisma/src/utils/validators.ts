import Joi from "joi";

export const validateRegisterInput = (username: string, email: string, password: string, confirmPassword: string) => {
    const registerSchema = Joi.object().keys({
        username: Joi.string().alphanum().min(6).max(30).required().trim().lowercase(),
        email: Joi.string().email().required().trim().lowercase(),
        password: Joi.string().trim().min(8).required(),
        confirmPassword: Joi.string().trim().valid(Joi.ref("password")).required().messages({
            "any.only": `"password" must match`,
        }),
    });

    const { error, value } = registerSchema.validate(
        { username, email, password, confirmPassword },
        { abortEarly: false }
    );

    return { error, validatedValue: value };
};

export const validateLoginInput = (username: string, password: string) => {
    const loginSchema = Joi.object().keys({
        username: Joi.string().alphanum().min(6).max(30).required().trim().lowercase(),
        password: Joi.string().trim().min(8).required(),
    });

    const { error, value } = loginSchema.validate({ username, password }, { abortEarly: false });

    return { error, validatedValue: value };
};
