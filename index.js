var express=require('express');
const { request, response } = require('express');
var app =express();
var port =process.env.PORT || 3001
var User=require('./models/User');
//importing mongoose
var mongoose=require('mongoose')
//importing database
var db=require('./mysetup/myurl').myurl

//Connection to Database
mongoose
.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Data Base Connection Established.");
    
}).catch(
    err=>{
        console.log("Error is:- ",err.message);
        
    }
);


//Making Get Request 
app.get('/',(request,response)=>{
    response.status(200).send('Hi Welcome to Login registration API.');
})
//And finally listening to that particular server.
app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
    
})