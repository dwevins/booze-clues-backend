'use strict'

const Lucid = use('Lucid')

class RecipeIngredient extends Lucid {


  drink_id() {
    return this.belongsTo('App/Model/Drink', 'id', 'drink_id');
  }
  ingredient_id() {
    return this.belongsTo('App/Model/Ingredient', 'id', 'ingredient_id');
  }
}

module.exports = RecipeIngredient
