const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { compareTime } = require("../utils/helpers/datetime-helpers");
const flightRepository = new FlightRepository();
const AppError = require("../utils/errors/app-error");

async function createFlight(data) {
  try {
    console.log("Inside the service");
    if (!compareTime(data.arrivalTime, data.departureTime)) {
      throw new AppError(
        "The arrival time is less than departure",
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((element) => {
        explanation.push(element.message);
      });
      console.log("This is explanation" + explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new flight object",
      error.name,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    // console.log(error);
    //    throw error;
  }
}
async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter=[];
  const endingTripTime = " 23:59:00";
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.gte]: new Date(query.tripDate), // Greater than or equal to '2022-01-17 00:00:00'
      [Op.lt]: new Date(query.tripDate + endingTripTime),
    };
  }
  if (query.sort) {
    const params = query.sort.split(",");
    console.log("This is params",params);
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }
  console.log("This is sort filter",sortFilter);
  console.log("This is customFilter", customFilter.departureTime);
  try {
    const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The flight you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createFlight,
  getAllFlights,
  getFlight
};
