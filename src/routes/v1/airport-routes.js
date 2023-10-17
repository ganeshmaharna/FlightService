const express = require("express");

const { AirportController} = require("../../controllers");
const {AirportMiddlewares} = require("../../middlewares");
const router = express.Router();
console.log("Inside airplane routes");
//  /api/v1/airports(this is a post request)
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// /api/v1/airports This is a GET request
router.get('/', 
        AirportController.getAirports);

// /api/v1/airports/:id This is a GET request
router.get('/:id', 
    AirportController.getAirport);

// /api/v1/airportss/:id This is a DELETE request for deleting an airplane
router.delete('/:id', 
    AirportController.destroyAirport);


module.exports = router;
