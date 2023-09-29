import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import { NODE_ENV, RUN_PORT, STATIC_PATH } from './const/conts.js';

const App = express();

const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE",
    origin: '*'
}

// Archivo de configuración bd
import './database/connection.js'

App.set('env', NODE_ENV)
App.set('port', RUN_PORT)

App.use(morgan('dev'));
App.use(cors(corsOptions));
App.use(express.json({ limit: '500MB' }));
App.use(express.urlencoded({ extended: true }));

// Static folder
App.use(express.static(path.join(path.resolve(), STATIC_PATH)));

// ENDPOINTS
import routerUser from './routes/user.js';

App.use("/user", routerUser);

export default App;