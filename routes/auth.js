// const express = require("express");
// const passport = require("passport");
// const router = express.Router();
// const User = require("../models/User");

// // Bcrypt to encrypt passwords
// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, failureDetails) => {
//     if (err) {
//       console.log(failureDetails);
//       return res
//         .status(500)
//         .json({ message: "Something went wrong authenticating user" });
//     }

//     if (!user) {
//       return res.status(401).json({ message: "Wrong Username or Password" });
//     }
//     req.login(user, (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Session save went bad." });
//       }
//       res.status(200).json(user);
//     });
//   })(req, res, next);
// });

// router.post("/signup", async (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const email = req.body.email;
//   if (username === "" || password === "") {
//     res.status(401).json({ message: "Indicate username and password" });
//     return;
//   }

//   await User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       return res.status(401).json({ message: "The username already exists" });
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username,
//       password: hashPass,
//       email,
//     });

//     newUser
//       .save()
//       .then(() => {
//         res.status(200).json(newUser);
//       })
//       .catch((err) => {
//         res.status(500).json({ message: "Something went wrong" });
//       });
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.status(200).json({ message: "loggedOut" });
// });

// router.get("/currentuser", (req, res) => {
//   res.status(200).json({ user: req.user });
// });

// router.put("/photo", async (req, res, next) => {
//   const { image } = req.body;
//   const user = await User.findByIdAndUpdate(
//     req.user.id,
//     { image: image },
//     { new: true }
//   );
//   res.status(201).json({ message: "photo updated" });
// });

// module.exports = router;
