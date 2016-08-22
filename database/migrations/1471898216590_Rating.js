'use strict';

const Schema = use('Schema');

class RatingSchema extends Schema {

  up() {
    this.create('ratings', (table) => {
      table.increments();
      table.integer('drink_id').references('drinks.id');
      table.integer('user_id').references('users.id');
      table.integer('value');
      table.timestamps();
    });
  }

  down() {
    this.drop('ratings');
  }

}

module.exports = RatingSchema;
