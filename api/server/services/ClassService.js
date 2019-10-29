import database from "../src/models";

class ClassService {
    static async getAllClasss() {
        try {
            return await database.Class.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addClass(newClass) {
        try {
            return await database.Class.create(newClass);
        } catch (error) {
            throw error;
        }
    }

    static async updateClass(id, updateClass) {
        try {
            const classToUpdate = await database.Class.findOne({
                where: { id: Number(id) }
            });

            if (classToUpdate) {
                await database.Class.update(updateClass, { where: { id: Number(id) } });

                return updateClass;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAClass(id) {
        try {
            const theClass = await database.Class.findOne({
                where: { id: Number(id) }
            });

            return theClass;
        } catch (error) {
            throw error;
        }
    }

    static async deleteClass(id) {
        try {
            const classToDelete = await database.Class.findOne({ where: { id: Number(id) } });

            if (classToDelete) {
                const deletedClass = await database.Class.destroy({
                    where: { id: Number(id) }
                });
                return deletedClass;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default ClassService;
