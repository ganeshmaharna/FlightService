const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    console.log("Inside the repository");
    console.log(data);
    const response = await this.model.create(data);
    console.log("This is the response "+response);
    return response;
  }
  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if(!response){
      throw new AppError("The required data to delete is not found",StatusCodes.NOT_FOUND);
    }
    return response;
  }
  async get(data) {
    const response = await this.model.findByPk(data);
    if(!response){
      throw new AppError("The required data is not found",StatusCodes.NOT_FOUND);
    }
    return response;
  }
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }
  async update(id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
}

module.exports = crudRepository;
