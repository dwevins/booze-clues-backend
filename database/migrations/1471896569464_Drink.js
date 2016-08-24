'use strict';

const Schema = use('Schema');

class DrinkSchema extends Schema {

  up() {
    this.create('drinks', (table) => {
      table.increments();
      table.string('drink_id').unique();
      table.string('name');
      table.text('recipe');
      table.string('photo_url');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('drinks');
  }

}

module.exports = DrinkSchema;
