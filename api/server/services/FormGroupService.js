import database from "../src/models";

class FormGroupService {
    static async getAllFormGroups() {
        try {
            return await database.FormGroup.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addFormGroup(newFormGroup) {
        try {
            return await database.FormGroup.create(newFormGroup);
        } catch (error) {
            throw error;
        }
    }

    static async updateFormGroup(id, updateFormGroup) {
        try {
            const formGroupToUpdate = await database.FormGroup.findOne({
                where: { id: Number(id) }
            });

            if (formGroupToUpdate) {
                await database.FormGroup.update(updateFormGroup, { where: { id: Number(id) } });

                return updateFormGroup;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAFormGroup(id) {
        try {
            const theFormGroup = await database.FormGroup.findOne({
                where: { id: Number(id) }
            });

            return theFormGroup;
        } catch (error) {
            throw error;
        }
    }

    static async deleteFormGroup(id) {
        try {
            const formGroupToDelete = await database.FormGroup.findOne({ where: { id: Number(id) } });

            if (formGroupToDelete) {
                const deletedFormGroup = await database.FormGroup.destroy({
                    where: { id: Number(id) }
                });
                return deletedFormGroup;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default FormGroupService;
