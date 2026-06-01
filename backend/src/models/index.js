const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: false
});

const User = require('./User')(sequelize);
const Ride = require('./Ride')(sequelize);

// Associations
User.hasMany(Ride, { foreignKey: 'userId' });
Ride.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Ride };
