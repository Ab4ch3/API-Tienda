//Importar librerias
const express = require("express");
const debug = require("debug")("app:main");

// Desestructuramos el modulo de export y nos traemos Config
const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products/index");

//inicializar el servidor de express
const app = express();
//Darle permisos de recibir data al servidor
app.use(express.json());

//Modulos
ProductsAPI(app);

//Habilitar la escucha del servidor
app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
