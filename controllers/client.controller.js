const Client = require('../models/client.model');

const getAllClients = async (req,res)=>{
    const clients = await Client.getAll();
    res.status(200).json(clients);

};

const createClient = async (req,res)=>{
    const client = await Client.create(req.body);
    res.status(201).json(client);

};

const deleteClient = async (req,res)=>{
    await Client.remove(req.params.id);
    res.status(200).json({message:'Client deleted successfully'});

};


module.exports = {
    getAllClients,
    createClient,
    deleteClient
};