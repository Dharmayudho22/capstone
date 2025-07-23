import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js'; //import model user

const DiagnosisHistory = sequelize.define('DiagnosisHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // Referensi ke model User
      key: 'id',
    },
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  testDate: {
    type: DataTypes.DATEONLY, // Hanya tanggal, tanpa waktu
    allowNull: false,
  },
  inputSymptoms: {
    type: DataTypes.JSONB, // Menyimpan objek JSON
    allowNull: false,
  },
  diagnosisResult: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urineComposition: {
    type: DataTypes.JSONB, // Menyimpan objek JSON
    allowNull: true,
  },
}, {
  timestamps: true, // createdAt and updatedAt
});

// Definisikan relasi: satu pengguna memiliki banyak riwayat diagnosis
User.hasMany(DiagnosisHistory, { foreignKey: 'userId', as: 'diagnosisHistory' });
DiagnosisHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default DiagnosisHistory;