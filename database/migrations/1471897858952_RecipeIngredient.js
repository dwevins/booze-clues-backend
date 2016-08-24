'use strict';

const Schema = use('Schema');

class RecipeIngredientSchema extends Schema {

  up() {
    this.create('recipe_ingredients', (table) => {
      table.increments();
      table.integer('drink_id').references('drinks.id');
      table.integer('ingredient_id').references('ingredients.id');
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
