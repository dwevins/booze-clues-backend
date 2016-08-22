'use strict'

const Schema = use('Schema')

class FavoriteSchema extends Schema {

  up () {
    this.table('favorite', (table) => {
      // alter favorite table
    })
  }

  down () {
    this.table('favorite', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = FavoriteSchema
