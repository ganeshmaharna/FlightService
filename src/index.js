const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // Associate the airport with the city
    // const {City}=require("./models");
    // const city=await City.findByPk(3);
    // await city.createAirport({name:"Campegauda",code:"CMG"})
    // console.log(city);
    // console.log(await City.findByPk(2));
    // await City.destroy({
    //     where:{
    //         id:2
    //     }
    // })


});

