const Rental = require('../models/rental.model');

const getAllRentals = async(req,res)=>{

    const rentals = await Rental.getAll();
    res.status(200).json(rentals);

};

const createRental = async (req,res)=>{

    const rental = await Rental.create(req.body);
    res.status(201).json(rental);

};

const deleteRental = async (req,res)=>{

    const rental = await Rental.remove(req.params.id);
    res.status(200).json(rental);

};

module.exports = {

    getAllRentals,
    createRental,
    deleteRental,
    
};