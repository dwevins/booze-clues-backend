'use strict';

const Schema = use('Schema');

class UserCabinetSchema extends Schema {

  up() {
    this.create('user_cabinets', (table) => {
      table.increments();
      table.integer('user_id').references('users.id');
      table.integer('ingredient_id').references('ingredients.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_cabinets');
  }

}

module.exports = UserCabinetSchema;
