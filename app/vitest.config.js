import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 51204
    },
    test: {
        globals: true,
        reporters: [
            'verbose',
        ],
        include: [
            path.resolve(__dirname, 'api/tests', `${process.env.MATCH || '**/*.test.js'}`)
        ],
        testTimeout: 60_000,
        poolOptions: {
            threads: {
                singleThread: true
            }
        },
        chaiConfig: {
            truncateThreshold: 999
        }
    }
});
