const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class RecipeIngredient extends JsonApiView {
  get type() {
    return 'recipe-ingredients';
  }

  get attributes() {
    return ['quantity', 'measure', 'addb_measure'];
  }

  drink() {
    return this.belongsTo('App/Http/JsonApiViews/Drink', {
      included: true,
      excludeRelation: 'recipeIngredients',
    });
  }

  ingredient() {
    return this.belongsTo('App/Http/JsonApiViews/Ingredient', {
      included: true,
      excludeRelation: 'recipeIngredients',
    });
  }
}

module.exports = RecipeIngredient;
