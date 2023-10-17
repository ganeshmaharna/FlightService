const { StatusCodes } = require("http-status-codes");

const { AirportService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

// POST : /api/v1/airplanes
// req-body {modelNumber:'airbus20',capacity:320}

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name:req.body.name,
      code:req.body.code,
      address:req.body.address,
      cityId:req.body.cityId
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse); //This line is imp here service through the status codes to here and here we only configure the statusCodes
  }
}

// GET : /api/v1/airports

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller error for getting all the airports" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// GET : /api/v1/airports/:id

async function getAirport(req, res) {
  try {
    const airports = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller error for getting a single airports" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// GET : /api/v1/airports/:id
// This is for deleting the Airport
async function destroyAirport(req, res) {
  try {
    const airports = await AirplaneService.destroyAirport(req.params.id);
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller error for deleting a airport" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport
};
