'use strict'

const Lucid = use('Lucid')

class Drink extends Lucid {


  creator() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Drink
