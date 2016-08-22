const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Drink extends JsonApiView {
  get attributes() {
    return ['name', 'recipe', 'photo_url'];
  }

  creator() {
    return this.belongsTo('App/Http/JsonApiViews/User', true);
  }
}

module.exports = Drink;
