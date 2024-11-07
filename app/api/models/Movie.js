import sqliteDB from '../setup/database/sqlite.js';

const MovieModel = {
    async changeInitialData(movies = []) {
        const insertSQL = `
            INSERT INTO movies (title, year, studios, producers, winner)
            VALUES ${movies.map(() => '(?, ?, ?, ?, ?)').join(', ')}
        `;
    
        const values = movies.flatMap(movie => [movie.title, movie.year, movie.studios, movie.producers, movie.winner === 'yes']);
    
        return new Promise((resolve, reject) => {
            sqliteDB.run(insertSQL, values, function (err) {
                if (err) {
                    reject(`Erro ao inserir dados: ${err.message}`);
                } else {
                    console.log(`${this.changes} filmes inseridos`);
                    resolve({ message: 'Dados inseridos com sucesso', lastID: this.lastID, changes: this.changes });
                }
            });
        });
    },

    async getAll() {
        return new Promise((resolve, reject) => {
            sqliteDB.all('SELECT * FROM movies', (err, rows) => {
                if (err) {
                    reject(`Erro ao buscar dados: ${err.message}`);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    async getById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM movies WHERE id = ?';
            sqliteDB.get(query, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    },

    async create(title, year, studios, producers, winner) {
        const query = 'INSERT INTO movies (title, year, studios, producers, winner) VALUES (?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            sqliteDB.run(query, [title, year, studios, producers, winner === 'yes'], function (err) {
                if (err) {
                    reject(`Erro ao adicionar filme: ${err.message}`);
                } else {
                    resolve({ message: 'Filme inserido com sucesso', lastID: this.lastID });
                }
            });
        });
    },

    async update(id, title, year, studios, producers, winner) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE movies SET title = ?, year = ?, studios = ?, producers = ?, winner = ? WHERE id = ?';
            sqliteDB.run(query, [title, year, studios, producers, winner, id], function (err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM movies WHERE id = ?';
            sqliteDB.run(query, [id], function (err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            });
        });
    },

    async getCustomQuery(customQuery) {
        return new Promise((resolve, reject) => {
            sqliteDB.all(customQuery, (err, rows) => {
                if (err) {
                    reject(`Erro ao buscar dados: ${err.message}`);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};


export default MovieModel;