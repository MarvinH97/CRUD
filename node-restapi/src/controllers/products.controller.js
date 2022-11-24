import { getConnection, sql, queries } from '../database';

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProduct);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const createNewProduct = async (req, res) => {
    try {
        const { name, description, quantity } = req.body;
        if (name == null || description == null || quantity == 0) {
            return res.status(400).json({ msg: 'Bad request. Please fill all fields' });
        }
        const pool = await getConnection();
        pool.request().input("name", sql.NVarChar, name)
            .input("description", sql.Text, description)
            .input("quantity", sql.Int, quantity)
            .execute('sp_products_guardar');
            //.query(queries.addNewProduct);
        res.json(name, description, quantity);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
                                  .input('id', sql.Int, id)
                                  .query(queries.getProductById);
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        await pool.request()
                    .input('id', sql.Int, id)
                    .query(queries.deleteProduct);
        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getTotalProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
                                  .query(queries.getTotalProducts);
        res.json(result.recordset[0]['']);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, quantity } = req.body;
        if (name == null || description == null || quantity == 0) {
            return res.status(400).json({ msg: 'Bad request. Please fill all fields' });
        }
        const pool = await getConnection();
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('description', sql.Text, description)
            .input('quantity', sql.Int, quantity)
            .input('id', sql.Int, id)
            .query(queries.updateProductById);
        res.json({ name, description,quantity })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};