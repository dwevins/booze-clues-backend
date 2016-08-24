'use strict';

const Lucid = use('Lucid');

class RecipeIngredient extends Lucid {


  drink() {
    return this.belongsTo('App/Model/Drink', 'id', 'drink_id');
  }
  ingredient() {
    return this.belongsTo('App/Model/Ingredient', 'id', 'ingredient_id');
  }
}

module.exports = RecipeIngredient;
