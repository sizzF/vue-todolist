const express = require('express');
const passport = require('passport');
const db = require('../models');

const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, async(req, res, next) => {
    try{
        const yyyy = req.query.findDate.substr(0, 4);
        const mm = req.query.findDate.substr(5, 2);
        const dd = req.query.findDate.substr(8, 2);
        const findDate = new Date(parseInt(yyyy), parseInt(mm)-1, parseInt(dd)+1);
        const todoLists = await db.TodoList.findAll({
            where: {
                UserId: req.user.id,
                startDate: req.query.findDate,
            },
            order: [['createdAt', 'DESC']],
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
            finish: req.body.finish ? 1 : 0,
        });
        return res.json(todo);
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.delete('/:id', isLoggedIn, async(req, res, next) => {
    try{
        const todo = await db.TodoList.destroy({
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
router.patch('/finish', isLoggedIn, async(req, res, next) => {
    try{
        console.log(req.body.id);
        const updateTodo = await db.TodoList.findOne({ where: { id: req.body.id } });
        if(!updateTodo){
            return res.status(404).send('해당 할일이 존재하지 않습니다.')
        }
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
        if(!updateTodo){
            return res.status(404).send('해당 할일이 존재하지 않습니다.')
        }
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