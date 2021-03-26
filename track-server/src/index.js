require('./models/User');
require('./models/Tracks')
const trackRoutes = require('./routes/trackRoutes')
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);


const mongoUri='mongodb+srv://abdul:Abdul@7544@cluster0.oug78.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.error('Error Connecting to mongo instance',err); 
});

app.get('/',requireAuth,(req,res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000,() => {
    console.log('Listening on port 3000')
})