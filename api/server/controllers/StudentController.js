import StudentService from "../services/StudentService";
import Util from "../utils/Utils";

const util = new Util();

class StudentController {
    static async getAllStudents(req, res) {
        try {
            const allStudents = await StudentService.getAllStudents();
            if (allStudents.length > 0) {
                util.setSuccess(200, "Students retrieved", allStudents);
            } else {
                util.setSuccess(200, "No student found");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addStudent(req, res) {
        console.log(req.body.name);
        if (!req.body.name || !req.body.guardian_email || !req.body.student_id_from_school || !req.body.school_id) {
            util.setError(400, "Please provide complete details");
            return util.send(res);
        }
        const newStudent = req.body;
        try {
            const createdStudent = await StudentService.addStudent(newStudent);
            util.setSuccess(201, "Student Added!", createdStudent);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedStudent(req, res) {
        const alteredStudent = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }
        try {
            const updateStudent = await StudentService.updateStudent(id, alteredStudent);
            if (!updateStudent) {
                util.setError(404, `Cannot find student with the id: ${id}`);
            } else {
                util.setSuccess(200, "Student updated", updateStudent);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAStudent(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }

        try {
            const theStudent = await StudentService.getAStudent(id);

            if (!theStudent) {
                util.setError(404, `Cannot find student with the id ${id}`);
            } else {
                util.setSuccess(200, "Found Student", theStudent);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteStudent(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please provide a numeric value");
            return util.send(res);
        }

        try {
            const studentToDelete = await StudentService.deleteStudent(id);

            if (studentToDelete) {
                util.setSuccess(200, "Student deleted");
            } else {
                util.setError(404, `Student with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default StudentController;
