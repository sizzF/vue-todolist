const express = require('express');
const passport = require('passport');
const db = require('../models');

const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, async(req, res, next) => {
    try{
        const yyyy = parseInt(req.query.findDate.substr(0, 4));
        const mm = parseInt(req.query.findDate.substr(5, 2));
        const dd = parseInt(req.query.findDate.substr(8, 2));
        const month = new Date(yyyy,mm-1);
        const nextMonth = new Date(yyyy, mm, 0);
        const dailyNotes = await db.DailyNote.findAll({
            where: {
                UserId: req.user.id,
                date: {
                    [db.Sequelize.Op.gte]: month,
                    [db.Sequelize.Op.lte]: nextMonth
                },
            },
            order: [['date', 'DESC']],
        });
        return res.json(dailyNotes);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/', isLoggedIn, async(req, res, next) => {
    try{
        const note = await db.DailyNote.create({
            UserId: req.user.id,
            content: req.body.content,
            weather: req.body.weather,
            date: req.body.date,
        });
        return res.json(note);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.patch('/', isLoggedIn, async(req, res, next) => {
    try{
        const note = await db.DailyNote.update({
            content: req.body.content,
            weather: req.body.weather,
        },{
            where: { id: req.body.id },
        });
        const sendNote = await db.DailyNote.findOne({
            where: { id: req.body.id }
        });
        return res.json(sendNote);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.delete('/:id', isLoggedIn, async(req, res, next) => {
    try{
        const todo = await db.DailyNote.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.json(todo);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;