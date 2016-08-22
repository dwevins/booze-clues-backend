'use strict';

const Schema = use('Schema');

class DrinkSchema extends Schema {

  up() {
    this.create('drinks', (table) => {
      table.increments();
      table.string('name', 40).notNullable().unique();
      table.string('recipe', 250).notNullable();
      table.integer('popularity').defaultTo(0);
      table.integer('addedBy')
        .unsigned()
        .references('id')
        .inTable('users');
      table.timestamps();
    });
  }

  down() {
    this.drop('drinks');
  }

}

module.exports = DrinkSchema;
