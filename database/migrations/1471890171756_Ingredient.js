'use strict'

const Schema = use('Schema')

class IngredientSchema extends Schema {

  up () {
    this.table('ingredient', (table) => {
      // alter ingredient table
    })
  }

  down () {
    this.table('ingredient', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = IngredientSchema
