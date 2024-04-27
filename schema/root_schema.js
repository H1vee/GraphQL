const graphql = require('graphql');
const Car = require('../models/car.model');
const Client = require('../models/client.model');
const Rental = require('../models/rental.model');
const { argsToArgsConfig } = require('graphql/type/definition');

const CarType = new graphql.GraphQLObjectType({
    name: 'Car',
    fields:()=>({
        carID: {type:graphql.GraphQLInt},
        Brand:{type:graphql.GraphQLString},
        Type:{type:graphql.GraphQLString},
        Year:{type:graphql.GraphQLInt},
        Cost:{type:graphql.GraphQLFloat},
        RentalRate:{type:graphql.GraphQLFloat}
    }),
});

const ClientType = new graphql.GraphQLObjectType({
    name: 'Client',
    fields:()=>({
        ClientID:{type:graphql.GraphQLInt},
        FullName:{type:graphql.GraphQLString},
        Address:{type:graphql.GraphQLString},
        Phone:{type:graphql.GraphQLString},
        DiscountRate:{type:graphql.GraphQLFloat},
    }),
});

const RentalType = new graphql.GraphQLObjectType({
    name: 'Rental',
    fields: () => ({
        RentalID: { type: graphql.GraphQLInt },
        CarID: { type: graphql.GraphQLInt },
        ClientID: { type: graphql.GraphQLInt },
        RentalDate: { type: graphql.GraphQLString },
        ExpectedReturnDate: { type: graphql.GraphQLString },
        ActualReturnDate: { type: graphql.GraphQLString },
        RentalCost: { type: graphql.GraphQLFloat },
        Fine: { type: graphql.GraphQLFloat },
    }),
});

const MutationRoot = new graphql.GraphQLObjectType({
    name:'Mutation',
    fields:()=>({
        addCar:{
            type:CarType,
            args:{
                Brand:{type:graphql.GraphQLString},
                Type:{type:graphql.GraphQLString},
                Year:{type:graphql.GraphQLInt},
                Cost:{type:graphql.GraphQLFloat},
                RentalRate:{type:graphql.GraphQLFloat},

            },
            resolve:async (parent,args)=>await Car.create(args),
        },
        addClient:{
            type:ClientType,
            args:{
                FullName:{type:graphql.GraphQLString},
                Address:{type:graphql.GraphQLString},
                Phone:{type:graphql.GraphQLString},
                DiscountRate:{type:graphql.GraphQLFloat},
            },
            resolve:async(parent,args)=>await Client.create(args),
        },
        addRental:{
            type:RentalType,
            args:{
                CarID: {type:graphql.GraphQLInt},
                ClientID:{type:graphql.GraphQLInt},
                RentalDate:{type:graphql.GraphQLString},
                ExpectedReturnDate:{type:graphql.GraphQLString},
                ActualReturnDate:{type:graphql.GraphQLString},
                RentalCost:{type:graphql.GraphQLFloat},
                Fine:{type:graphql.GraphQLFloat},
            },
            resolve:async(parent,args)=>await Rental.create(args),

        },
        deleteCar : {
            type:graphql.GraphQLString,
            args:{
                CarID:{type:graphql.GraphQLInt}
            },
            resolve:async(parent,args)=>{
                await Car.remove(args.CarID);

            }
        },
        deleteClient : {
            type:graphql.GraphQLString,
            args:{
                ClientID:{type:graphql.GraphQLInt}
            },
            resolve:async(parent,args)=>{
                await Client.remove(args.ClientID);

            }
        },
        deleteRental : {
            type:graphql.GraphQLString,
            args:{
                RentalID:{type:graphql.GraphQLInt}
            },
            resolve:async(parent,args)=>{
                await Rental.remove(args.RentalID);

            }
        } ,
    }),
      
});


const QueryRoot = new graphql.GraphQLObjectType({

    name:'Query',
    fields:()=>({
        getAllCars:{
            type:new graphql.GraphQLList(CarType),
            resolve:async()=>await Car.getAll(),
        },
        getAllClients:{
            type: new graphql.GraphQLList(ClientType),
            resolve:async()=>await Client.getAll(),
        },
        getAllRentals:{
            type:new graphql.GraphQLList(RentalType),
            resolve:async()=>await Rental.getAll(),
        },
    }),
});


const schema = new graphql.GraphQLSchema({
    query:QueryRoot,
    mutation:MutationRoot

});

module.exports = schema;