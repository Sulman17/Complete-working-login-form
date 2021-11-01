const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
  
    // *connection with database
    require('../database/server');
    const User = require('../userdata/schema');

 router.get('/', (req, res) => {
    res.send('Hello World');
    
});
// *! using promising 
// router.post('/register', (req, res) => {
//     //*destructuring in javascript
//      const {name, email, phone, password, confirmPassword} = req.body;
//     console.log(name);
     // *showing error to user if he does not fill the form
//     if (!name || !email || !phone || !password || !confirmPassword) {
//         return res.status(422).json({error: "Please fill the remainings"})
//     }

     // *check if user already registered
//     User.findOne({email: email})
//          .then((userExists) => {
//           if (userExists) {
//               return res.status(422).json({error: "User already registered"});
//           }
     // *registering new user on database
//           const user = new User({name, email, phone, password, confirmPassword});
//           user.save().then(() => {
//            res.status(201).json({message: "User registered"});
//           }).catch((error) => res.status(500).json({error:"failed to register"}));

//          }).catch(error => { console.log(error);});
    
// });
// *!using aysnc await
router.post('/register', async (req, res) => {
    //*destructuring in javascript
     const {name, email, phone, password, confirmPassword} = req.body;
    console.log(name);
    // *showing error to user if he does not fill the form
    if (!name || !email || !phone || !password || !confirmPassword) {
        return res.status(422).json({error: "Please fill the remainings"})
    }
    // *check if user already registered
    try{
      const userExists = await User.findOne({email: email});

      if(userExists){
        return res.status(422).json({error: "User already registered"});
      }
      // *check if password and confirm password are same
      else if (password != confirmPassword){
        
        return res.status(422).json({error: "Passwords must match"});
      }else{
      // *registering new user on database
            const user = new User({name, email, phone, password, confirmPassword});
              
             await user.save()
            
            res.status(201).json({message: "User registered"});
            }

    } catch(err) { console.log(err);
    
    }
    
});

// ! login route

router.post('/login', async (req, res) => {
     try{
       let token;
     const {email, password} = req.body;
     if(!email || !password){
       return res.status(400).json({error: "Cant be empty"});
     }
    //* checking if email already registered while login
    const userLogin = await User.findOne({email: email});
    
    // *if user put wrong email and password
    if (userLogin) {

      const passwordMatch = await bcrypt.compare(password, userLogin.password);
     token = await userLogin.generateAuthToken();
     console.log(token);
        // ! token store on cookies for certain time
        res.cookie("storedtoken" , token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

    if (!passwordMatch) {
      
      res.status(400).json({error: "invalid credentials"});
    } else {
      res.json({message: "Signed in successfully"});
       }
      }else{
      
      res.status(400).json({error: "invalid credentials"});
      }

     }catch(err){ console.log(err);
    
    }

});

// ! aboutus page
router.get('/about', authentication, (req, res) => {
    res.send(req.loginUser);
});

module.exports = router;

// !getting user data from contact us page
router.get("/getdata", authentication, (req, res) => {
  console.log("This is contact page");
  res.send(req.loginUser);
  console.log("After req.rootUser");
});

//!contact us page
router.post("/contact", authentication, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "Please fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();
      res.status(201).json({ message: "user contact saved successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});
// !Logout page
router.get('/logout', (req, res) => {
  res.clearCookie('storedtoken', {path: '/'});
  res.status(200).send('user logged out');
});