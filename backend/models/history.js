const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user'); // Import model User untuk relasi

const History = sequelize.define('History', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  warna_urine: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bau_urine: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nyeri_saat_buang_air_kecil: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  frekuensi_buang_air: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  demam: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  prediction_result: {
    type: DataTypes.STRING,
    allowNull: false
  },
  predictedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'histories',
  timestamps: true
});

// Mendefinisikan asosiasi
User.hasMany(History, { foreignKey: 'userId', as: 'predictions' });
History.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = History;