module.exports = (sequelize, DataTypes) => {
    const DailyNote = sequelize.define('DailyNote', {
        weather: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: false,
        },

    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    DailyNote.associate = (db) => {
        db.TodoList.belongsTo(db.User);
    }

    return DailyNote;
}