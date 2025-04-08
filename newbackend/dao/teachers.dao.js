import Teacher from '../models/Teachers.js'
const allTeacher = async ()=>{
    return Teacher.find().exec();
}
const oneTeacher = async (matricula) =>{
    return Teacher.findOne({matricula}).exec();
}
const createTeacher = async (teacherData) => {
    const newTeacher = new Teacher(teacherData);
    return newTeacher.save();
}
export{
    allTeacher,
    oneTeacher,
    createTeacher
}
