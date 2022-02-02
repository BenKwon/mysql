const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

const userRouter = require('./routes/user');
app.use('/api/user/',userRouter);
app.get('/',(req,res)=>{
    res.send("hello")
});
app.listen(5000, ()=>{
    console.log("listening on port 5000");
});