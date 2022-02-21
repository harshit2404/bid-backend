const {check} = require("express-validator")



const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidLength,InvalidEmail,InvalidPassword,InvalidType} = customError



signupValidation = [
    check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:6,max:30})
    .withMessage(InvalidLength({msg:"Must be between 6-30 char long"})),

    check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isEmail()
    .withMessage(InvalidEmail)
    .normalizeEmail(),
 
    (req,next)=>{
    if(req.method=='POST'){
    check("password")
    .trim()
    .isLength({min:8})
    .withMessage(InvalidPassword)
    .not()
    .isLowercase()
    .withMessage(InvalidPassword)
    .not()
    .isUppercase()
    .withMessage(InvalidPassword)
    .not()
    .isNumeric()
    .withMessage(InvalidPassword)
    .not()
    .isAlpha()
    .withMessage(InvalidPassword)
    .run(req)
    return next()
    }else{
        return next()
    }
    

    
}
    ,

    check("firstname")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:3,max:20})
    .withMessage(InvalidLength({msg:"Must be between 3-20 char long"}))
    .isAlpha()
    .withMessage(InvalidType({msg:"Alphabetic values allowed only"})),

    check("lastname")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:3,max:20})
    .withMessage(InvalidLength({msg:"Must be between 3-20 char long"}))
    .isAlpha()
    .withMessage(InvalidType({msg:"Alphabetic values allowed only"})),

    check("phoneNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:10,max:10})
    .withMessage(InvalidLength({msg:"Must be 10 character long"}))
    .isNumeric()
    .withMessage(InvalidType({msg:"Numeric values allowed only"})),

    check('isActive')
    .optional()
    .trim()
    .isBoolean()
    .withMessage(InvalidType({msg:"Boolean values allowed only"}))



    

]


module.exports = {
    signupValidation
}