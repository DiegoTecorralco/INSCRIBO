import clasesDAO from "../dao/clases.dao.js";

const clasesController = {};


clasesController.getAll = async (req, res) =>{
    try {
        const clases = await clasesDAO.getAll();
        res.json({ data: clases });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export default clasesController;