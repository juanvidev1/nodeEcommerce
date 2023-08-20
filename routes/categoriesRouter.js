const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

const categories = []; // Start an empty array. This is gonna fake the DB for this exercise. Try to use not moore than 30 "registers"

/*
This commented block of code can generate 30 registers to fake a population of data in your endpoint 
using the empty array. Uncomment this if you want to see some data in your categories list

const limit = 30;
for (let i = 0; i < limit; i++) { // Con este for se van agregando categorías utilizando faker hasta completar 30 registros
  categories.push({
    id: i + 1,
    name: faker.commerce.department(),
    description: faker.commerce.productDescription()
  });

}*/

router.get('/', (req, res) => {
  // const { size } = req.query; // Con esta línea se obtiene un limit desde los params
  if (categories.length === 0) { // This line checks if you have any data in your categories array. If you don't have any data, it will send a 404 erro
    res.status(404).send('No hay categorias');
  } else {
    res.json(categories);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params; // Get an id from params (eg. categories/1)
  category = categories.find(category => category.id === parseInt(id)); // Try to find the category using the id passed as param in your categories array
  if (!category) {
    res.status(404).send('Categoria no encontrada'); // Shows if the category is not found in your categories array. If it is, it will send a 404 error
  }
  res.status(200).json(category); // The category was found and retrieves the data
});

// Create a category endpoint
router.post('/', (req, res) => {
  const body = req.body; // Here we get the data sent trought the json body in the client (postman or others)
  
  if (categories.length === 0) { // If the array is empty, we create the first element with id 1
    categories.push({
      id: 1,
      name: body.name,
      description: body.description
    });
  } else {
    const lastCategoryId = categories[categories.length - 1].id; // This line takes the last id to set the new id with the correct number
    
    categories.push({ // Here we set the fields for a new category and pushes in the array
      id: lastCategoryId + 1, // This line isn't neccesary if we use a DB because the id is autoincremental and sets automatically
      name: body.name, // This line takes the name of the request to create a new category name
      description: body.description // This line takes the description of the request to create a new category description
    });
  }

  res.status(201).json({
    message: 'Categoria creada', // Shows a message with the success of a new category created
    data: body // Shows the data sent in the request
  });
});

// Update a category
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const category = categories.find(category => category.id === parseInt(id));
  const body = req.body;
  if (!category) {
    res.status(404).send('Categoria no encontrada');
  }

  // const updatedCategory = {
  //   name: body.name,
  //   description: body.description
  // }
  category.id = category.id;
  if (!body.name) {
    category.name = category.name;
  } else {
    category.name = body.name;
  }

  if (!body.description) {
    category.description = category.description;
  } else {
    category.description = body.description;
  }
  
  res.json({
    message: 'Categoria actualizada',
    data: category,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  category = categories.findIndex(category => category.id === parseInt(id)); // This line is used to find an element inside the array. If you're using a DB you should use the method find
  if (!category) {
    res.status(404).send('Categoria no encontrada');
  }
  categories.splice(category, 1);
  res.json({
    message: 'Categoria eliminada',
    id
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
