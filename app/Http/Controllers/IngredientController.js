'use strict';

const Ingredient = use('App/Model/Ingredient');
const attributes = ['name'];

class IngredientController {

  * index(request, response) {
    const { number, size } = request.input('page') || { number: 1, size: 5 };
    const name = request.input('name');
    if (!name) {
      const ingredients = yield Ingredient.with('recipeIngredients.drink')
        .orderBy('name', 'asc')
        .forPage(parseInt(number), parseInt(size))
        .fetch();
      response.jsonApi('Ingredient', ingredients);
    } else {
      const ingredients = yield Ingredient.with('recipeIngredients.drink')
      .where('name', 'ilike', `%${name}%`)
      .forPage(parseInt(number), parseInt(size))
      .fetch();
      response.jsonApi('Ingredient', ingredients);
    }
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
    const ingredient = yield Ingredient.with('recipeIngredients.drink').where({ id }).firstOrFail();

    response.jsonApi('Ingredient', ingredient);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const ingredient = yield Ingredient.with('recipeIngredients.drink', 'user_cabinets')
      .where({ id }).firstOrFail();
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
