const express = require('express');
const mongoose = require('mongoose'); //ODM
const bodyparser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash');

const CourseTypeDefs = require('./types/course.types');
const UserTypeDefs = require('./types/user.types');

const courseResolvers = require('./resolvers/course.resolvers');
const userResolvers = require('./resolvers/user.resolvers');

const app = express()

const typeDefs = `
    type Alert{
        message: String
    }
    type Query {
        _ : Boolean
    }
    type Mutation {
        _ : Boolean
    }
`;

const resolver = {};

const schema = makeExecutableSchema({
    typeDefs: [typeDefs,CourseTypeDefs, UserTypeDefs],
    resolvers: merge(resolver, courseResolvers, userResolvers)
})

app.use('/graphql',bodyparser.json(), graphqlExpress({ schema: schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

mongoose.connect('mongodb://admin:CPOWERCRU11@ds139427.mlab.com:39427/graphql-course',
{useNewUrlParser: true}
);

app.listen(8080, function(){
    console.log('servidor iniciado en 8080')
})
