const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// controller actions
const signup_get = (req, res) => {
  res.render('signup');
}

const login_get = (req, res) => {
  res.render('login');
}

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

const login_post = (req, res) => {
  console.log(req.body);
  const id = "5fff3abb3d0a1f7a50f2305b";

  User.findById(id)
    .then((result) => {
      console.log(result);
       if(req.body.email==result.email && req.body.password==result.password){
        res.redirect("/reservations");
      }
      else{
        res.redirect("/wronglogin");
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Reservation not found" });
    });
  const { email, password } = req.body;

  // console.log(email, password);
  
  // res.send('user login');
}
module.exports = {
  login_post,
  signup_get,
  login_get,
  signup_post,
};