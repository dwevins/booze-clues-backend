const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Ingredient extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  recipeIngredients() {
    return this.hasMany('App/Http/JsonApiViews/RecipeIngredient', {
      included: false,
      excludeRelation: 'ingredient',
    });
  }

  userCabinets() {
    return this.hasMany('App/Http/JsonApiViews/UserCabinet', {
      included: false,
      excludeRelation: 'ingredient',
    });
  }
}

module.exports = Ingredient;
