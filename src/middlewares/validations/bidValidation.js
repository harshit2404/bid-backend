const {check} = require("express-validator")


const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidType} = customError


bidValidation = [
    check("price")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue)
    .toFloat()
    .isFloat()
    .withMessage(InvalidType("Must be a float number"))
    
]

module.exports = {
    bidValidation,
}