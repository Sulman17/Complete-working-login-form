const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({ 
    name : {
        type : 'string',
        required : true,
    },
    email : { 
        type : 'string',
        required : true,
    },
    phone : { 
        type : Number,
        required : true,
    },
    password : { 
        type : 'string',
        required : true,
    },
    confirmPassword : { 
        type : 'string',
        required : true,
    },
    date: { 
        type : Date,
        default: Date.now
    },
    messages: [{
        name : {
            type : 'string',
            required : true,
        },
        email : { 
            type : 'string',
            required : true,
        },
        phone : { 
            type : Number,
            required : true,
        },
        message : { 
            type : 'string',
            required : true,
        },
    }],
    tokens: [
        {
          token:  {
            type : 'string',
            required : true,
            }
        }
        ]

});

// ! hashing password

userSchema.pre('save', async function (next) {
      console.log('Saving')
      if(this.isModified('password')){
          this.password = await bcrypt.hash(this.password, 12);
          this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
      }
      next();

});

// ! creating for user after login to see hiddden pages
userSchema.methods.generateAuthToken = async function (){

    try{
        let token = await jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){console.log(err);}
};
// !store messages in database
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
      this.messages = this.messages.concat({ name, email, phone, message });
      await this.save();
      console.log("message saved");
      return this.messages;
    } catch (error) {
      console.log(error);
    }
  };


// !collection creation
const User = mongoose.model('USER', userSchema);

module.exports = User;
