const express = require("express");

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");
console.log("This is airplane controller");
console.log(AirplaneController);
console.log("This is airplane middleware");
console.log(AirplaneMiddlewares);
const router = express.Router();
console.log("Inside airplane routes");
//  /api/v1/airplanes(this is a post request)
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

// /api/v1/airplanes This is a GET request
router.get('/', 
        AirplaneController.getAirplanes);

// /api/v1/airplanes/:id This is a GET request
router.get('/:id', 
AirplaneController.getAirplane);

// /api/v1/airplanes/:id This is a DELETE request for deleting an airplane
router.delete('/:id', 
AirplaneController.destroyAirplane);


module.exports = router;
