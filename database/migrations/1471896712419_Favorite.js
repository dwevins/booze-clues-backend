'use strict';

const Schema = use('Schema');

class FavoriteSchema extends Schema {

  up() {
    this.create('favorites', (table) => {
      table.increments();
      table.integer('user_id').references('users.id');
      table.integer('drink_id').references('drinks.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('favorites');
  }

}

module.exports = FavoriteSchema;
