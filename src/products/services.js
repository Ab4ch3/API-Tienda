// se encargara de trabajar directamente lógica de negocio y se comunicará directamente con la base de datos para manipular data
// Nos traemos Object id para poder parsear el id que nos entregan
const { ObjectId } = require("mongodb");
// importamos el archivo de la base de datos
const { Database } = require("../database/index");

// Especificamo la coleccion que la cual llamaremos en la base de datos
const COLLECTION = "products";

// Funciones que realizara el servicio o operaciones
const getAll = async () => {
  // Le pasamos la coleccion con el cual realizara la conexion
  const collection = await Database(COLLECTION);
  // disparamos una accion de mongodb y el resultado lo volvermos array
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  // Le pasamos la coleccion con el cual realizara la conexion
  const collection = await Database(COLLECTION);
  // disparamos una accion de mongodb y guardamos el resultado en result
  let result = await collection.insertOne({ product });
  // le pedimos que nos devuelva en caso de crear el podructo el objectID
  return result.insertedId;
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
};
