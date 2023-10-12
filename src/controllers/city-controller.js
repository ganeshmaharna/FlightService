const { StatusCodes } = require("http-status-codes");

const { CityService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

// POST : /api/v1/cities
// req-body {name:"New Delhi"}

async function createCity(req, res) {
    try {
      console.log("Inside the controller");
      const city = await CityService.createCity({
        name: req.body.name
      });
      SuccessResponse.data = city;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
      console.log("This is controller" + error);
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse); //This line is imp here service through the status codes to here and here we only configure the statusCodes
    }
  }

  module.exports={
    createCity
  }