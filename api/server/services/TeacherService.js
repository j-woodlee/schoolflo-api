import database from "../src/models";

class TeacherService {
    static async getAllTeachers() {
        try {
            return await database.Teacher.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addTeacher(newTeacher) {
        try {
            return await database.Teacher.create(newTeacher);
        } catch (error) {
            throw error;
        }
    }

    static async updateTeacher(id, updateTeacher) {
        try {
            const teacherToUpdate = await database.Teacher.findOne({
                where: { id: Number(id) }
            });

            if (teacherToUpdate) {
                await database.Teacher.update(updateTeacher, { where: { id: Number(id) } });

                return updateTeacher;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getATeacher(id) {
        try {
            const theTeacher = await database.Teacher.findOne({
                where: { id: Number(id) }
            });

            return theTeacher;
        } catch (error) {
            throw error;
        }
    }

    static async deleteTeacher(id) {
        try {
            const teacherToDelete = await database.Teacher.findOne({ where: { id: Number(id) } });

            if (teacherToDelete) {
                const deletedTeacher = await database.Teacher.destroy({
                    where: { id: Number(id) }
                });
                return deletedTeacher;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default TeacherService;
