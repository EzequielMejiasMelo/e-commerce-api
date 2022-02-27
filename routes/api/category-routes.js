const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const data = await Category.findAll({include: [{model: Product}]});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const data = await Category.findByPk(req.params.id, {include: [{model: Product}]});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update({where: {id: req.params.id}}, req.body);

    if (!data) {
      res.status(404).json({message: 'No category with this ID'});
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!data) {
      res.status(404).json({message: 'No category with this ID'});
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
