const {check} = require("express-validator")


const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidLength,InvalidType} = customError


itemValidation = [
    check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:3,max:30})
    .withMessage(InvalidLength({msg:"Must be between 3-30 char long"}))
    .isAlpha('en-US',{ignore:'/s'})
    .withMessage(InvalidType({msg:"Must be in alphabetic form"})),

    check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:30,max:256})
    .withMessage(InvalidLength({msg:"Must be between 30-256 char long"}))
]


module.exports = {
    itemValidation
}