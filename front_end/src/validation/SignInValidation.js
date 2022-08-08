import Joi from "joi";

export const loginValidation = (values) => {
    // console.log(typeof(values));

    const formateValues = JSON.parse(JSON.stringify(values));

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
        showPassword: Joi.boolean(),
    });
    
    // console.log('Checking login info format...');
    
    const  validation  = schema.validate(formateValues);
    // console.log("🚀 ~ file: SignInValidation.js ~ line 15 ~ loginValidation ~ error", validation);
    // console.log(typeof(validation));
    // console.log("🚀 ~ file: SignInValidation.js ~ line 15 ~ loginValidation ~ validation", validation)
    
    // if there is no error, the "details" key will be undefined in error
    if(validation !== undefined) {
        try{
            const error = {}
            const errorMessage = validation.error.details[0].path[0];

            switch (errorMessage) {
                case 'email':
                    error.email = 'Invalid Email address!';
                    break;
                case 'password':
                    error.password = 'Password must be at least 6 characters!';
                    break;
                default:
                    break;
            }

            return error;
        }
        catch{
            return null;
        }
    }
    return null;
}

export const registerValidation = (values) => {
    // console.log(typeof(values));

    const formateValues = JSON.parse(JSON.stringify(values));

    const schema = Joi.object({
        name: Joi.string().required(),
        tel: Joi.string().regex(/^\d{4}\d{3}\d{3}$/).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string(),
        showPassword: Joi.boolean(),
    });
    
    console.log('Checking register info format...');
    
    const  validation  = schema.validate(formateValues);
    // console.log("🚀 ~ file: SignInValidation.js ~ line 15 ~ loginValidation ~ validation", validation);
    // console.log(typeof(validation));
    // console.log("🚀 ~ file: SignInValidation.js ~ line 15 ~ loginValidation ~ validation", validation)
    
    // if there is no error, the "details" key will be undefined in error
    if(validation !== undefined) {
        try{
            const error = {}
            const errorMessage = validation.error.details[0].path[0];

            switch (errorMessage) {
                case 'name':
                    error.name = 'Invalid name!';
                    break;
                case 'tel':
                    error.tel = 'Invalid tel number!';
                    break;
                case 'email':
                    error.email = 'Invalid Email address!';
                    break;
                case 'password':
                    error.password = 'Password must be at least 6 characters!';
                    break;
                default:
                    break;
            }

            return error;
        }
        catch{
            return null;
        }
    }
    return null;
}

// export { loginValidation, registerValidation }