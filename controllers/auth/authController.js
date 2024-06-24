const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = bcrypt.compareSync(password, user?.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        userId: user._id,
      },
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(204).json();
};

const refresh = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (!user) {
    throw HttpError(401, "Invalid token");
  }

  const payload = {
    id: user._id,
  };
  const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token: newToken });

  return res.json({
    status: "success",
    code: 200,
    data: {
      token: newToken,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        userId: user._id,
      },
    },
  });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({ name, email, password: hashPassword });

  const newUser = await User.findOne({ email });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  newUser.token = token;
  await newUser.save();

  return res.status(201).json({
    status: "success",
    code: 201,
    data: {
      token,
      user: {
        name,
        email,
        avatar: newUser.avatar,
        userId: newUser._id,
      },
    },
  });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file?.path;

  const user = await User.findById({ _id });

  if (!avatarURL) {
    user.name = req.body.name;
    user.save();

    return res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name: req.body.name,
          avatar: user.avatar,
        },
      },
    });
  } else {
    user.name = req.body.name;
    user.avatar = avatarURL;
    user.save();

    return res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name: req.body.name,
          avatar: avatarURL,
        },
      },
    });
  }
};
const getCurrentUser = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  return res.json({
    status: "success",
    code: 200,
    data: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      userId: user._id,
    },
  });
};

module.exports = {
  login,
  logout,
  refresh,
  signup,
  updateUser,
  getCurrentUser
};
