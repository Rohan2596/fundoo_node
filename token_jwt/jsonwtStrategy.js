const JwtStrategy=require("passport-jwt").Strategy;
const ExtractJwt=require("passport-jwt").ExtractJwt;
const mongoose=require("mongoose");
const User=mongoose.model("User");
const myKey=require("../mysetup/myurl");


var opts={};
opts.JwtfromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretorKey="rohan";
module.exports=passport=>{
passport.use(
    new JwtStrategy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload.id)
        .then(person=>{
            if(person){
                return done(null,person);
            }
            return done(null,false);
        })
        .catch(err=>console.log(err)
        )
    })
)
}