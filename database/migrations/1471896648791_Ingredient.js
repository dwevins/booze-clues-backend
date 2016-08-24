'use strict';

const Schema = use('Schema');

class IngredientSchema extends Schema {

  up() {
    this.create('ingredients', (table) => {
      table.increments();

      table.string('ingredient_id').unique();
      table.string('name').unique();

      table.timestamps();
    });
  }

  down() {
    this.drop('ingredients');
  }

}

module.exports = IngredientSchema;
