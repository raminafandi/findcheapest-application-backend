const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

/* 
POST Method : /api/auth/register
Registers the user
Returns : token for authentication
no need to be authenticated
*/

router.post("/register", async (req, res) => {
  const { email, password, password2, username } = req.body;
  if (password !== password2) {
    return res.status(400).json({
      errors: [
        {
          msg: "Passwords don't match!",
        },
      ],
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "This account exists",
          },
        ],
      });
    }
    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* 
POST Method : /api/auth/Login
Login the user
Returns : token for authentication
no need to be authenticated
*/

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "This account doesn't exist",
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      if (err) throw err;
      res.json({
        token,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* 
GET Method : /api/auth/myprofile
Gets the user information
Returns : user info as object without password field
should be authenticated
*/

router.get("/myprofile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* 
/api/auth/updateprofile
Updates the user information
Returns: updated user information
should be authenticated
*/
router.put("/updateprofile", auth, async (req, res) => {
  const { emailNew, usernameNew } = req.body;
  try {
    let user = await User.findById(req.user.id).select("-password");
    emailNew ? (user.email = emailNew) : null;
    usernameNew ? (user.username = usernameNew) : null;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* 
/api/auth/changepassword
Updates the user password
Returns: updated user information
should be authenticated
*/
router.put("/changepassword", auth, async (req, res) => {
  const { passwordOld, passwordNew, passwordNew2 } = req.body;
  try {
    let user = await User.findById(req.user.id);
    const salt = await bcrypt.genSalt(10);

    const isMatch = await bcrypt.compare(passwordOld, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "Old Password is no correct.",
          },
        ],
      });
    }

    if (passwordNew === passwordNew2) {
      user.password = await bcrypt.hash(passwordNew, salt);
      await user.save();
    } else {
      return res.status(400).json({
        errors: [
          {
            msg: "Passwords are not matching.",
          },
        ],
      });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
