const db = require("../db");
const joi = require("joi");
const Utils = require("../utils/helper");
const Joi = require("joi");
exports.addAddress = async (req, res) => {
  try {
    const validationSchema = joi
      .object()
      .required()
      .keys({
        name: joi.string().required(),
        age: joi.string().required(),
        address: joi
          .array()
          .required()
          .items(
            joi.object().required().keys({
              houseNumber: joi.string().required(),
              city: joi.string().required(),
              state: joi.string().required(),
              countary: joi.string().required(),
            })
          ),
      });
    Utils.reqDataValidatir(validationSchema, req?.body);
    const { name, age, address } = req?.body;
    const newUser = await db.Users.create({ name, age });
    const userAddress = [];
    for (let i = 0; i < address.length; i++) {
      const element = address[i];
      userAddress.push({ ...element, userId: newUser?._id });
    }
    await db.Address.insertMany(userAddress);
    return Utils.Success(res, "User added succesfully");
  } catch (err) {
    return Utils.failed(res, err);
  }
};
exports.getUsers = async (req, res) => {
  try {
    const result = await db.Users.find().sort({ createdAt: -1 });
    return Utils.Success(res, "Get user listing sucesfully", result);
  } catch (err) {
    return Utils.failed(res, err);
  }
};
exports.getAddredd = async (req, res) => {
  try {
    const validation = joi.object().required().keys({
      userId: Joi.string().required(),
    });
    Utils.reqDataValidatir(validation, req?.query);
    const { userId } = req?.query;
    const result = await db.Address.find({ userId, isDeleted: false });
    return Utils.Success(res, "Get user  address listing sucesfully", result);
  } catch (err) {
    return Utils.failed(res, err);
  }
};
exports.deleteAddress = async (req, res) => {
  try {
    const validationSchema = joi
      .object()
      .required()
      .keys({
        type: joi.number().required().valid(1, 2),
        ids: joi.array().required().items(joi.string().required()),
        isValid: joi.number().valid(1, 2),
      });
    Utils.reqDataValidatir(validationSchema, req?.body);
    const { ids, type, isValid } = req?.body;
    const dataForUpdate = {};
    if (type == 1) {
      dataForUpdate.isDeleted = true;
    } else {
      if (!isValid) throw "isValid is required";
      dataForUpdate.isValid = isValid;
    }
    await db.Address.updateMany({ _id: { $in: ids } }, { $set: dataForUpdate });
    let message = "";
    type == 1
      ? (message = "Address deleted successfully")
      : (message = "Address updated successfully");
    return Utils.Success(res, message);
  } catch (err) {
    return Utils.failed(res, err);
  }
};
