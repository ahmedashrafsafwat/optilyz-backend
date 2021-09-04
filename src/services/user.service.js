const User = require("../models/user");
const { validateEmail, validateFields } = require("../helper")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.userService = {
  login: async (req, res, callback) => {
    try {
        const { email, password } = req.body;

        let errors = validateFields({email,password}, ["email","password"]);

        if(errors) {
            return  callback({message:errors,code:400})
        }

        if(!validateEmail(email)) {
            return     callback({message:"Enter a valid email",code:400})
        }

    
    // Validate if user exist in our database
    var user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // remove unneccessery keys
      // first return mongoose to plain JavaScript object 
      user = user.toObject();

     delete user["password"];
     delete user["created"];
     delete user["updated"];
     delete user["__v"];

      return callback(null,user);
    } else
        return callback({message:"Invalid Credentials",code:401});
    } catch (err) {
        return  callback({message: err.message,code:500});

    }
  },

  register: async (req, res, callback) => {
    try {
        let { email, password,name } = req.body;

        email = email.toLowerCase();

        let errors = validateFields({email, password,name }, ["email","password","name"]);
        
        console.log(errors)
        if(errors) {
            return  callback({message:errors,code:400})
        }

        if(!validateEmail(email)) {
            return callback({message:"Enter a valid email",code:400})
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return callback({message:"User email already exist.",code:409}); 
        }

        let encryptedPassword = await bcrypt.hash(password, 10);
 
        // Create user in our database
        let user = await User.create({
          name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    user = user.toObject();

    delete user["password"];
    delete user["created"];
    delete user["updated"];
    delete user["__v"];

    // return new user
      return callback(null, user);
    } catch (err) {
        console.log(err)
        return callback({message: err.message,code:500});
    }
  },
};
