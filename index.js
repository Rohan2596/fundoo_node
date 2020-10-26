var express=require('express');
const { request, response } = require('express');
var app =express();
var port =process.env.PORT || 3000

app.get('/',(request,response)=>{
    response.status(200).send('Hi Welcome to Login registration API.');
})
app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
    
})