const passport = require('passport');
const local = require('./local');
const db = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const fullUser = await db.User.findOne({
                where: { id },
                attributes: ['id', 'nickname'],
                include: [{
                    model: db.TodoList,
                    attributes: ['id', 'startDate', 'finish'],
                }],
            });
            return done(null, fullUser);
        }catch(err){
            console.error(err);
            return done(err);
        }
    });

    local();

}