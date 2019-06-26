const Course = require('../models/course');

module.exports  = {
    Query:{
        async getCourses(obj, {page, limit}){
            let courses = Course.find();
            if (page !== undefined) {
                courses = courses.limit(limit).skip((page - 1) * limit);
            }
            return await courses
        },
        async getCourse(obj, { id }){
            const course = await Course.findById(id);
            return course;
        }   
    },
    Mutation: {
        async addCourse(obj,{ input }){ 
            const course = new Course(input)
            await course.save()
            return course;
        },
        async updateCourse(obj,{ id, input }) {
            const course = await Course.findByIdAndUpdate(id, input)
            return course;
        },
        async deleteCourse(obj,{ id }) {
            await Course.deleteOne({_id: id})
            return {
                message: `El curso con el ${id} fue eliminado`
            }
        }
    }
}