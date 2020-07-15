module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    User.associate = (db) => {
        db.User.hasMany(db.TodoList);
        db.User.hasMany(db.DailyNote);
    }
    return User;
}