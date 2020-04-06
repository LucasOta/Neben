import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

import cors from 'cors';

const server = new Server();


// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());


// FileUpload
server.app.use(fileUpload({ useTempFiles: true }));

// CORS
server.app.use(cors({ origin: true, credentials: true }));


// Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);


// Conectar DB
mongoose.connect('mongodb://localhost/emprendere',
    // mongoose.connect('mongodb+srv://admin:admin@comments-y6qqv.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true }, (err) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');
    })

// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});