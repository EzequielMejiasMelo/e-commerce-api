const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // get all tags
  try{
    const data = await Tag.findAll({include: [{model: Product, through: ProductTag}]});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const data = await Tag.findByPk(req.params.id, {include: [{model: Product, through: ProductTag}]});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update({where: {id: req.params.id}}, req.body);

    if (!data) {
      res.status(404).json({message: 'No tag with this ID'});
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!data) {
      res.status(404).json({message: 'No tag with this ID'});
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
