'use strict';

const RecipeIngredient = use('App/Model/RecipeIngredient');
const attributes = ['quantity', 'measurement'];

class RecipeIngredientController {

  * index(request, response) {
    const recipeIngredients = yield RecipeIngredient.all();

    response.jsonApi('RecipeIngredient', recipeIngredients);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      drink_id,
      ingredient_id,
    };
    const recipeIngredient = yield RecipeIngredient.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('RecipeIngredient', recipeIngredient);
  }

  * show(request, response) {
    const id = request.param('id');
    const recipeIngredient = yield RecipeIngredient.find(id);

    response.jsonApi('RecipeIngredient', recipeIngredient);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      drink_id,
      ingredient_id,
    };

    const recipeIngredient = yield RecipeIngredient.find(id);
    yield recipeIngredient.update(Object.assign({}, input, foreignKeys));

    response.send(recipeIngredient);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const recipeIngredient = yield RecipeIngredient.query().find(id);
    yield recipeIngredient.delete();

    response.status(204).send();
  }

}

module.exports = RecipeIngredientController;
