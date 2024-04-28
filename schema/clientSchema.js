const graphql = require('graphql');
const Client = require('../models/client.model');

const ClientType = new graphql.GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        ClientID: { type: graphql.GraphQLInt },
        FullName: { type: graphql.GraphQLString },
        Address: { type: graphql.GraphQLString },
        Phone: { type: graphql.GraphQLString },
        DiscountRate: { type: graphql.GraphQLFloat },
    }),
});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addClient: {
            type: ClientType,
            args: {
                FullName: { type: graphql.GraphQLString },
                Address: { type: graphql.GraphQLString },
                Phone: { type: graphql.GraphQLString },
                DiscountRate: { type: graphql.GraphQLFloat },
            },
            resolve: async (parent, args) => await Client.create(args),
        },
        deleteClient: {
            type: ClientType,
            args: {
                ClientID: { type: graphql.GraphQLInt }
            },
            resolve: async (parent, args) => {
                await Client.remove(args.ClientID);
                return 'Client deleted successfully!';
            }
        },
    }),
});

const Query = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllClients: {
            type: new graphql.GraphQLList(ClientType),
            resolve: async () => await Client.getAll(),
        },
    }),
});

module.exports = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation,
});