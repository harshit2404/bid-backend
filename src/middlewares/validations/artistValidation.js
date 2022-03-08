const {check} = require("express-validator")


const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidLength,InvalidType} = customError


artistValidation = [
    check("name")
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"name"}))
    .isLength({min:3,max:30})
    .withMessage(InvalidLength({msg:"Must be between 3-30 char long",field:"name"}))
    .isAlpha('en-US',{ignore:'/s'})
    .withMessage(InvalidType({msg:"Must be in alphabetic form",field:"name"})),

    check("bio")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"bio"}))
    .isLength({min:30,max:256})
    .withMessage(InvalidLength({msg:"Must be between 30-256 char long",field:"bio"}))
    

    
]

module.exports = {
    artistValidation,
}