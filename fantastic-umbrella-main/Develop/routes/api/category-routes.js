const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching categories' });
  }
});

// GET a single category by ID
router.get('/:category_id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        category_id: req.params.category_id, // Correct parameter name here
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the category' });
  }
});

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create the category' });
  }
});

// UPDATE a category
router.put('/:category_id', async (req, res) => {
  try {
    const [updatedRowCount] = await Category.update(req.body, {
      where: {
        category_id: req.params.category_id, // Correct parameter name here
      },
    });

    if (updatedRowCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204); // No content, successful update
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update the category' });
  }
});

// DELETE a category
router.delete('/:category_id', async (req, res) => {
  try {
    const deletedRowCount = await Category.destroy({
      where: {
        category_id: req.params.category_id, // Correct parameter name here
      },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204); // No content, successful delete
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the category' });
  }
});

module.exports = router;
