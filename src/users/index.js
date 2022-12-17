const express = require("express");

const router = express.Router();

const { UserController } = require("./controller.js");

module.exports.UserAPI = (app) => {
  router
    .get("/", UserController.getUsers)
    .get("/:id", UserController.getUser)
    .post("/", UserController.createUser)
    .delete("/:id", UserController.deleteUser)
    .put("/:id", UserController.updateUser);

  app.use("/api/users", router);
};
