const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log('hello world', req.body);

  UserModel.create(
    { name: name, email: email, password: password }
  ).then(user=>{
    res.json({
      status: "success",
      message: "User added successfully!!!",
      data: null,
    });
  }).catch(e=>console.log(e))
};

exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({
    email: email
  }).then(user=>{
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.id },
        process.env.Secret_Token,
        {expiresIn:'1h'}
      );
      res.json({
        status: "success",
        message: "user Found !!!!",
        data: { user: user, token: token },
      });
    } else {
      res.json({
        status: "error",
        message: "Invalid email/password!!!",
        data: null,
      });
    }
  }).catch(e=> console.log(e))
};
