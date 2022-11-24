export const queries = {
    getAllProduct: 'SELECT * FROM Products',
    addNewProduct: 'INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)',
    getProductById: 'SELECT * FROM Products WHERE Id = @id',
    deleteProduct: 'DELETE FROM Products WHERE Id = @id',
    getTotalProducts: 'SELECT COUNT(*) FROM Products',
    updateProductById: 'UPDATE Products SET name = @name, description = @description, quantity = @quantity WHERE id = @id'
};