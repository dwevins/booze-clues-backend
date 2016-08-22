'use strict';

const Schema = use('Schema');

class FavoriteSchema extends Schema {

  up() {
    this.create('favorites', (table) => {
      table.increments();
      table.integer('user')
        .references('id')
        .inTable('users');
      table.integer('drink')
        .references('id')
        .inTable('drinks');
    });
  }

  down() {
    this.drop('favorites');
  }

}

module.exports = FavoriteSchema;
