const {check} = require("express-validator")


const { customError } = require("../../utils/customError")
const {EmptyValue,InvalidLength,InvalidType,InvalidFormat} = customError


itemValidation = [
    check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"name"}))
    .isLength({min:3,max:30})
    .withMessage(InvalidLength({msg:"Must be between 3-30 char long"}))
    .isAlpha('en-US',{ignore:'/s'})
    .withMessage(InvalidType({msg:"Must be in alphabetic form"})),

    check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage(EmptyValue({field:"description"}))
    .isLength({min:30,max:256})
    .withMessage(InvalidLength({msg:"Must be between 30-256 char long",field:"description"}))
]

auctionValidation = [
    check('bidStartTime')
    .optional()
    .notEmpty()
    .withMessage(EmptyValue({field:"bidStartTime"}))
    .isISO8601()
    .withMessage(InvalidFormat({field:"bidStartTime"})),
    

    check('bidEndTime')
    .optional()
    .notEmpty()
    .withMessage(EmptyValue({field:"bidEndTime"}))
    .isISO8601()
    .withMessage(InvalidFormat({field:"bidEndTime"})),

    
    check('bidStatus')
    .trim()
    .notEmpty()
    .withMessage(EmptyValue({field:"bidStatus"}))
    .toUpperCase()
    .custom((value)=>{
        if(value==="AUCTION"||value==="SOLD"){
            return true
        }
        return false
    })
    .withMessage(InvalidFormat({field:"bidStatus"}))
]


module.exports = {
    itemValidation,
    auctionValidation,
}