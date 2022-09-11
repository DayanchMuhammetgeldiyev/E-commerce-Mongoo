const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
    console.log(error);
  }
});

router.post("/login", async (req, res)=>{
   try {
        const user = await User.findOne({username: req.body.username}) ;
        !user && res.status(401).json("Wrong Username");

        const hashedPassword = CryptoJs.AES.decrypt(
          user.password, 
          process.env.PASS_SEC);

        const password = hashedPassword.toString(CryptoJs.enc.Utf8);

        password !== req.body.password && 
        res.status(401).json("Wrong Password");
          
          const { password, ...others } = user;

        res.status(200).json(others);
   } catch (err) {
          res.status(500).json(err);
   }
});



module.exports = router;
