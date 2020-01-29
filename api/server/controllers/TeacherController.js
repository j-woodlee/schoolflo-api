import TeacherService from "../services/TeacherService";
import Util from "../utils/Utils";
// import Teacher from "../src/models/teacher.js";
let Teacher = require("../src/models/teacher").Teacher;

console.log("Teacher: ");
console.log(Teacher);
import jwt from "jsonwebtoken";

console.log("jwt: ");
console.log(jwt);

const util = new Util();

class TeacherController {
    static async getAllTeachers(req, res) {
        try {
            const allTeachers = await TeacherService.getAllTeachers();
            if (allTeachers.length > 0) {
                util.setSuccess(200, "Teachers retrieved", allTeachers);
            } else {
                util.setSuccess(200, "No teacher found");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addTeacher(req, res) {
        console.log(req.body.name);
        if (!req.body.email || !req.body.password_hash || !req.body.school_id) {
            util.setError(400, "Please provide complete details");
            return util.send(res);
        }
        const newTeacher = req.body;
        try {
            const createdTeacher = await TeacherService.addTeacher(newTeacher);
            util.setSuccess(201, "Teacher Added!", createdTeacher);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedTeacher(req, res) {
        const alteredTeacher = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }
        try {
            const updateTeacher = await TeacherService.updateTeacher(id, alteredTeacher);
            if (!updateTeacher) {
                util.setError(404, `Cannot find teacher with the id: ${id}`);
            } else {
                util.setSuccess(200, "Teacher updated", updateTeacher);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getATeacher(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }

        try {
            const theTeacher = await TeacherService.getATeacher(id);

            if (!theTeacher) {
                util.setError(404, `Cannot find teacher with the id ${id}`);
            } else {
                util.setSuccess(200, "Found Teacher", theTeacher);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteTeacher(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please provide a numeric value");
            return util.send(res);
        }

        try {
            const teacherToDelete = await TeacherService.deleteTeacher(id);

            if (teacherToDelete) {
                util.setSuccess(200, "Teacher deleted");
            } else {
                util.setError(404, `Teacher with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async signIn(req, res) {
        Teacher.findOne({
            where: {
                email: req.body.email
            }
        }).then((teacher) => {
            if (!teacher) {
                util.setError(401, "Authentication failed. Teacher not found.");
                return util.send(res);
            }
            teacher.comparePassword(req.body.password_hash, (err, isMatch) => {
                if (isMatch && !err) {
                    let token = jwt.sign(
                        JSON.parse(JSON.stringify(teacher)),
                        "nodeauthsecret", {expiresIn: 86400 * 30});
                    jwt.verify(token, "nodeauthsecret", (err, data) => {
                        console.log(err, data);
                    });
                    res.json({success: true, token: "JWT: " + token});
                } else {
                    res.status(401).send({success: false, msg: "Authentication failed. Wrong password."});
                }
            });
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
}

export default TeacherController;
