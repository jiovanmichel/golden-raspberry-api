import MovieModel from '../models/Movie.js';
import { getMinMaxDetailsIntervalInYears } from './helpers/Producer.js';

const MovieService = {
    async getAll() {
        try {
            const movies = await MovieModel.getAll();
            return movies;
        } catch (err) {
            throw new Error('Erro ao buscar filmes: ' + err.message);
        }
    },

    async getById(id) {
        try {
            const movie = await MovieModel.getById(id);
            if (!movie) throw new Error('Filme não encontrado');
            return movie;
        } catch (err) {
            throw new Error('Erro ao buscar o filme: ' + err.message);
        }
    },

    async create(title, year, studios, producers, winner) {
        try {
            const movieId = await MovieModel.create(title, year, studios, producers, winner);
            return movieId;  // Retorna o ID do filme criado
        } catch (err) {
            throw new Error('Erro ao criar o filme: ' + err.message);
        }
    },

    async update(id, title, year, studios, producers, winner) {
        
        if(!title || !year || !studios || !producers || !winner) {
            throw new Error('Todos os campos são obrigatórios!')
        }

        try {
            const result = await MovieModel.update(id, title, year, studios, producers, winner);
            if (result.changes === 0) throw new Error('Filme não encontrado para atualização');
            return { message: 'Filme atualizado com sucesso!' };
        } catch (err) {
            throw new Error('Erro ao atualizar o filme: ' + err.message);
        }
    },

    async patch(id, data) {
        try {
            const movie = await MovieModel.getById(id);
            if (!movie) throw new Error('Filme não encontrado para atualização');


            Object.keys(data).forEach((key) => {
                if (movie[key] !== undefined) {
                    movie[key] = data[key];
                }
            });

            const { title, year, studios, producers, winner } = movie;

            const result = await MovieModel.update(id, title, year, studios, producers, winner);

            if (result.changes === 0) throw new Error('Filme não encontrado para atualização');

            return movie;
        } catch (err) {
            throw new Error('Erro ao atualizar o filme: ' + err.message);
        }
    },

    async delete(id) {
        try {
            const result = await MovieModel.delete(id);
            if (result.changes === 0) throw new Error('Filme não encontrado para exclusão');
            return { message: 'Filme deletado com sucesso!' };
        } catch (err) {
            throw new Error('Erro ao deletar o filme: ' + err.message);
        }
    },
};

export default MovieService;
