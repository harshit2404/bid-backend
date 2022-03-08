const {check} = require("express-validator")



const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidLength,InvalidEmail,InvalidPassword,InvalidType} = customError



signupValidation = [
    check("username")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"username"}))
    .isLength({min:6,max:30})
    .withMessage(InvalidLength({msg:"Must be between 6-30 char long",field:"username"})),

    check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"email"}))
    .isEmail()
    .withMessage(InvalidEmail)
    .normalizeEmail(),
 
    (req,res,next)=>{
    if(req.method=='POST'){
    check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"password"}))
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
    .withMessage(EmptyValue({field:"firstname"}))
    .isLength({min:3,max:20})
    .withMessage(InvalidLength({msg:"Must be between 3-20 char long",field:"firstname"}))
    .isAlpha()
    .withMessage(InvalidType({msg:"Alphabetic values allowed only",field:"firstname"})),

    check("lastname")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"lastname"}))
    .isLength({min:3,max:20})
    .withMessage(InvalidLength({msg:"Must be between 3-20 char long",field:"lastname"}))
    .isAlpha()
    .withMessage(InvalidType({msg:"Alphabetic values allowed only",field:"lastname"})),

    check("phoneNumber")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:10,max:10})
    .withMessage(InvalidLength({msg:"Must be 10 character long",field:"phoneNumber"}))
    .isNumeric()
    .withMessage(InvalidType({msg:"Numeric values allowed only",field:"phoneNumber"})),

    check('isActive')
    .optional()
    .trim()
    .isBoolean()
    .withMessage(InvalidType({msg:"Boolean values allowed only"}))



    

]


module.exports = {
    signupValidation
}