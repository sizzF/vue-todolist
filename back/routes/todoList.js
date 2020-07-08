const express = require('express');
const passport = require('passport');
const db = require('../models');

const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, async(req, res, next) => {
    try{
        const todoLists = await db.TodoList.findAll({
            where: {
                UserId: req.user.id,
                startDate: {
                    [db.Sequelize.Op.lt]: req.query.date,
                },
                endDate: {
                    [db.Sequelize.Op.gt]: req.query.date,
                }
            }
        });
        return res.json(todoLists);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/', isLoggedIn, async(req, res, next) => {
    try{
        const todo = await db.TodoList.create({
            UserId: req.user.id,
            content: req.body.content,
            type: req.body.type,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            finish: req.body.finish ? 1 : 0,
        });
        return res.json(todo);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.patch('/finish', isLoggedIn, async(req, res, next) => {
    try{
        console.log(req.body.id);
        const updateTodo = await db.TodoList.findOne({ where: { id: req.body.id } });
        await updateTodo.update({
            finish: 1,
        });
        return res.json(updateTodo);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.patch('/unfinish', isLoggedIn, async(req, res, next) => {
    try{
        const updateTodo = await db.TodoList.findOne({ where: { id: req.body.id } });
        await updateTodo.update({
            finish: 0,
        });
        return res.json(updateTodo);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;