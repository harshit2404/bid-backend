const {check} = require("express-validator")


const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidLength,InvalidFormat,InvalidType} = customError


addressValidation = [
    check('address1')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"address1"}))
    .isLength({min:5,max:46})
    .withMessage(InvalidLength({msg:"Must be between 5-46 char long",field:"address1"})),

    check('address2')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"address2"}))
    .isLength({min:5,max:46})
    .withMessage(InvalidLength({msg:"Must be between 5-46 char long",field:"address2"})),

    check('address3')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"address3"}))
    .isLength({min:5,max:46})
    .withMessage(InvalidLength({msg:"Must be between 5-46 char long",field:"address3"})),

    check('city')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"city"}))
    .isAlpha()
    .withMessage(InvalidType({msg:"Must be in alphabetic form",field:"city"}))
    .isLength({min:3,max:46})
    .withMessage(InvalidLength({msg:"Must be between 3-46 char long",field:"city"})),

    check('state')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"state"}))
    .isAlpha()
    .withMessage(InvalidType({msg:"Must be in alphabetic form",field:"state"}))
    .isLength({min:3,max:46})
    .withMessage(InvalidLength({msg:"Must be between 3-46 char long",field:"state"})),

    check('country')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"country"}))
    .isAlpha('en-US',{ignore:'/s'})
    .withMessage(InvalidType({msg:"Must be in alphabetic form",field:'country'}))
    .isLength({min:3,max:90})
    .withMessage(InvalidLength({msg:"Must be between 3-90 char long",field:'country'})),

    check('postalcode')
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"postalcode"}))
    .isLength({min:6,max:6})
    .withMessage(InvalidLength({msg:"Must be 6 char long",field:'postalcode'}))
    .not()
    .matches("^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$")
    .withMessage(InvalidFormat({field:"postalcode"}))



]


module.exports = {
    addressValidation
}