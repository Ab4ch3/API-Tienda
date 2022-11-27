// la libreria dotenv no ayuda a traer las varibles que tenemos disponibles en el .env
require("dotenv").config();

// el Archivo de configuracion es para centralizar las variables de entornos y no estar requiriendo todo con dotenv
//Con esto exportaremos las variables a donde necesitemos
module.exports.Config = {
  // Le estamos indicando que varible de entorno le dara el valor al key
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DBNAME,
};
