import { DataTypes } from 'sequelize';
import sequelizeConfig from '../setup/database/sequelizeConfig.js';

const MovieModel = sequelizeConfig.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    producers: {
        type: DataTypes.STRING,
    },
    studios: {
        type: DataTypes.STRING,
    },
    winner: {
        type: DataTypes.STRING
    }
});

export default MovieModel;
