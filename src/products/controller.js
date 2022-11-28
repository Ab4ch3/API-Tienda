// se va a encargar de controlar peticiones y respuestas de cada servicio que recibimos
// importamos el servicio que vamos a usar
const debug = require("debug")("app:module-products-controller");
const createError = require("http-errors");

const { ProductsService } = require("./services.js");
const { Response } = require("../common/response.js");

module.exports.ProductsController = {
  // como los servicios que estamos trabajando son asyncronos los tenemos q trabajar como tal
  // Traer todos los productos
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      // res.json(products);
      Response.success(res, 200, "List of products", products);
    } catch (error) {
      debug(error);
      Response.error(res);
      // res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // traer un producto por id
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        // res.json(product);
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
      // res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // crear un producto
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        // res.json(insertedId);
        Response.success(res, 201, "Producto Agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
      // res.status(500).json({ message: "Internal Server Error" });
    }
  },
  //Eliminar producto
  deleteProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const productDeleted = await ProductsService.deleted(id);
      productDeleted.deletedCount === 1
        ? Response.success(res, 200, `Producto eliminado`, productDeleted)
        : Response.error(res, new createError.NotFound());
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
