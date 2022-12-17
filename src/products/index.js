const express = require("express");
//router es una funcionalidad de express , que nos permite manejar las ruta de modulo independientemente de la aplicacion
const router = express.Router();
// Importamos el controlador para este modulo
const { ProductsController } = require("./controller.js");
// Creamos un modulo que recibe la app , y generaremos todo lo que necesita app sobre este modulo
module.exports.ProductsAPI = (app) => {
  // Se configuran las rutas en el router y no estan definidas en nuestra app , independiente de la aplicacion
  // se le pasa coloca el controlador como funciones a ejecutar
  router
    .get("/", ProductsController.getProducts) //http:localhosts:3000/api/products/
    // Esta ruta tiene q estar antes de la ruta q recibe id , porq sino lo toma como si le estuvieramos mandando id "ESTAR PENDIENTE CON ESO , RUTAS CON PARAMETROS DE ULTIMO"
    .get("/report", ProductsController.generateReport)
    .post("/", ProductsController.createProduct) //http:localhosts:3000/api/products/
    .get("/:id", ProductsController.getProduct) //http:localhosts:3000/api/products/23
    .delete("/:id", ProductsController.deleteProduct)
    .put("/:id", ProductsController.updateProduct);

  // Le especificamos que app podra usar en un endPoint especifico, las peticiones especificas en router para este modulo
  app.use("/api/products", router);
};
