import MovieModel from '../models/Movie.js';

const MovieService = {
    async findAll() {
        try {
            const movies = await MovieModel.findAll();
            return movies;
        } catch (err) {
            throw new Error('Erro ao buscar filmes: ' + err.message);
        }
    },

    async findById(id) {
        try {
            const movie = await MovieModel.findByPk(id);
            if (!movie) throw new Error('Filme não encontrado');
            return movie;
        } catch (err) {
            throw new Error('Erro ao buscar o filme: ' + err.message);
        }
    },

    async create(data) {
        try {
            const movie = await MovieModel.create(data);
            return movie;
        } catch (err) {
            throw new Error('Erro ao criar o filme: ' + err.message);
        }
    },

    async update(id, data = {}) {
        const { title, year, studios, producers, winner } = data;
        
        if (!title || !year || !studios || !producers || !winner) {
            throw new Error('Todos os campos são obrigatórios!')
        }

        if (!['yes', 'no'].includes(winner)) {
            throw new Error('Informe apenas (yes | no) para winner!')
        }

        try {
            const [affectedCount] = await MovieModel.update(
                { title, year, studios, producers, winner },
                { where: { id } },
            );

            if (affectedCount === 0) throw new Error('Filme não encontrado!');

            return { message: 'Filme atualizado com sucesso!' };
        } catch (err) {
            throw new Error('Erro ao atualizar o filme: ' + err.message);
        }
    },

    async patch(id, data = {}) {
        const { title, year, studios, producers, winner } = data;

        if (data?.winner && !['yes', 'no'].includes(data.winner)) {
            throw new Error('Informe apenas (yes | no) para winner!')
        }

        try {
            const [affectedCount] = await MovieModel.update(
                { title, year, studios, producers, winner },
                { where: { id } },
            );

            if (affectedCount === 0) throw new Error('Filme não encontrado!');

            return MovieService.findById(id);
        } catch (err) {
            throw new Error('Erro ao atualizar o filme: ' + err.message);
        }

    },

    async delete(id) {
        try {
            const affectedCount = await MovieModel.destroy({ where: { id } });

            if (affectedCount === 0) throw new Error('Filme não encontrado para exclusão');
            
            return { message: 'Filme deletado com sucesso!' };
        } catch (err) {
            throw new Error('Erro ao deletar o filme: ' + err.message);
        }
    },

    async insertInitialData(movies = []) {
        const values = movies.map(movie => ({
            title: movie.title,
            year: movie.year,
            studios: movie.studios,
            producers: movie.producers,
            winner: movie.winner === 'yes' ? 'yes' : 'no'
        }));

        return MovieModel.bulkCreate(values)
            .then((results) => {
                console.log(`${results.length} filmes inseridos`);
                return { message: 'Dados inseridos com sucesso', lastID: this.lastID, changes: this.changes };
            })
            .catch((err) => {
                const error = `Erro ao inserir dados: ${err.message}`;
                console.log(error);
                return error;
            })
    }
};

export default MovieService;
