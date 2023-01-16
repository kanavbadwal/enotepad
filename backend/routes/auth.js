const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a user using : POST "/api/auth". Doesn't require Auth.
router.post(
  "/",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be of atleast 5 characters.").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Data is sent to the database.
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((error) => {
        console.log("Error,\n" + error);
        res.json({ error: "Enter unique value for the email." });
      });
  }
);

module.exports = router;
