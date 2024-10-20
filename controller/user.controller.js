const { loginWithEmail } = require('../util/loginService.js');
const { createUser } = require('../util/userService.js');

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await createUser(name, email, password);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await loginWithEmail(email, password);

    const token = foundUser.generateToken();
    const { _id, name, email: userEmail } = foundUser;

    res.status(200).json({
      status: 'ok',
      data: {
        user: { _id, name, email: userEmail },
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

module.exports = userController;
