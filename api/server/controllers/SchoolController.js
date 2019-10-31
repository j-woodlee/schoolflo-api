import SchoolService from "../services/SchoolService";
import Util from "../utils/Utils";

const util = new Util();

class SchoolController {
    static async getAllSchools(req, res) {
        try {
            const allSchools = await SchoolService.getAllSchools();
            if (allSchools.length > 0) {
                util.setSuccess(200, "Schools retrieved", allSchools);
            } else {
                util.setSuccess(200, "No school found");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addSchool(req, res) {
        console.log(req.body.name);
        if (!req.body.name || !req.body.school_district) {
            util.setError(400, "Please provide complete details");
            return util.send(res);
        }
        const newSchool = req.body;
        try {
            const createdSchool = await SchoolService.addSchool(newSchool);
            util.setSuccess(201, "School Added!", createdSchool);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedSchool(req, res) {
        const alteredSchool = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }
        try {
            const updateSchool = await SchoolService.updateSchool(id, alteredSchool);
            if (!updateSchool) {
                util.setError(404, `Cannot find school with the id: ${id}`);
            } else {
                util.setSuccess(200, "School updated", updateSchool);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getASchool(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }

        try {
            const theSchool = await SchoolService.getASchool(id);

            if (!theSchool) {
                util.setError(404, `Cannot find school with the id ${id}`);
            } else {
                util.setSuccess(200, "Found School", theSchool);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteSchool(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please provide a numeric value");
            return util.send(res);
        }

        try {
            const schoolToDelete = await SchoolService.deleteSchool(id);

            if (schoolToDelete) {
                util.setSuccess(200, "School deleted");
            } else {
                util.setError(404, `School with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default SchoolController;
