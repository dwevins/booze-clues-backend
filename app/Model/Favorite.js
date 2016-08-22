'use strict'

const Lucid = use('Lucid')

class Favorite extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
  drink() {
    return this.belongsTo('App/Model/Drink', 'id', 'drink_id');
  }
}

module.exports = Favorite
