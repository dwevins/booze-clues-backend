const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class RecipeIngredient extends JsonApiView {
  get attributes() {
    return ['quantity', 'measure', 'addb_measure'];
  }

  drink() {
    return this.belongsTo('App/Http/JsonApiViews/Drink', true);
  }

  ingredient() {
    return this.belongsTo('App/Http/JsonApiViews/Ingredient', true);
  }
}

module.exports = RecipeIngredient;
