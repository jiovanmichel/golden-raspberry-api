import sqlite3 from 'sqlite3';

const sqliteDB = new sqlite3.Database(':memory:', (err) => {
    if(err) {
        console.error('Error opening database ' + err.message);
    }
    else {
        console.log('Connection opened SQLite');
    }
});

export default sqliteDB;