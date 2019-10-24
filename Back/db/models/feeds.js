module.exports = (sequelize, DataTypes) => {
    const Feeds = sequelize.define('Feeds', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        definition: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'feeds',
        timestamps: false
    });
    return Feeds
};
