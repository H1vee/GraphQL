const db = require('./db');



const Client = function(client){
    this.FullName = client.FullName;
    this.Address = client.Address;
    this.Phone = client.Phone;
    this.DiscountRate = client.DiscountRate; 
};

Client.getAll = async()=>{
    const query = 'SELECT * FROM Clients';
    const rows = await db.query(query);
    return rows;
};

Client.create = async (newClient)=>{
    const query = 'INSERT INTO Clients(FullName, Address, Phone, DiscountRate) VALUES (?, ?, ?, ?)';
    const result = await db.query(query, [newClient.FullName, newClient.Address, newClient.Phone, newClient.DiscountRate]);
    newClient.ClientID = result.insertId;
    return newClient;
};

Client.getById = async (id)=>{
    console.log(id);
    const query = 'SELECT * FROM Clients WHERE ClientID = ?';
    const [rows] = await db.query(query,[id]);
    console.log(rows);
    return rows;
};

Client.remove = async(id)=>{
    const client = await Client.getById(id);
    if(!client){
        throw new Error ("Client not found");
    }
    const query = 'DELETE FROM Clients WHERE ClientID = ?';
    await db.query(query,[id]);
    return {message:'Client deleted successfully'};
};

module.exports = Client;