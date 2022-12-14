import express from "express";
import config from "./config";
import productsRoutes from './routes/products.routes';
import cors from 'cors';

const app = express();

//settings
app.set('port', config.port);

//middlewares (Esto se hace de que se usen las rutas)
app.use(cors());
//Para poder mandarle al servidor JSON
app.use(express.json());
//Para poder recibir datos desde formularios
app.use(express.urlencoded({ extended: false }));

app.use(productsRoutes);
export default app;