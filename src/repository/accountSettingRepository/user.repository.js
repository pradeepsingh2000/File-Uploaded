const userModel = require("../../models/user.model");
const { validatePasswordEncryption, jwtTokenCreate, passwordEncryption } = require("../../utils/comman");

module.exports.login = async (body) => {
    const { email, password } = body;
    let query = {email}
    const userResult = await userModel.findOne(query);
    if (userResult) {
        if (userResult) {
          const isValidPassword = await validatePasswordEncryption(
            password,
            userResult?.password
          );
          if (isValidPassword) {
            const payload = {
              fullName: userResult?.fullName,
              userId: userResult?._id,
              userType: userResult?.userType,
              email: userResult?.email,
            };
            const token = jwtTokenCreate(payload);
            payload.token = token;
            return payload;
          }
          return false;
        }
      }
      return false;
}

module.exports.signup = async (body) => {
    try {
      const saltPassword = await passwordEncryption(body?.password);
      body.password = saltPassword;
      return await userModel.create(body);
    } catch (error) {
      throw Error(error);
    }
  };

module.exports.profile = async (body) => {
    try {
        const { userId } = body;
        return await userModel.findById(userId).select('-password');
      } catch (error) {
        throw Error(error);
      }
}

module.exports.updateProfile = async (body) => {

}