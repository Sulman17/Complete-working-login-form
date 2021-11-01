const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://salmanhamza:newpassword@cluster0.dxrrt.mongodb.net/loginform?retryWrites=true&w=majority')

mongoose.connect( process.env.DATABASE ,  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
} , () => console.log('sucess'));


