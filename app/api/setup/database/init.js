import sqliteDB from './sqlite.js';

const initDatabase = () => {
    return new Promise((resolve, reject) => {
        const tables = `
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                year INTEGER NOT NULL,
                studios TEXT,
                producers TEXT,
                winner BOOLEAN DEFAULT FALSE
            );
        `;

        sqliteDB.serialize(() => {
            sqliteDB.run(tables, (err) => {
                if (err) {
                    console.error('Erro ao criar tabelas:', err.message);
                    reject(err);
                } else {
                    console.log('Tabelas criadas com sucesso!');
                    resolve();
                }
            });
        });
    });
}

export default initDatabase;