const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, async(req, res, next) => {
    try{
        const user = req.user;
        res.json(user);
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/', isNotLoggedIn, async(req, res, next) => {
    try{
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.id,
            }
        });
        if(exUser){
            return res.status(403).send('이미 가입된 아이디입니다.');
        }

        const hash = await bcrypt.hash(req.body.password, 12);
        const user = await db.User.create({
            userId: req.body.id,
            password: hash,
            nickname: req.body.nickname,
        });
        const resUser = await db.User.findOne({
            where: {
                id: user.id,
            },
            attributes:['userId', 'nickname']
        })

        return res.json(resUser);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/login', isNotLoggedIn, async(req, res, next) => {
    passport.authenticate('local',(err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info);
        }
        return req.login(user, async (err) => {
            if(err){
                console.error(err);
                return next(err);
            }
            const fullUser = await db.User.findOne({
                where: {id: user.id},
                attributes: ['userId', 'nickname'],
            });
            return res.json(fullUser);
        })
    })(req, res, next);
});

router.post('/logout', isLoggedIn, async(req, res, next) => {
    if(req.isAuthenticated){
        req.logout();
        req.session.destroy();
        return res.status(200).send('로그아웃 되었습니다.');
    }
});


module.exports = router;