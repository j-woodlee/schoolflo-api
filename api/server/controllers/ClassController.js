import ClassService from "../services/ClassService";
import Util from "../utils/Utils";

const util = new Util();

class ClassController {
    static async getAllClasss(req, res) {
        try {
            const allClasss = await ClassService.getAllClasss();
            if (allClasss.length > 0) {
                util.setSuccess(200, "Classs retrieved", allClasss);
            } else {
                util.setSuccess(200, "No class found");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addClass(req, res) {
        console.log(req.body.name);
        if (!req.body.name || !req.body.guardian_email || !req.body.class_id) {
            util.setError(400, "Please provide complete details");
            return util.send(res);
        }
        const newClass = req.body;
        try {
            const createdClass = await ClassService.addClass(newClass);
            util.setSuccess(201, "Class Added!", createdClass);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedClass(req, res) {
        const alteredClass = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }
        try {
            const updateClass = await ClassService.updateClass(id, alteredClass);
            if (!updateClass) {
                util.setError(404, `Cannot find class with the id: ${id}`);
            } else {
                util.setSuccess(200, "Class updated", updateClass);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAClass(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }

        try {
            const theClass = await ClassService.getAClass(id);

            if (!theClass) {
                util.setError(404, `Cannot find class with the id ${id}`);
            } else {
                util.setSuccess(200, "Found Class", theClass);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteClass(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please provide a numeric value");
            return util.send(res);
        }

        try {
            const classToDelete = await ClassService.deleteClass(id);

            if (classToDelete) {
                util.setSuccess(200, "Class deleted");
            } else {
                util.setError(404, `Class with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default ClassController;
