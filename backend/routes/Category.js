const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const validation = require('../middleware/validate.js');
const category = require('../controllers/Category.js');
const schemas = require('../middleware/schemas.js');

router.get('/', category.getAllCategories);
router.get('/detail', category.getAllCategoriesDetailed);
router.get('/:id',
  (req, res, next) => validation.params(req, res, next, schemas.categoryGetDetail),
  category.getCategory);


router.post('/',
  (req, res, next) =>
    validation.body(req, res, next, schemas.categoryPost),
  category.createCategory
);

router.patch(
  '/:id',
  [(req, res, next) => validation.body(req, res, next, schemas.categoryPatch),
    (req, res, next) => validation.params(req, res, next, schemas.categoryGetDetail)],
  category.updateCategory);

router.delete('/:id',
  (req, res, next) => validation.params(req, res, next, schemas.categoryGetDetail),
  category.deleteCategory);

router.patch('/:id/restore',
  (req, res, next) => validation.params(req, res, next, schemas.categoryGetDetail),
  category.restoreCategory);

module.exports = router;
