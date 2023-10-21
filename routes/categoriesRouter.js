const express = require('express');
const categoriesService = require('../services/categoriesService');
const validatorHandler = require('../middleware/validatorHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categorySchema');

const router = express.Router();
const service = new categoriesService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getAllCategories(); // This line gets a list of categories from categoriesService class. See categoriesService.js file
    res.status(200).json(categories); // Shows the list of categories
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  const { id } = req.params; // Get an id from params (eg. categories/1)
  try {
    category = await service.getCategory(id); // This line gets a category from categoriesService class. See categoriesService.js file
  
    res.status(200).json(category); // The category was found and retrieves the data
  } catch (error) {
    next(error);
  }
});

// Create a category endpoint
router.post('/', 
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
  const body = req.body; // Here we get the data sent trought the json body in the client (postman or others)

  try {
    let newCategory = await service.createCategory(body); // This line gets a category from categoriesService class. See categoriesService.js file

    res.status(201).json({
      message: 'Categoria creada', // Shows a message with the success of a new category created
      data: newCategory // Shows the data sent in the request
    });
  } catch (error) {
    next(error);
  }
  
});

// Update a category
router.patch('/:id', 
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const category = await service.updateCategory(id, body); // This line gets a category from categoriesService class. See categoriesService.js file

    res.status(200).json({
      message: 'Categoria actualizada',
      data: category
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', 
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  const { id } = req.params;
  try {
    category = await service.deleteCategory(id); // This line gets a category from categoriesService class. See categoriesService.js file
  
    res.json({
      message: 'Categoria eliminada',
      deleted: category
    });
  } catch (error) {
    next(error);
  }
});

// This is an endpoint example when you want to show relations. Will see in future lessons
/*router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json([
    {
      'product_name': 'Producto ' + productId + ' de la categoria ' + categoryId,
      'price': productId + categoryId * 100
    }
  ]);
});*/

module.exports = router;
