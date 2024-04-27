const Car = require('../models/car.model');


const getAllCars = async (req,res)=>{
   
        const cars = await Car.getAll();
        res.status(200).json(cars);

};

const createCar = async(req,res)=>{

         const car = await Car.create(req.body);
         res.status(201).json(car);   
 
};

const deleteCar = async (req,res)=>{
   
        const car = await Car.remove(req.params.id);
        res.status(200).json(car);
  
};


module.exports = {
    getAllCars,
    createCar,
    deleteCar,
    
}