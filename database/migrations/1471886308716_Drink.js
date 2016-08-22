'use strict';

const Schema = use('Schema');

class DrinkSchema extends Schema {

  up() {
    this.create('drinks', (table) => {
      table.increments();
      table.string('name', 40).notNullable().unique();
      // ingredients array
      table.string('recipe', 250).notNullable();
      // photos???
      table.integer('popularity').defaultTo(0);
      table.integer('rating');
      table.integer('addedBy')
        .unsigned()
        .references('id')
        .inTable('users');
    });
  }

  down() {
    this.drop('drinks');
  }

}

module.exports = DrinkSchema;
