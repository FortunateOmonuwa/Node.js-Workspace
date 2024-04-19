const {
  User,
  usernameRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
  emailRegex,
} = require("../Models/User");

const bcrypt = require("bcrypt");
const RegisterUsers = async (req, res) => {
  const { body } = req;

  const { firstname, lastname, username, phonenumber, age, email, password } =
    body;

  try {
    const checkUsername = await User.findOne({ username });

    switch (true) {
      case !usernameRegex.test(username) || !username:
        console.log(
          "Username can only contain alphanumeric characters and underscores"
        );
        return res.status(400).json({
          error: `Username can only contain alphanumeric characters and underscores`,
        });

      case checkUsername:
        console.log("Username already exist");
        return res
          .status(400)
          .json({ error: "Username already exists. Please try again" });

      case !passwordRegex.test(password) || !password:
        console.log(`${password} is not a valid password format`);
        return res.status(400).json({
          error:
            "password contains at least one special character and is at least 7 characters long",
        });
      case !emailRegex.test(email) || !email:
        console.log(`Email is invalid`);
        return res.status(400).json({ error: "email is invalid" });

      case !firstname ||
        !lastname ||
        !nameRegex.test(firstname) ||
        !nameRegex.test(lastname):
        console.log(" Name format is invalid");
        return res.status(400).json({
          error: "Name format is invalid...Please check and try again",
        });

      case !age || age < 18:
        console.log("Age can't be less than 18");
        return res.status(400).json({
          error: "Age can't be less than 18",
        });

      case !phoneRegex.test(phonenumber) | phonenumber:
        console.log("phone number input is invalid");
        return res.status(400).json({ error: "Phonenumber input is invalid" });
      default:
        String(phonenumber);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        body.password = hashedPassword;
        const user = new User(body);
        await user.save();
        console.log("User successfully created");
        return res.status(201).json({ user });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
const Login = async (req, res) => {
  try {
    const { body } = req;
    const { username } = body;
    const checkUser = await User.findOne({ username });
    if (!checkUser) {
      console.log("User doesn't exist. Please check credentials and try again");
      res.status(400).json({
        error: "User doesn't exist,... Please check credentials and try again",
      });
    } else {
      (await bcrypt.compare(body.password, checkUser.password))
        ? res.status(200).json("Login successful")
        : res.status(401).json("Password is incorrect");
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ error: e.message });
  }
};
module.exports = {
  RegisterUsers,
  Login,
};
