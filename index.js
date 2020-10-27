var express=require('express');
const { request, response } = require('express');
var app =express();
var port =process.env.PORT || 3002
var User=require('./models/User');

//importing body parser
var bodyparser=require('body-parser')

//importing mongoose
var mongoose=require('mongoose');
const { profile } = require('console');
var secret=require('./mysetup/myurl').secret;
//importing database
var db=require('./mysetup/myurl').myurl

//Encrypting  and becrypting password
var bcryt=require('bcrypt');
const passport = require('passport');
const { sign } = require('crypto');
var saltrouds=10
//Jwt
app.use(passport.initialize())
var jsonwt=require("./token_jwt/jsonwtStrategy")(passport);
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
    
    await User.findOne({name:newUser.name})
        .then(async profile=>{
            if(!profile){
                bcryt.hash(newUser.password,saltrouds,async(err,hash)=>{
              if(err){

              }else{
                newUser.password=hash;
                await newUser
                .save()
                .then(()=>{
                    response.status(200).send(newUser);
                })
                .catch(err=>{
                    console.log("Error is:-  ",err.message);
                    
                });
            }
            })
            }else{
            
                response.send("User Already exists....");
            }
        }).catch(err=>{
            console.log("Error is:-  "+err.message);
            
        });
    });

app.post("/login",async(request,response)=>{
    var loginUser={}
    loginUser.name=request.body.name;
    loginUser.password=request.body.password;
    await User.findOne({name:loginUser.name})
    .then(profile=>{
        if (!profile) {
            response.send("User not exist");
          } else {
            bcryt.compare(
              loginUser.password,
              profile.password,
              async (err, result) => {
                if (err) {
                  console.log("Error is", err.message);
                } else if (result == true) {
                    response.send("User authenticated");
                    const payload={
                        id:profile.id,
                        name:profile.name
                    };
                    jsonwt,sign(
                        payload,
                        secret,
                        {expiresIn:3600},
                        (err,token)=>{
                            response.json({
                                success:true,
                                token:"Bearer " +token
                            })
                        }
                    )
                } else {
                    response.send("User Unauthorized Access");
                }
              }
            );
          }
        })
        .catch(err => {
          console.log("Error is ", err.message);
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