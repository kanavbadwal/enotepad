const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "asecretfor security";

// Create a user using : POST "/api/auth/createuser". No login required.
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be of atleast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    // If an error, it'll return a bad request and an error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with this email exists already.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "The email already exists. Please enter another email.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Data is sent to the database.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: user.id,
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      //console.log(jwtData);

      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Error: "Internal server error." });
    }
  }
);

// Authenticate the user using : POST "/api/auth/login". No login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be empty.").exists(),
  ],
  async (req, res) => {
    // If an error, it'll return a bad request and an error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Check email
      let user = await User.findOne({ email });
      //Throw an error if email not found.
      if (!user) {
        return res.status(400).json({
          error:
            "The current credentials are wrong. Please enter the valid credentials.",
        });
      }
      //Compare Password
      const passwordCompare = await bcrypt.compare(password, user.password);
      //Throw an error if password not found.
      if (!passwordCompare) {
        return res.status(400).json({
          error:
            "The current credentials are wrong. Please enter the valid credentials.",
        });
      }
      // Return a token if email and password is valid.
      const data = {
        user: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Error: "Internal server error." });
    }
  }
);

module.exports = router;
