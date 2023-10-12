const {AirplaneRepository} = require("../repositories");
const {StatusCodes}=require('http-status-codes');
const airplaneRepository = new AirplaneRepository();
const AppError=require("../utils/errors/app-error");

async function createAirplane(data){
    try{
        console.log("Inside the service");
        console.log(data);
       const airplane = await airplaneRepository.create(data);
       return airplane;
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
        throw new AppError("Cannot create a new airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
        // console.log(error);
    //    throw error;
    }
}

async function getAirplanes(){
    try {
        // console.log("This is inside the getairplane data");
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError("Cannot get data of all airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        // console.log("This is inside the getairplane data");
        const airplanes = await airplaneRepository.get(id);
        return airplanes;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested is not present",error.statusCode);
        }
        throw new AppError("Cannot get data of all airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const airplanes = await airplaneRepository.destroy(id);
        return airplanes;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested to delete is not present",error.statusCode);
        }
        throw new AppError("Cannot delete the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}