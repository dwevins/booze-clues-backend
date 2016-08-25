'use strict';

const Ingredient = use('App/Model/Ingredient');
const attributes = ['name'];

class IngredientController {

  * index(request, response) {
    console.log('index');
    const ingredients = yield Ingredient.with().fetch();

    response.jsonApi('Ingredient', ingredients);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const ingredient = yield Ingredient.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Ingredient', ingredient);
  }

  * show(request, response) {
    const id = request.param('id');
    const ingredient = yield Ingredient.with('recipe_ingredients', 'user_cabinets').where({ id }).firstOrFail();

    response.jsonApi('Ingredient', ingredient);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const ingredient = yield Ingredient.with('recipe_ingredients', 'user_cabinets').where({ id }).firstOrFail();
    yield ingredient.update(Object.assign({}, input, foreignKeys));

    response.send(ingredient);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const ingredient = yield Ingredient.query().where({ id }).firstOrFail();
    yield ingredient.delete();

    response.status(204).send();
  }

}

module.exports = IngredientController;
