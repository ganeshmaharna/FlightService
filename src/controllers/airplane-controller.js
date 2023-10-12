const { StatusCodes } = require("http-status-codes");

const { AirplaneService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

// POST : /api/v1/airplanes
// req-body {modelNumber:'airbus20',capacity:320}

async function createAirplane(req, res) {
  try {
    console.log("Inside the controller");
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse); //This line is imp here service through the status codes to here and here we only configure the statusCodes
  }
}

// GET : /api/v1/airplanes

async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller error for getting all the airplane" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// GET : /api/v1/airplanes/:id

async function getAirplane(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller error for getting a single airplane" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// GET : /api/v1/airplanes/:id
// This is for deleting the Airplane
async function destroyAirplane(req, res) {
  try {
    const airplanes = await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log("This is controller error for deleting a airplane" + error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane
};
