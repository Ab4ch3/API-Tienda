const { Database } = require("../database/index");
const { ObjectId } = require("mongodb");
const COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: ObjectId(id) });
};

const create = async (user) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne({ user });
  return result.insertedId;
};

const deleted = async (id) => {
  const collection = await Database(COLLECTION);
  let result = await collection.deleteOne({ _id: ObjectId(id) });
  return result;
};
module.exports.usersService = {
  getAll,
  getById,
  create,
  deleted,
};
