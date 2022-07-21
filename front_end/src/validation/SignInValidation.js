import Joi from "joi";

export const loginValidation = (values) => {
    console.log(typeof(values));

    const formateValues = JSON.parse(JSON.stringify(values));

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
        showPassword: Joi.boolean(),
    });
    
    console.log('Checking login info format...');
    
    const { error, validation } = schema.validate(formateValues);
    console.log("🚀 ~ file: SignInValidation.js ~ line 15 ~ loginValidation ~ error", error)
    console.log("🚀 ~ file: SignInValidation.js ~ line 15 ~ loginValidation ~ validation", validation)
    
    const errorCode = new Map([
        ['email', 'Invalid Email address!'],
        ['password', 'Invalid Password!'],
    ]);
    
    // if there is no error, the "details" key will be undefined in error
    if(error !== undefined) return Error( error );

    return null;
}

const registerValidation = (values) => {

}

// export { loginValidation, registerValidation }