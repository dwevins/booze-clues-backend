'use strict';

const Schema = use('Schema');

class RecipeIngredientSchema extends Schema {

  up() {
    this.create('recipe_ingredients', (table) => {
      table.increments();
      table.string('drink_id').references('drinks.drink_id');
      table.string('ingredient_id').references('ingredients.ingredient_id');
      table.integer('quantity');
      table.string('measure');
      table.string('addb_measure');

      table.timestamps();
    });
  }

  down() {
    this.drop('recipe_ingredients');
  }

}

module.exports = RecipeIngredientSchema;
