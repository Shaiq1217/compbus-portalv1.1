const statusCodes = require('http-status-codes');
const utility = require('../utils/Utility.js');
const CategoryModel = require('../models/Category.js');
const _ = require('lodash');
const utils = require('../utils/Utility.js');

class Category {
  async getCategory(req, res) {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res
        .status(statusCodes.StatusCodes.NOT_FOUND)
        .json({ status: false, message: 'Category not found' });
    }
    if (category.isDeleted) {
      return res
        .status(statusCodes.StatusCodes.NOT_FOUND)
        .json({ status: false, message: 'Category is deleted, restore with id' });
    }
    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ status: true, message: 'Category listed', data: category });
  }

  async getAllCategories(req, res) {
    const pickProps = ['_id', 'name', 'isDeleted'];
    const categories = await CategoryModel.find();
    const result = _.map(categories, category => _.pick(category, pickProps));
    const data = _.filter(result, category => category.isDeleted === false);
    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ status: true, message: 'All categories listed', data });
  }

  async getAllCategoriesDetailed(req, res) {
    const result = await CategoryModel.find();
    const data = _.filter(result, category => category.isDeleted === false);

    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ status: true, message: 'All category details listed', data });
  }

  async createCategory(req, res) {
    const name = utility.standardizeInput(req.body.name);
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(statusCodes.StatusCodes.CONFLICT)
        .json({ status: false, message: 'Category already exists' });
    }
    if (Object.keys(req.body.description).length === 0) {
      return res
        .status(statusCodes.StatusCodes.BAD_REQUEST)
        .json({ status: false, message: 'Category description is empty' });
    }
    const category = new CategoryModel({
      name,
      description: req.body.description,
      isDeleted: req.body.isDeleted
    });
    // Do not save the model for the category till description object is converted to model
    // Create model if it does not exist on the connection
    if (!utils.checkExistingModel(category.name)) {
      await utility.createModel(req);
    }
    const result = await category.save();
    return res
      .status(statusCodes.StatusCodes.CREATED)
      .json({ status: true, message: 'Category created succesfully', data: result });
  }

  async updateCategory(req, res) {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res
        .status(statusCodes.StatusCodes.NOT_FOUND)
        .json({ status: false, message: 'Category not found' });
    }
    const name = utility.standardizeInput(req.body.name);
    Object.assign(category, {
      name: name || category.name,
      description: req.body.description || category.description

    });
    const data = await category.save();

    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ status: true, message: 'Category Updated', data });
  }

  async deleteCategory(req, res) {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res
        .status(statusCodes.StatusCodes.NOT_FOUND)
        .json({ status: false, message: 'Category not found' });
    }
    category.isDeleted = true;
    await category.save();
    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ status: true, message: 'Category Deleted' });
  }

  async restoreCategory(req, res) {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res
        .status(statusCodes.StatusCodes.NOT_FOUND)
        .json({ status: false, message: 'Category not found' });
    }
    category.isDeleted = false;
    await category.save();
    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ status: true, message: 'Category Restored' });
  }
}

const category = new Category();
module.exports = category;
