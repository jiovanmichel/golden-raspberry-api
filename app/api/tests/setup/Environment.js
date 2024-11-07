import express from 'express';
import path from 'path';

import initDatabase from '../../setup/database/init.js';
import { readCSVAndInsertToDB } from '../../utils/csvReader.js';

import MovieModel from '../../models/Movie.js';

import MoviesRoutes from '../../routes/Movies.js';
import ProducersRoutes from '../../routes/Producers.js';

export const app = express();
app.use(express.json());

app.use('/api/movies', MoviesRoutes);
app.use('/api/producers', ProducersRoutes);

const startEnvironment = async () => {
    await initDatabase();

    const movies = await readCSVAndInsertToDB(path.join(__dirname, '../../../external-files', 'movielist.csv'));

    if (movies.length) {
        await MovieModel.changeInitialData(movies);
    }
};


export default startEnvironment;