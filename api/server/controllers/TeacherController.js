import TeacherService from "../services/TeacherService";
import Util from "../utils/Utils";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../src/tokens";
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newTeacher.password_hash, salt);

        newTeacher.password_hash = hashedPassword;

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

        if(!req.body.email || !req.body.password) {
            util.setError(400, "Please provide complete sign in details");
            return util.send(res);
        }

        try {
            let teacher = await TeacherService.getATeacherByEmail(req.body.email);

            if (!teacher) {
                util.setError(401, "Authentication failed. Teacher not found.");
                return util.send(res);
            }

            const valid = await bcrypt.compare(req.body.password, teacher.password);
            if (!valid) {
                throw new Error("Password not correct.");
            }

            const accessToken = createAccessToken(teacher.id);
            const refreshToken = createRefreshToken(teacher.id);

            // put the refreshtoken in the database
            teacher.refresh_token = refreshToken;
            TeacherService.updateTeacher(teacher.id, teacher);

            // send token.  refreshToken as a cookie and accesstoken as a regular response

            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                path: "/refresh_token"
            });

            util.setSuccess(200, "Should include access token as regular response", accessToken);
            return util.send(res);

        } catch (error) {
            util.setError(418, error);
            return util.send(res);
        }
    }
}

export default TeacherController;
