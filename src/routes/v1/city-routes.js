const express = require("express");

const { CityController } = require("../../controllers");
const {CityMiddlewares}= require("../../middlewares");
const router = express.Router();
//  /api/v1/cities(this is a post request)
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity,
);




module.exports = router;
