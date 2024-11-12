import express from 'express';
import path from 'path';

import sequelizeConfig from '../../setup/database/sequelizeConfig.js';

import { readCSVAndInsertToDB } from '../../utils/csvReader.js';
import MovieService from '../../services/Movie.js';

import MoviesRoutes from '../../routes/Movies.js';
import ProducersRoutes from '../../routes/Producers.js';

export const app = express();
app.use(express.json());

app.use('/api/movies', MoviesRoutes);
app.use('/api/producers', ProducersRoutes);

const startEnvironment = async () => {
    await sequelizeConfig.sync({ force: true });

    const movies = await readCSVAndInsertToDB(path.join(__dirname, '../../../external-files', 'movielist.csv'));

    if (movies.length) {
        await MovieService.insertInitialData(movies);
    }
};


export default startEnvironment;