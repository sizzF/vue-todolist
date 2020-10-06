const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async(id, password, done) => {
        try {
            const exUser = await db.User.findOne({ where: { userId: id } });
            if (!exUser) {
                return done(null, false, '존재하지 않는 사용자 입니다.');
            }
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
                return done(null, exUser);
            } else {
                return done(null, false, '비밀번호가 다릅니다.');
            }
        } catch (err) {
            console.error(err);
            return done(err);
        }
    }))
}