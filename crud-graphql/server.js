const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const app = express();

const courses = require('./courses');

// Schema definition language
const schema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    input CourseInput {
        title: String!
        views: Int
    }

    type Query {
        getCourses: [Course]
        getCourse(id: ID!): Course
    }

    type Mutation {
        addCourse(input: CourseInput): Course
        updateCourse(id: ID!, input: CourseInput): Course
    }
`);

const root = {
    getCourses(){
        return courses;
    },
    getCourse({ id }){
        return courses.find((course) => id === course.id)
    },
    addCourse({ input }){
        const id = String(courses.length + 1);
        const course = { id, ...input}
        courses.push(course);
        return course;
    },
    updateCourse({ id, input }) {
        const courseIndex = courses.findIndex((course) => id === course.id )
        const course = courses[courseIndex]

        const newCourse = Object.assign(course, input);
        course[courseIndex] = newCourse;

        return newCourse;
    }
}

app.get('/', (req,res)=>{
    res.send("hola mundo")
});

app.use('/graphql',graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

app.listen(8080, ()=>{
    console.log("servidor iniciado")
})