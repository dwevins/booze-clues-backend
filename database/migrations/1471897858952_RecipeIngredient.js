'use strict';

const Schema = use('Schema');

class RecipeIngredientSchema extends Schema {

  up() {
    this.create('recipe_ingredients', (table) => {
      table.increments();
      table.integer('drink_id').references('drinks.id');
      table.integer('ingredient_id').references('ingredients.id');
      table.string('quantity');
      table.string('measurement');
      table.timestamps();
    });
  }

  down() {
    this.drop('recipe_ingredients');
  }

}

module.exports = RecipeIngredientSchema;
