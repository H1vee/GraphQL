const Car = require('../models/car.model');


const getAllCars = async (req,res)=>{
   
        const cars = await Car.getAll();
        res.status(200).json(cars);

};

const createCar = async(req,res)=>{

         const car = await Car.create(req.body);
         res.status(201).json(car);   
 
};

const deleteCar = async (req, res) => {
        try {
            const car = await Car.remove(req.params.id);
            res.status(200).json(car);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


module.exports = {
    getAllCars,
    createCar,
    deleteCar,
    
}