import database from "../src/models";

class StudentService {
    static async getAllStudents() {
        try {
            return await database.Student.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addStudent(newStudent) {
        try {
            return await database.Student.create(newStudent);
        } catch (error) {
            throw error;
        }
    }

    static async updateStudent(id, updateStudent) {
        try {
            const studentToUpdate = await database.Student.findOne({
                where: { id: Number(id) }
            });

            if (studentToUpdate) {
                await database.Student.update(updateStudent, { where: { id: Number(id) } });

                return updateStudent;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAStudent(id) {
        try {
            const theStudent = await database.Student.findOne({
                where: { id: Number(id) }
            });

            return theStudent;
        } catch (error) {
            throw error;
        }
    }

    static async deleteStudent(id) {
        try {
            const studentToDelete = await database.Student.findOne({ where: { id: Number(id) } });

            if (studentToDelete) {
                const deletedStudent = await database.Student.destroy({
                    where: { id: Number(id) }
                });
                return deletedStudent;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default StudentService;
