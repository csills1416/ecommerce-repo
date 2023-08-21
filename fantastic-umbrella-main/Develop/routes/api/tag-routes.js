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

// GET a single tag by ID or other property
router.get('/:tag_id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.tag_id, 
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
        id: req.params.tag_id, 
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
        id: req.params.tag_id, 
      },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.sendStatus(204); // No content, successful delete
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the tag' });
  }
});

module.exports = router;
