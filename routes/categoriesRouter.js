const express = require('express');
const categoriesService = require('../services/categoriesService');

const router = express.Router();
const service = new categoriesService();

router.get('/', (req, res) => {
  let categories = service.getAllCategories(); // This line gets a list of categories from categoriesService class. See categoriesService.js file
  res.status(200).json(categories); // Shows the list of categories
});

router.get('/:id', (req, res) => {
  const { id } = req.params; // Get an id from params (eg. categories/1)
  category = service.getCategory(id); // This line gets a category from categoriesService class. See categoriesService.js file
  if (!category) {
    res.status(404).json({message: 'Categoria no encontrada'}); // Shows if the category is not found in your categories array. If it is, it will send a 404 error
  }
  res.status(200).json(category); // The category was found and retrieves the data
});

// Create a category endpoint
router.post('/', (req, res) => {
  const body = req.body; // Here we get the data sent trought the json body in the client (postman or others)

  let newCategory = service.createCategory(body); // This line gets a category from categoriesService class. See categoriesService.js file

  res.status(201).json({
    message: 'Categoria creada', // Shows a message with the success of a new category created
    data: newCategory // Shows the data sent in the request
  });
});

// Update a category
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const category = service.updateCategory(id, body); // This line gets a category from categoriesService class. See categoriesService.js file
  if (!category) {
    res.status(404).json({message: 'Categoria no encontrada'}); // Shows if the category is not found in your categories array. If it is, it will send a 404 error
  }

  return res.status(200).json({
    message: 'Categoria actualizada',
    data: category
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  category = service.deleteCategory(id); // This line gets a category from categoriesService class. See categoriesService.js file
  if (!category) {
    res.status(404).send('Categoria no encontrada');
  }
  res.json({
    message: 'Categoria eliminada',
    deleted: category
  });
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
