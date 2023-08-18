// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
// Import Sequelize and your existing database connection from server.js
const sequelize = require('./path-to-your-server');
const { Model, DataTypes } = require('sequelize');

// Define your models
class Product extends Model {
  // ... Define model attributes and methods
  getDescription() {
    return `${this.product_name}- ${this.price}`
}

class Category extends Model {
  // ... Define model attributes and methods

  static associate(models) {
    // Define associations
  }
}

class Tag extends Model {
  // ... Define model attributes and methods

  static associate(models) {
    // Define associations
  }
}

class ProductTag extends Model {
  // ... Define model attributes and methods

  static associate(models) {
    
  }
}

// Set up associations
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
});

// Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

