const db = require('./db');

const Rental = function(rental){

    this.CarID = rental.CarID;
    this.ClientID = rental.ClientID;
    this.RentalDate = rental.RentalDate;
    this.ExpectedReturnDate = rental.ExpectedReturnDate;
    this.ActualReturnDate = rental.ActualReturnDate;
    this.Fine = rental.Fine||0;

};

Rental.getAll= async()=>{

    const query = 'SELECT * FROM Rentals';
    const rows = await db.query(query);
    return rows;

};

Rental.create = async (newRental)=>{

    const query = 'INSERT INTO Rentals(CarID, ClientID, RentalDate, ExpectedReturnDate, ActualReturnDate, RentalCost, Fine) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [
        newRental.CarID, newRental.ClientID, newRental.RentalDate, newRental.ExpectedReturnDate, newRental.ActualReturnDate || null, newRental.RentalCost, newRental.Fine || 0
    ];
    const result = await db.query(query, params);
    newRental.RentalID = result.insertId;
    return newRental;

};

Rental.getById = async (id)=>{
    const query = 'SELECT * FROM Rentals WHERE RentalID =?';
    const [rows]= await db.query(query,[id]);
    return rows[0];
};

Rental.remove = async(id)=>{
    const rental = await Rental.getById(id);
    if(!rental){
        throw new Error("Rental not found");
    }
    const query = 'DELETE FROM Rentals WHERE RentalID = ?';
    await db.query(query,[id]);
    return {message: 'Rental deleted successfullly'};
};

module.exports = Rental;