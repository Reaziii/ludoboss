const express = require('express');
const port = 1234;
const app = express();


app.get('/',(req,res)=>res.send('hello world!'));

app.listen(port,()=>{
    console.log('server is running!');
})