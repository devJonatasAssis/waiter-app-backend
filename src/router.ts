import { Router } from 'express';
import multer from 'multer';
import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProdutcts';
import path from 'node:path';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

// Listando as categorias
router.get('/categories', listCategories);

// Criando as categorias
router.post('/categories', createCategory);

// Listando os produtos
router.get('/products', listProducts);

// Criando os produtos
router.post('/products', upload.single('image'), createProduct);

// Listando os produtos por categoria
router.get('/categories/:categoryId/products', listProductsByCategory);

// Listando os pedidos
router.get('/orders', listOrders);

// Criando os pedidos
router.post('/orders', createOrder);

// Editando os pedidos
router.patch('/orders/:orderId', changeOrderStatus);

// Deletando os pedidos
router.delete('/orders/:orderId', cancelOrder);
