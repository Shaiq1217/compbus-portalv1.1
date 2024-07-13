const statusCodes = require('http-status-codes');
const Category = require('../models/Category');
const Product = require('../models/Product');
const utils = require('../utils/Utility');
const mongoose = require('mongoose');
class Products {
  /*
  * GET METHODS
  */
  async getProductByCategory(req, res) {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'No Categories found' });
    }

    if (!utils.checkExistingModel(category.name)) {
      await utils.createModel({ body: { name: category.name, description: category.description } });
    }
    const data = await Product
      .find({ categoryId: category.id })
      .populate({ path: 'detail', model: category.name })
      .exec();
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'All Products listed', data });
  }

  async getAllProducts(req, res) {     // Get all categories
    const categories = await Category.find();
    const products = await Product.find();
    const names = categories.map(category => category.name);

    // Filter out models that need to be created
    const modelsToMake = names.filter(category => !mongoose.modelNames().includes(category));

    // Create models for categories that don't have one
    const namedModelsPromises = modelsToMake.map(async model => {
      const newModel = await utils.createModel({
        body: {
          name: model,
          description: categories.find(cat => cat.name === model).description
        }
      });
      return { name: model, model: newModel };
    });

    // Wait for all model creation promises to resolve
    await Promise.all(namedModelsPromises);

    // Filter out deleted products without details
    const filteredProducts = products.filter(product => !(product.isDeleted && !product.productId));

    // Populate product details based on their categories
    const populatedProducts = await Promise.all(
      filteredProducts.map(async (product) => {
        const fetchedProduct = await Product.findById(product._id)
          .populate({ path: 'detail', model: product.category });
        return fetchedProduct;
      })
    );

    // Flatten the array if necessary
    const flatPopulatedProducts = populatedProducts.flat();

    // Return response with populated products
    return res.status(statusCodes.StatusCodes.OK).json({
      status: true,
      message: 'All Products listed',
      data: flatPopulatedProducts
    });
  }


  async getProductFieldDetails(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'Invalid Product' });
    }
    const category = await Category.findById(product.categoryId);
    console.log(category);
    if (!category) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'Invalid Category' });
    }
    const { description } = category;
    if (!description) {
      return res
        .status(statusCodes.StatusCodes.BAD_REQUEST)
        .json({ status: false, message: 'Category has no added description. Please update category.' });
    }
    const fieldInfoArray = Object.keys(description).map(fieldName => {
      const fieldConfig = description[fieldName];
      const fieldInfo = {
        name: fieldName,
        required: fieldConfig.required,
        type: fieldConfig.type
      };
      if (fieldConfig.min) {
        fieldInfo.min = fieldConfig.min;
      }
      if (fieldConfig.max) {
        fieldInfo.max = fieldConfig.max;
      }
      return fieldInfo;
    });
    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ status: true, message: 'Product Field Details', data: fieldInfoArray });
  }
  async getProductById(req, res) {
    const { id } = req.params;
    const product = await Product
      .findById(id)
    if (!product) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'Invalid Product' });
    }
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Product found', data: product });
  }
  /*
  * POST METHODS
  */
  async createProduct(req, res) {
    const cateogryId = req.body.categoryId;
    const name = utils.standardizeInput(req.body.name);
    const category = await Category.findById(cateogryId);
    if (!category) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'Invalid Category' });
    }
    const product = Product.find({ name });
    if (product.name === name && product.categoryId === cateogryId && product.isDeleted === false &&
      product.quantity > 0 && product.price > 0 && product.image === req.body.image &&
      product.description === req.body.description) {
      return res
        .status(statusCodes.StatusCodes.BAD_REQUEST)
        .json({ status: false, message: 'Product already exists. Please update quantity' });
    }
    const productToSave = {
      name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      description: req.body.description,
      tags: req.body.tags,
      discount: req.body.discount,
      categoryId: req.body.categoryId,
      category: category.name,
      productId: null
    };
    console.log(productToSave);
    const newProduct = new Product(productToSave);
    const data = await newProduct.save();
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Product Created', data });
  }
  async createProductDetails(req, res) {
    const { categoryId, id } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'Invalid Category' });
    }
    let productModel;
    if (!utils.checkExistingModel(category.name)) {
      const input = { body: { name: category.name, description: category.description } };
      productModel = await utils.createModel(input);
    } else {
      productModel = mongoose.model(category.name);
    }
    // eslint-disable-next-line new-cap
    const newProduct = new productModel(req.body.detail);
    const data = await newProduct.save();
    const product = await Product.findById(id);
    product.detail = newProduct.id;
    await product.save();
    return res.status(statusCodes.StatusCodes.OK).json({ status: true, msessage: 'Product Created', data });
  }
  /*
   * PUT METHODS
   */

  async updateProduct(req, res) {

    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ status: false, message: 'Invalid Product' });
    }

    const updatedProduct = {};
    const updatableFields = ['name', 'price', 'quantity', 'image', 'description', 'tags', 'discount', 'categoryId'];

    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updatedProduct[field] = req.body[field];
      }
    });

    const data = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    return res.status(statusCodes.StatusCodes.OK).json({ status: true, message: 'Product Updated', data });
  }
}




const product = new Products();
module.exports = product;