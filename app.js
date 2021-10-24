require("dotenv").config();
require("./models/db").connect();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const express = require("express");
const {check,validationResult} = require('express-validator')

const User = require('./controller/user');
const Course = require('./controller/course');
const auth = require('./controller/auth');
const app = express();

app.use(express.json());

app.post("/login",async (req, res) => {

  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;
      res.redirect('/home?token='+token);
    }
    res.status(400).send("PLease Check your password");
  } catch (err) {
    console.log(err);
  }
});

app.post("/register", [
    check('email',"Email not Valid").isEmail(),
    check('password',"Password length should be above 10").isLength({min:10}),
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        res.json(errors);
    }
    else{
    try {
      const { first_name, last_name, email, mobile ,cpassword, password,country } = req.body;
      if(password != cpassword)
        res.send("Password Not Matched");
    else{
      const exist = await User.findOne({ email });
  
      if (exist) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        first_name,
        last_name,
        email,
        mobile,
        password: encryptedPassword,
        country,
      });
  
      const token = jwt.sign(
        { email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      user.token = token;
  
      res.status(201).json(user);
    }
    } catch (err) {
      console.log(err);
    }
}
  });

  app.get("/home",auth, (req, res) => {
    var tokenkey = req.query.token || req.body.token;
    const {ctitle,cdesc,ccat,cdur,pr} = req.body;
    const add = Course.create({
        ctitle,
        cdesc,
        ccat,
        cdur,
        pr,
    })
    if(req.files){
        console.log(req.files);
        var file = req.files.file;

        file.mv('./uploads/'+ctitle,(err)=>{
            if(err){
                console.log(err);
            } else {
                res.send("File Uploaded successfully");
            }
        })
    }
  });

  app.get('/view/:title',(req,res)=>{
    const title = req.params.title;
    
  });

  
app.listen(3000,console.log("Server started"));