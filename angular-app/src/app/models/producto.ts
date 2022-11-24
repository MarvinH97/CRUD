export class Producto {
    Id?: number;
    Name: string;
    Description: string;
    Quantity: number;

    constructor(name: string, description: string, quantity: number){
        this.Name = name;
        this.Description = description;
        this.Quantity = quantity;
    }
}