import database from "../src/models";

class FormService {
    static async getAllForms() {
        try {
            return await database.Form.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addForm(newForm) {
        try {
            return await database.Form.create(newForm);
        } catch (error) {
            throw error;
        }
    }

    static async updateForm(id, updateForm) {
        try {
            const formToUpdate = await database.Form.findOne({
                where: { id: Number(id) }
            });

            if (formToUpdate) {
                await database.Form.update(updateForm, { where: { id: Number(id) } });

                return updateForm;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAForm(id) {
        try {
            const theForm = await database.Form.findOne({
                where: { id: Number(id) }
            });

            return theForm;
        } catch (error) {
            throw error;
        }
    }

    static async deleteForm(id) {
        try {
            const formToDelete = await database.Form.findOne({ where: { id: Number(id) } });

            if (formToDelete) {
                const deletedForm = await database.Form.destroy({
                    where: { id: Number(id) }
                });
                return deletedForm;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default FormService;
