/* The code you provided is setting up an Express.js server with various middleware and configurations. */
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import value from './const/conts.js';
import url from 'url';

//archivo de la confiraciaona de bd 
import '../src/database/connection-v2-sequelize.js'
import '../src/database/connection-v3-mongodb.js'

const App = express(); //crear instancia app

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* The `corsOptions` object is a configuration object for the CORS (Cross-Origin Resource Sharing)
middleware. CORS is a mechanism that allows resources (e.g., fonts, JavaScript, etc.) on a web page
to be requested from another domain outside the domain from which the resource originated. */
const corsOptions = {
    credentiasl: true,
    optionSuccessStatus:200,
    methods: "GET, PUT, POST, DELETE",
    origin: '*'
};


/* The code `app.set('env', value.NODE_ENV)` is setting the environment variable for the Express.js
application. The value of `value.NODE_ENV` is being assigned to the `env` setting. This is typically
used to determine the application's behavior based on the environment it is running in, such as
development, production, or testing. */

App.use(morgan('dev'));
App.set('env', value.NODE_ENV);
App.set('port', value.RUN_PORT);

/* The code `app.use(morgan('dev'))` is setting up the Morgan middleware, which is a logging middleware
for Express.js. It logs HTTP requests to the console in a development-friendly format. */
App.use(morgan('dev'));
App.use(cors(corsOptions));
App.use(express.json({limit: '500MB'}));


App.use(express.urlencoded())
App.use(express.json())

// App.use(express.urlencoded({extended:true}));

//static folder
App.use(express.static(path.join(path.resolve(), value.STATIC_PATH)));
App.use('/imagenes/portadas', express.static(path.join(__dirname, 'imagenes', 'portadas')));
App.use('/imagenes/publicaciones', express.static(path.join(__dirname, 'imagenes', 'publicaciones')));
//ENDPOINTs
import routerUser from './routes/user.js';
import routerLibros from './routes/libros.js';
import prueba from './routes/pruebaconsultas.js';
import routerPublicaciones from './routes/publicaciones.js';

/* `app.use('/user', routerUser)` is setting up a middleware for the Express.js application. It
specifies that any requests with a URL starting with '/user' should be handled by the `routerUser`
router. */
App.use('/user', routerUser);
App.use('/libros', routerLibros);
App.use('/consulta',prueba);
App.use('/publicaciones', routerPublicaciones);


export default App