const Department = require('../models/department.model');

const users = [
    {
        id: 1,
        firstName: 'FirstName1',
        lastName: 'LastName1',
        email: 'a1@b.com',
    },
    {
        id: 2,
        firstName: 'FirstName2',
        lastName: 'LastName2',
        email: 'a2@b.com',
    },
    {
        id: 3,
        firstName: 'FirstName3',
        lastName: 'LastName3',
        email: 'a3@b.com',
    },
];

const getUsers = async (req, res) => {
    // Demo implementation
    const departments = await Department.getAll();
    console.log(departments);
    res.status(200).json(departments);
};

const addUser = async (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.status(201).json(user);
};

module.exports = {
    getUsers,
    addUser,
};
