import express from 'express';
import path from 'path';

import sequelizeConfig from './database/sequelizeConfig.js';
import MovieService from '../services/Movie.js';
import { readCSVAndInsertToDB } from '../utils/csvReader.js';

import MoviesRoutes from '../routes/Movies.js';
import ProducersRoutes from '../routes/Producers.js';

const app = express();
app.use(express.json());

app.use('/api/movies', MoviesRoutes);
app.use('/api/producers', ProducersRoutes);

const startServer = async () => {
    await sequelizeConfig.sync({ force: true });

    const movies = await readCSVAndInsertToDB(path.join(__dirname, 'external-files', 'movielist.csv'));

    if (movies.length) {
        await MovieService.insertInitialData(movies);
    }

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}`);
    });
};


export default startServer;