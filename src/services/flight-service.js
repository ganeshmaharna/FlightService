const {FlightRepository} = require("../repositories");
const {StatusCodes}=require('http-status-codes');
const flightRepository = new FlightRepository();
const AppError=require("../utils/errors/app-error");

async function createFlight(data){
    try{
        console.log("Inside the service");
        console.log(data);
       const flight = await flightRepository.create(data);
       return flight;
    }catch(error){
        console.log(error);
        if(error.name === "SequelizeValidationError"){
            let explanation=[];
            error.errors.forEach(element => {
                explanation.push(element.message);
            });
            console.log("This is explanation"+explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new flight object",error.name,StatusCodes.INTERNAL_SERVER_ERROR);
        // console.log(error);
    //    throw error;
    }
}
module.exports={
    createFlight
}