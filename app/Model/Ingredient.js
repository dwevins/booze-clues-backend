'use strict';

const Lucid = use('Lucid');

class Ingredient extends Lucid {

  recipe_ingredients() {
    return this.hasMany('App/Model/RecipeIngredient', 'id', 'ingredient_id');
  }

  user_cabinets() {
    return this.hasMany('App/Model/UserCabinet', 'id', 'ingredient_id');
  }
}

module.exports = Ingredient;
