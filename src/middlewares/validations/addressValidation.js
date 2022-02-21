const {check} = require("express-validator")


const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidLength,InvalidFormat,InvalidType} = customError


addressValidation = [
    check('address1')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:5,max:46})
    .withMessage(InvalidLength({msg:"Must be between 5-46 char long"})),

    check('address2')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:5,max:46})
    .withMessage(InvalidLength({msg:"Must be between 5-46 char long"})),

    check('address3')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:5,max:46})
    .withMessage(InvalidLength({msg:"Must be between 5-46 char long"})),

    check('city')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isAlpha()
    .withMessage(InvalidType({msg:"Must be in alphabetic form"}))
    .isLength({min:3,max:46})
    .withMessage(InvalidLength({msg:"Must be between 3-46 char long"})),

    check('state')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isAlpha()
    .withMessage(InvalidType({msg:"Must be in alphabetic form"}))
    .isLength({min:3,max:46})
    .withMessage(InvalidLength({msg:"Must be between 3-46 char long"})),

    check('country')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isAlpha('en-US',{ignore:'/s'})
    .withMessage(InvalidType({msg:"Must be in alphabetic form"}))
    .isLength({min:3,max:90})
    .withMessage(InvalidLength({msg:"Must be between 3-90 char long"})),

    check('postalcode')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .isLength({min:6,max:6})
    .withMessage(InvalidLength({msg:"Must be 6 char long"}))
    .not()
    .matches("^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$")
    .withMessage(InvalidFormat)



]


module.exports = {
    addressValidation
}