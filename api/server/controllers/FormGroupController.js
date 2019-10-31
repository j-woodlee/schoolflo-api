import FormGroupService from "../services/FormGroupService";
import Util from "../utils/Utils";

const util = new Util();

class FormGroupController {
    static async getAllFormGroups(req, res) {
        try {
            const allFormGroups = await FormGroupService.getAllFormGroups();
            if (allFormGroups.length > 0) {
                util.setSuccess(200, "FormGroup's retrieved", allFormGroups);
            } else {
                util.setSuccess(200, "No formGroup found");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addFormGroup(req, res) {
        console.log(req.body.name);
        if (!req.body.name || !req.body.path) {
            util.setError(400, "Please provide complete details");
            return util.send(res);
        }
        const newFormGroup = req.body;
        try {
            const createdFormGroup = await FormGroupService.addFormGroup(newFormGroup);
            util.setSuccess(201, "FormGroup Added!", createdFormGroup);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedFormGroup(req, res) {
        const alteredFormGroup = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }
        try {
            const updateFormGroup = await FormGroupService.updateFormGroup(id, alteredFormGroup);
            if (!updateFormGroup) {
                util.setError(404, `Cannot find formGroup with the id: ${id}`);
            } else {
                util.setSuccess(200, "FormGroup updated", updateFormGroup);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAFormGroup(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }

        try {
            const theFormGroup = await FormGroupService.getAFormGroup(id);

            if (!theFormGroup) {
                util.setError(404, `Cannot find formGroup with the id ${id}`);
            } else {
                util.setSuccess(200, "Found FormGroup", theFormGroup);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteFormGroup(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please provide a numeric value");
            return util.send(res);
        }

        try {
            const formGroupToDelete = await FormGroupService.deleteFormGroup(id);

            if (formGroupToDelete) {
                util.setSuccess(200, "FormGroup deleted");
            } else {
                util.setError(404, `FormGroup with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default FormGroupController;
