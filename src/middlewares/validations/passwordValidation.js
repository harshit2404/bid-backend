const {check} = require("express-validator")



const { customError } = require("../../utils/customError")
const {InvalidPassword} = customError

passwordValidation = [
    check('newPassword')
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
]

module.exports = {
    passwordValidation,
}