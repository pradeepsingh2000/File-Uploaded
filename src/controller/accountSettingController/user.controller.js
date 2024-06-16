const MESSAGE_CONSTANTS = require("../../constant/message");
const { userRepository } = require("../../repository/accountSettingRepository");
const responseHandler = require("../../utils/responseHandler");
const { tryCatchFn } = require("../../utils/tryCatchFn");

module.exports.login = tryCatchFn(async(req,res,next) => {
    const data = await userRepository.login(req.body)
    if(data) {
        return responseHandler.successResponse(
            res,
            201,
            MESSAGE_CONSTANTS.LOGIN,
            data
        )
    }
    else {
        return responseHandler.errorResponse(
            res,
            400,
            MESSAGE_CONSTANTS.INVALID_CREDENTIAL,
            []
        )
    }
    
})

module.exports.singup = tryCatchFn(async(req,res,next) => {
const data = await userRepository.signup(req.body)
return responseHandler.successResponse(
    res,
    201,
    MESSAGE_CONSTANTS.REGISTER,
    data
)
})

module.exports.profile = tryCatchFn(async(req,res,next) => {
    const data = await userRepository.profile(req.user)
    return responseHandler.successResponse(
        res,
        200,
        MESSAGE_CONSTANTS.SUCCESS,
        data
    )
})