const express = require('express');
const connectDB = require('./confiq/db');
const eventRouter = require('./routes/event');
const userRouter = require('./routes/user')
const app = express();
connectDB();
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API Running'));
app.use('/', userRouter)
app.use('/', eventRouter)
app.get('/',(req,res)=>{
    res.send(" You Can Call Now")
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
