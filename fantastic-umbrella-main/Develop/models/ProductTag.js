const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

class ProductTag extends Model {
  // Other methods and properties

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
    });

    this.belongsTo(models.Tag, {
      foreignKey: 'tag_id',
    });
  }
}


module.exports = ProductTag;
