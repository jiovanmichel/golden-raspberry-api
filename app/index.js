import startServer from './api/setup/server.js';
import path from 'path';

import { fileURLToPath } from 'url';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename); 

// const app = express();
// app.use(express.json());

// app.use('/api/movies', MoviesRoutes)

// startServer(app);

startServer();