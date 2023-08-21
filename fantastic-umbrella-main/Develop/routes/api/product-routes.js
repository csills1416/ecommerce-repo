const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
        },
        {
          model: Tag,
          as: 'tags',
        },
      ],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// GET a single product by ID
router.get('/:product_id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        product_id: req.params.product_id,
      },
      include: [
        {
          model: Category,
          as: 'category',
        },
        {
          model: Tag,
          as: 'tags',
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the product' });
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create the product' });
  }
});

// UPDATE a product
router.put('/:product_id', async (req, res) => {
  try {
    const [updatedRowCount] = await Product.update(req.body, {
      where: {
        product_id: req.params.product_id,
      },
    });

    if (updatedRowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.sendStatus(204); 
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update the product' });
  }
});

// DELETE a product
router.delete('/:product_id', async (req, res) => {
  try {
    const deletedRowCount = await Product.destroy({
      where: {
        product_id: req.params.product_id,
      },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.sendStatus(204); // No content, successful delete
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
});

module.exports = router;
