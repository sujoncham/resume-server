const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user.model");

const saltRounds = 10;

exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}).populate("project")
    .populate("address")
    .populate("skills")
  } catch (error) {
    console.log(error);
  }

  if (!users) {
    return res.status(404).json({
      status: "failed",
      message: "user not found",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "found all users",
    data: users,
  });
};

exports.signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already exists");
    if (email) return res.status(400).send("email already exists");

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      await newUser
        .save()
        .then((user) => {
          return res.status(200).json({
            status: "success",
            message: "user is created successfully",
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((error) => {
          return res.send({
            status: "failed",
            message: "user is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    return res.send({
      status: "failed",
      message: "user is not created",
      error: error,
    });
  }
};

exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user)
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "email not found",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {
      expiresIn: "2d",
    });

    return res.status(200).send({
      success: true,
      message: "user is logged in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "user logged is failed",
      error: error.message,
    });
  }
};

// single user
exports.getProfileById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate("skills")
      .populate("address")
      .populate("messages")
      .populate("projects");

    return res.status(200).json({
      status: "success",
      message: "get user by id successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getTitleById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { title, subTitle } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      title,
      subTitle,
    });

    return res.status(200).json({
      status: "success",
      message: "get user by id successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDescriptionById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { description } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      description,
    });

    return res.status(200).json({
      status: "success",
      message: "get user by id successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.accountDelete = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndRemove(userId);

    return res.status(200).json({
      status: "success",
      message: "deleted user by id successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "not deleted user",
      error: error.message,
    });
  }
};
