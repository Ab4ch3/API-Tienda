// Importamos el modulo de mongodb para realizar la conexion
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");

const { Config } = require("../config/index");
// Este Archivo se va a encargar de exportar un funcion que nos devuelva la conexion a la base de datos
var connection = null;
module.exports.Database = (collection) =>
  new Promise(async (res, rej) => {
    // Trabajamos asyncrono porq el driver de mongo trabaja de esa manera
    //Esta manera de trabajar se llama singletone que es para no saturar el servidor de base de datos con conexiones
    try {
      // Si no existe una conexion creara una
      if (!connection) {
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug("Nueva conexion realizada con MongoDB Atlas");
      }
      debug("Reutilizando Conexion");
      // Si existe una conexion la guardara en esta variable
      const db = connection.db(Config.mongoDbName);
      // la respuesta sera que nos devuleva la coleccion que le pasamos
      res(db.collection(collection));
    } catch (error) {
      rej(error);
    }
  });
