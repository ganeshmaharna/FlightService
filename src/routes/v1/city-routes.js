const express = require("express");

const { CityController } = require("../../controllers");
const {CityMiddlewares}= require("../../middlewares");
const router = express.Router();
console.log("Inside city routes");
//  /api/v1/cities(this is a post request)
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity,
);




module.exports = router;
