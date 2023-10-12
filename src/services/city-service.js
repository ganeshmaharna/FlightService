const {CityRepository} = require("../repositories");
const {StatusCodes}=require('http-status-codes');
const cityRepository = new CityRepository();
const AppError=require("../utils/errors/app-error");


async function createCity(data){
    try{
        // console.log("Inside the service");
        // console.log(data);
       const city = await cityRepository.create(data);
       return city;
    }catch(error){
        console.log(error);
        if(error.name === "SequelizeValidationError" || error.name==="SequelizeUniqueConstraintError"){
            let explanation=[];
            error.errors.forEach(element => {
                explanation.push(element.value +" "+ element.message);
            });
            console.log("This is explanation"+explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new city object",StatusCodes.INTERNAL_SERVER_ERROR);
        // console.log(error);
    //    throw error;
    }
}

module.exports = {
   createCity
}