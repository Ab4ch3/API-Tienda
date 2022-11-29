const express = require("express");
const createError = require("http-errors");
const { Response } = require("../common/response");

// Este modulo se encargada de que cuando busquemos algo en la ruta base no de un menu sobre los endpoints disponibles
module.exports.IndexAPI = (app) => {
  const router = express.Router();
  router.get("/", (req, res) => {
    const menu = {
      Products: `https://${req.headers.host}/api/products`,
    };

    Response.success(res, 200, "API Inventario", menu);
  });
  app.use("/", router);
};

// Este modulo se encargara de resolver todas las rutas que se intenten acceder pero que no esten configuradas darle un error
module.exports.NotFoundAPI = (app) => {
  //Si solicitamos una ruta que no existe en nuestra API
  const router = express.Router();
  // all genera toda las rutas que no se usan en la aplicacion
  router.all("*", (req, res) => {
    Response.error(res, new createError.NotFound());
  });
  app.use("/", router);
};
