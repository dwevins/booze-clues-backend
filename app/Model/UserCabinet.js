'use strict'

const Lucid = use('Lucid')

class UserCabinet extends Lucid {


  user_id() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
  ingredient() {
    return this.belongsTo('App/Model/Ingredient', 'id', 'ingredient_id');
  }
}

module.exports = UserCabinet
