const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js');
app.use(cors()); // for connectivity wht the frontend end ok
const bodyParser = require('body-parser');
app.use(bodyParser.json()) // store in req body
const port = process.env.PORT;

//fetching the route file

const userRoute = require('./controller/userControler.js')
const loginRoute = require('./controller/loginUserContoller.js')
const chagneP = require('./controller/changepassword.js');
const resetPassword = require('.//controller/sendEmailUser.js')

const updatePassword = require('.//controller/userPasswordReset.js')

//Serving the route file

app.use('/' , userRoute);
app.use('/' , loginRoute);
app.use('/' ,  chagneP);
app.use('/' , resetPassword);
app.use('/' , updatePassword);


app.listen(port , () =>{
  console.log(`server is successfully running on port ${port}`);
})