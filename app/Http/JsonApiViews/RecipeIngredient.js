const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class RecipeIngredient extends JsonApiView {
  get attributes() {
    return ['quantity', 'measurement'];
  }

  drink_id() {
    return this.belongsTo('App/Http/JsonApiViews/Drink', true);
  }

  ingredient_id() {
    return this.belongsTo('App/Http/JsonApiViews/Ingredient', true);
  }
}

module.exports = RecipeIngredient;
