import MovieModel from '../models/Movie.js';
import { getMinMaxDetailsIntervalInYears } from './helpers/Producer.js';

const ProducerService = {
    async getMinMaxAwardsInterval() {
        try {
            const query = 'SELECT producers, year FROM movies WHERE winner = 1 ORDER BY producers, year;';

            const movies = await MovieModel.getCustomQuery(query);

            const producerIntervals = {};

            for (const movie of movies) {
                if (!producerIntervals[movie.producers]) {
                    producerIntervals[movie.producers] = [];
                }
                producerIntervals[movie.producers].push(movie.year);
            }

            const results = {
                min: [],
                max: []
            }

            let minInterval = Infinity;
            let maxInterval = -Infinity;

            for (const producer in producerIntervals) {
                const details = getMinMaxDetailsIntervalInYears(producerIntervals[producer]);

                const minIntervalProducer = details.min?.interval;
                const maxIntervalProducer = details.max?.interval;

                if (minIntervalProducer < minInterval) {
                    minInterval = minIntervalProducer;
                    results.min = [{ producer, ...details.min }];
                } else if (minIntervalProducer === minInterval) {
                    results.min.push({ producer, ...details.min });
                }

                if (maxIntervalProducer > maxInterval) {
                    maxInterval = maxIntervalProducer;
                    results.max = [{ producer, ...details.max }]; 
                } else if (maxIntervalProducer === maxInterval) {
                    results.max.push({ producer, ...details.max });
                }
            }

            return results;
        } catch (err) {
            throw new Error('Erro ao buscar filmes: ' + err.message);
        }
    }
};

export default ProducerService;
