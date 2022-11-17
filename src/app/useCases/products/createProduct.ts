
import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
    try {
        const imagePath = req.file?.filename;

        const {name, description, price, category, ingredients} = req.body;

        const product = await Product.create({
            name,
            description,
            price: Number(price),
            category,
            ingredients: ingredients ? JSON.parse(ingredients) : undefined,
            imagePath
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            error: `Internal server error - ${error}`
        });
    }
}