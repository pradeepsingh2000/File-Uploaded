

const userModel = require('../models/user.model');

const admins = [
  {
    fullName: 'Admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    userType: 'admin',
  },
];

module.exports.seedData = async () => {
  try {
    await Promise.allSettled(
      admins.map(async (e) => {
        let result = await userModel.findOne({
          email: e?.email,
        });
        if (!result) {
          await userModel.create(e);
        }
      })
    );
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Mock data is seeded from seed script.');
  }
};
