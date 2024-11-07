import fs from 'fs';
import csv from 'csv-parser';

export const readCSVAndInsertToDB = async (filePath) => {
    return new Promise((resolve, reject) => {
        const data = [];
        
        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                // data.push({year, title, studios, producers, winner } = row);
                data.push(row);
            })
            .on('end', async () => {
                resolve(data);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};
