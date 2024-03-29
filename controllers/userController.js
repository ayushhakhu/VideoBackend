const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const foundUser = await UserModel.findOne({ username: username });

    if (!foundUser) {
      throw new Error(`User not Found - ${foundUser}`);
    }

    const cryptPassword = await bcrypt.compare(password, foundUser.password);

    if (!cryptPassword) {
      throw new Error(`Password do not match`);
    }

    let token;

    token = jwt.sign(
      { username: username },
      "superSecretPasscodeImpossibletoCrack",
      { expiresIn: "1h" }
    );

    await res.status(201).json({
      message: "Successfully logged in",
      token: token,
      username: username,
    });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    const foundUser = UserModel.find({ username: username });

    if (!foundUser) {
      const cryptedPassword = await bcrypt.hash(password, 12);

      const newUser = new UserModel({
        username: username,
        password: cryptedPassword,
        firstName: firstName,
        lastName: lastName,
      });

      await newUser.save();

      await res.status(200).json({ message: "Created New User" });
    } else {
      res
        .status(400)
        .json({ message: `User with username - ${username} already exists` });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signup,
};
