module.exports = (sequelize, DataTypes) => {
    const TodoList = sequelize.define('TodoList', {
        type: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: false,
        },
        endDate: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        finish: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }

    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    TodoList.associate = (db) => {
        db.TodoList.belongsTo(db.User);
    }

    return TodoList;
}