const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching tags' });
  }
});

// GET a single tag by ID
router.get('/:tag_id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        tag_id: req.params.tag_id, // Correct parameter name here
      },
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the tag' });
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create the tag' });
  }
});

// UPDATE a tag
router.put('/:tag_id', async (req, res) => {
  try {
    const [updatedRowCount] = await Tag.update(req.body, {
      where: {
        tag_id: req.params.tag_id, // Correct parameter name here
      },
    });

    if (updatedRowCount === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.sendStatus(204); 
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update the tag' });
  }
});

// DELETE a tag
router.delete('/:tag_id', async (req, res) => {
  try {
    const deletedRowCount = await Tag.destroy({
      where: {
        tag_id: req.params.tag_id, // Correct parameter name here
      },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.sendStatus(204); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the tag' });
  }
});

module.exports = router;
