// *user authentication after login so he can see about page
const jwt = require("jsonwebtoken");
const User = require('../userdata/schema');

const authentication = async (req, res, next) => {
    try{
        const token = req.cookies.storedtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const loginUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});
        if(!loginUser){throw new Error("user not found");}
        req.token = token;
        req.loginUser = loginUser;
        req.userID = loginUser._id;

        next();

    }catch(err){
        res.status(401).send("unautherized: no token found");
        console.error(err);
    }

}

module.exports = authentication;