import FormService from "../services/FormService";
import Util from "../utils/Utils";

const util = new Util();

class FormController {
    static async getAllForms(req, res) {
        try {
            const allForms = await FormService.getAllForms();
            if (allForms.length > 0) {
                util.setSuccess(200, "Forms retrieved", allForms);
            } else {
                util.setSuccess(200, "No form found");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addForm(req, res) {
        console.log(req.body.name);
        if (!req.body.student || !req.body.path || !req.body.name || !req.body.class) {
            util.setError(400, "Please provide complete details");
            return util.send(res);
        }
        const newForm = req.body;
        try {
            const createdForm = await FormService.addForm(newForm);
            util.setSuccess(201, "Form Added!", createdForm);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedForm(req, res) {
        const alteredForm = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }
        try {
            const updateForm = await FormService.updateForm(id, alteredForm);
            if (!updateForm) {
                util.setError(404, `Cannot find form with the id: ${id}`);
            } else {
                util.setSuccess(200, "Form updated", updateForm);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAForm(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please input a valid numeric value");
            return util.send(res);
        }

        try {
            const theForm = await FormService.getAForm(id);

            if (!theForm) {
                util.setError(404, `Cannot find form with the id ${id}`);
            } else {
                util.setSuccess(200, "Found Form", theForm);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteForm(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, "Please provide a numeric value");
            return util.send(res);
        }

        try {
            const formToDelete = await FormService.deleteForm(id);

            if (formToDelete) {
                util.setSuccess(200, "Form deleted");
            } else {
                util.setError(404, `Form with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default FormController;
