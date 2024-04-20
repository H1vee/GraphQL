const graphql = require('graphql');
const Department = require('../models/department.model');

const DepartmentObject = new graphql.GraphQLObjectType({
    name: 'Department',
    fields: () => ({
        id: { type: graphql.GraphQLInt },
        id_group: { type: graphql.GraphQLInt },
        department_name: { type: graphql.GraphQLString },
    }),
});

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        departments: {
            type: new graphql.GraphQLList(DepartmentObject),
            resolve: async () => Department.getAll(),
        },
    }),
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

module.exports = schema;
