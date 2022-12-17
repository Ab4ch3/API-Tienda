const debug = require("debug")("app:module-users-controller");
const createError = require("http-errors");

const { usersService } = require("./services.js");
const { Response } = require("../common/response.js");

module.exports.UserController = {
  getUsers: async (req, res) => {
    try {
      let users = await usersService.getAll();
      Response.success(res, 200, "List of Users", users);
    } catch (error) {
      debug(error);
      Response.error(res, new createError.NotFound());
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await (res, usersService.getById(id));
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `User ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await usersService.create(body);
        Response.success(res, 201, "User Created", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let userUpdate = await usersService.update(id, body);
      if (!userUpdate) return Response.error(res, new createError.NotFound());

      Response.success(res, 200, `User ${id} modificado`, Object(body));
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const userDeleted = await usersService.deleted(id);
      userDeleted.deletedCount === 1
        ? Response.success(res, 200, "User Deleted", userDeleted)
        : Response.error(res, new createError.NotFound());
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
