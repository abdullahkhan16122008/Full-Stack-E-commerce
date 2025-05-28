import Joi from "joi";


// Signup Validation
const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).max(100).required(),
        role: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            error: error.details[0].message // cleaner error message
        });
    }
    next();
};

// Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(7).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            error: error.details[0].message // cleaner error message
        });
    }
    next();
};

export { signUpValidation, loginValidation };
