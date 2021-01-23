const express = require("express");
const app = express();
const db = require('./config/db.js');
const session = require("express-session");
const cors = require('cors');
const User = require("./models/User.js");

const register = require('./routes/register');
const login = require('./routes/login');
const {
    PORT = 3001, //process.env.PORT || 4500,
    NODE_ENV = 'development',
    SESS_SECRET = 'this is srawungapp secret key',
    SESS_NAME = 'sid',
    SESS_LIFETIME = 1000*60*60*24
} = process.env;

db.authenticate().then(() => console.log("successfully connected to database"));

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));
app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: true
    }
}));
app.use(register);
app.use(login);
app.use(async (req, res, next)=>{
    const {userId} = req.session;
    if(userId){
        res.locals.user = await User.findOne({
            where: {id:userId}
        })
    }
    next();
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
