//Importar librerias
const express = require("express");
const debug = require("debug")("app:main");

// Desestructuramos el modulo de export y nos traemos Config
const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products/index");
const { IndexAPI, NotFoundAPI } = require("./src/index");

//inicializar el servidor de express
const app = express();
//Darle permisos de recibir data al servidor
app.use(express.json());
// IndexAPI debe ir de primera antes que las demas rutas
IndexAPI(app);
//Modulos
ProductsAPI(app);
//NotFound debe estar al final de todos los modulos
NotFoundAPI(app);

//Habilitar la escucha del servidor
app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
