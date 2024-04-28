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

// Car.getById = async(id)=>{
//     console.log("ID, що передається:", id);
//     const query = 'SELECT * FROM Cars WHERE CarID =?';
//     const [rows] = await db.query(query,[id]);
//     console.log("Рядки з бази даних:", rows);
//     console.log(rows[1]);
//     return rows[0];
// };
Car.getById = async(id)=>{
    const query = 'SELECT * FROM Cars WHERE CarID =?';
    const [rows] = await db.query(query,[id]);
    console.log("Рядки з бази даних:", rows);
    return rows; // Повертаємо всі рядки, які відповідають даному id
};

// Car.remove = async(id)=>{
//     const car = await Car.getById(id);
//     if(!car){
//         throw new Error("Car not found");
//     }
//     const query = 'DELETE FROM Cars WHERE CarID =?';
//     await db.query(query,[id]);
//     return {message:'Car deleted successfully'};

// };
// Car.remove = async (id) => {
//     try {
//         const car = await Car.getById(id);
//         if (!car) {
//             throw new Error("Car not found");
//         }
//         const query = 'DELETE FROM Cars WHERE CarID = ?';
//         await db.query(query, [id]);
//         return 'Car deleted successfully';
//     } catch (error) {
//         throw new Error(`Error deleting car: ${error.message}`);
//     }
// };
Car.remove = async (id) => {
    try {
        const car = await Car.getById(id);
        if (car.length === 0) { // Перевірка, чи є результат порожнім
            throw new Error("Car not found");
        }
        const query = 'DELETE FROM Cars WHERE CarID = ?';
        await db.query(query, [id]);
        return 'Car deleted successfully';
    } catch (error) {
        throw new Error(`Error deleting car: ${error.message}`);
    }
};
module.exports = Car;