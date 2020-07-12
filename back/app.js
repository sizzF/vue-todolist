const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');


const db = require('./models');
const prod = process.env.NODE_ENV === 'production';
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const todoListRouter = require('./routes/todoList');


const app = express();

dotenv.config();
db.sequelize.sync({});

if(prod){
    app.use(helmet());
    app.use(hpp());
    app.use(morgan('combined'));
    app.use(cors({
        origin: "*",
        credentials: true
    }));
}else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true
    }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUnitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod && 'http://18.223.50.128:3089/',
    }
}));

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('vue-todolist-backend');
});

app.use('/api/user', userRouter);
app.use('/api/todoList', todoListRouter);


app.listen(prod ? process.env.PORT : 3086, () => {
    console.log(`백엔드 서버 ${prod ? process.env.PORT : 3086}번 포트에서 작동중`);
})
