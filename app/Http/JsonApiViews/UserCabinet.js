const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class UserCabinet extends JsonApiView {
  get attributes() {
    return [];
  }

  user_id() {
    return this.belongsTo('App/Http/JsonApiViews/User', true);
  }

  ingredient() {
    return this.belongsTo('App/Http/JsonApiViews/Ingredient', true);
  }
}

module.exports = UserCabinet;
