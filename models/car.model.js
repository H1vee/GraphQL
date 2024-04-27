const db = require('./db');



const Car = function(car){
    this.CarID = car.CarID;
    this.Brand = car.Brand;
    this.Type = car.Type;
    this.Year = car.Year;
    this.Cost = car.Cost;
    this.RentalRate = car.RentalRate;
};

Car.getAll = async()=>{

    const query = 'SELECT * FROM Cars';
    const rows = await db.query(query);
    return rows;

};


Car.create = async (newCar)=>{

        const query = 'INSERT INTO Cars(Brand,Type,Year,Cost,RentalRate)VALUES (?, ?, ?, ?, ?)';
        const result = await db.query(query,[newCar.Brand,newCar.Type,newCar.Year,newCar.Cost,newCar.RentalRate]);
        newCar.CarID = result.insertId;
        return newCar;

};

Car.getById = async(id)=>{
    const query = 'SELECT * FROM Cars WHERE CarID =?';
    const [rows] = await db.query(query,[id]);
    return rows[0];
};

Car.remove = async(id)=>{
    const car = await Car.getById(id);
    if(!car){
        throw new Error("Car not found");
    }
    const query = 'DELETE FROM Cars WHERE CarID =?';
    await db.query(query,[id]);
    return {message:'Car deleted successfully'};

};

module.exports = Car;