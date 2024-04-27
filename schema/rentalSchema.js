const graphql = require('graphql');
const Rental = require('../models/rental.model');

const { GraphQLScalarType, Kind } = require('graphql');
const DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type for date',
    serialize(value) {
      // Convert JavaScript Date object to string with only year, month, and day
      const date = new Date(value);
      return date.toISOString().split('T')[0];
    },
    parseValue(value) {
      // Convert string to JavaScript Date object
      return new Date(value);
    },
    parseLiteral(ast) {
      // Convert GraphQL AST to JavaScript Date object
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  });

  const RentalType = new graphql.GraphQLObjectType({
    name: 'Rental',
    fields: () => ({
        RentalID: { type: graphql.GraphQLInt },
        CarID: { type: graphql.GraphQLInt },
        ClientID: { type: graphql.GraphQLInt },
        RentalDate: { type: DateType }, // Використовуйте DateType тут
        ExpectedReturnDate: { type: DateType }, // Використовуйте DateType тут
        ActualReturnDate: { type: DateType }, // Використовуйте DateType тут
        RentalCost: { type: graphql.GraphQLFloat },
        Fine: { type: graphql.GraphQLFloat },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addRental: {
            type: RentalType,
            args: {
                CarID: { type: graphql.GraphQLInt },
                ClientID: { type: graphql.GraphQLInt },
                RentalDate: { type: graphql.GraphQLString },
                ExpectedReturnDate: { type: graphql.GraphQLString },
                ActualReturnDate: { type: graphql.GraphQLString },
                RentalCost: { type: graphql.GraphQLFloat },
                Fine: { type: graphql.GraphQLFloat },
            },
            resolve: async (parent, args) => await Rental.create(args),
        },
        deleteRental: {
            type: graphql.GraphQLString,
            args: {
                RentalID: { type: graphql.GraphQLInt }
            },
            resolve: async (parent, args) => {
                await Rental.remove(args.RentalID);
            }
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllRentals: {
            type: new graphql.GraphQLList(RentalType),
            resolve: async () => await Rental.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
