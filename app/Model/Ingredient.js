'use strict';

const Lucid = use('Lucid');

class Ingredient extends Lucid {

  recipeIngredients() {
    return this.hasMany('App/Model/RecipeIngredient', 'id', 'ingredient_id');
  }

  userCabinets() {
    return this.hasMany('App/Model/UserCabinet', 'id', 'ingredient_id');
  }
}

module.exports = Ingredient;
