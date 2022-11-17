
import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
    try {
        const {name, icon} = req.body;

        const category = await Category.create({
            name, icon
        });

        return res.json(category);
    } catch (error) {
        res.status(500).json({
            error: `Internal server error - ${error}`
        });
    }
}
