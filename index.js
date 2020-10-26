var express=require('express');
const { request, response } = require('express');
var app =express();
var port =process.env.PORT || 3001
var User=require('./models/User');

//importing body parser
var bodyparser=require('body-parser')

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


//body parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//making post request to add user to database.
app.post("/signup",async(request,response)=>{
    var newUser=new User({
        name:request.body.name,
        password:request.body.password
    });
    await newUser
    .save()
    .then(()=>{
        response.status(200).send(newUser);
    })
    .catch(err=>{
        console.log("Error is:-  ",err.message);
        
    });
})

//Making Get Request 
app.get('/',(request,response)=>{
    response.status(200).send('Hi Welcome to Login registration API.');
})
//And finally listening to that particular server.
app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
    
})