const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send("hola mundo")
})

app.listen(8080, ()=>{
    console.log("servidor iniciado")
})