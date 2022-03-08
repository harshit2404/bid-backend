const {check} = require("express-validator")


const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidType} = customError


bidValidation = [
    check("bidAmount")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"bidAmount"}))
    .toFloat()
    .isFloat()
    .withMessage(InvalidType({msg:"Must be a float number",field:"bidAmount"}))
    
]

module.exports = {
    bidValidation,
}