import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

//Agregar dominios permistidos por cors para accesar a la api

//const dominiosPermitidos = ["http://localhost:3000"];
//SE CAMBIA EL DOMINIO LOCALHOST:3000 POR LA VARIABLE DE ENTORNO
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions));

//Procesar variable de entorno del archivo env con la conexion a la base de datos
//console.log(process.env.MONGO_URI);

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

