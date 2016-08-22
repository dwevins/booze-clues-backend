const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Favorite extends JsonApiView {
  get attributes() {
    return [];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', true);
  }

  drink() {
    return this.belongsTo('App/Http/JsonApiViews/Drink', true);
  }
}

module.exports = Favorite;
