const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Rating extends JsonApiView {
  get attributes() {
    return ['value'];
  }

  drink_id() {
    return this.belongsTo('App/Http/JsonApiViews/Drink', true);
  }

  user_id() {
    return this.belongsTo('App/Http/JsonApiViews/User', true);
  }
}

module.exports = Rating;
