'use strict'

const Lucid = use('Lucid')

class Rating extends Lucid {


  drink_id() {
    return this.belongsTo('App/Model/Drink', 'id', 'drink_id');
  }
  user_id() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Rating
