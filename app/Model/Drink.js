'use strict';

const Lucid = use('Lucid');

class Drink extends Lucid {


  creator() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }

  recipeIngredients() {
    return this.hasMany('App/Model/RecipeIngredient');
  }
}

module.exports = Drink;
