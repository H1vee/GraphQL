const graphql = require('graphql');
const Car = require('../models/car.model');

const CarType = new graphql.GraphQLObjectType({
    name: 'Car',
    fields: () => ({
        carID: { type: graphql.GraphQLInt },
        Brand: { type: graphql.GraphQLString },
        Type: { type: graphql.GraphQLString },
        Year: { type: graphql.GraphQLInt },
        Cost: { type: graphql.GraphQLFloat },
        RentalRate: { type: graphql.GraphQLFloat }
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addCar: {
            type: CarType,
            args: {
                Brand: { type: graphql.GraphQLString },
                Type: { type: graphql.GraphQLString },
                Year: { type: graphql.GraphQLInt },
                Cost: { type: graphql.GraphQLFloat },
                RentalRate: { type: graphql.GraphQLFloat },
            },
            resolve: async (parent, args) => await Car.create(args),
        },
        deleteCar: {
            type: graphql.GraphQLString,
            args: {
                CarID: { type: graphql.GraphQLInt }
            },
            resolve: async (parent, args) => {
                await Car.remove(args.CarID);
            }
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllCars: {
            type: new graphql.GraphQLList(CarType),
            resolve: async () => await Car.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
