'use strict';

const Drink = use('App/Model/Drink');
const attributes = ['name', 'recipe', 'photo-url'];

class DrinkController {

  * index(request, response) {
    const { number, size } = request.input('page') || { number: 1, size: 5 };
    const name = request.input('name') || undefined;
    const ingredients = request.input('ingredients') || undefined;

    if (!name) {
      if (ingredients) {
        const drinks = yield Drink.with('creator', 'recipeIngredients')
        .where('recipe', 'ilike', `%${ingredients}%`)
        .forPage(parseInt(number), parseInt(size))
        .fetch();

        console.log('---ingredients---');

        response.jsonApi('Drink', drinks);
      } else {
        const drinks = yield Drink.with('creator', 'recipeIngredients.ingredient')
          .orderBy('name', 'asc')
          .forPage(parseInt(number), parseInt(size))
          .fetch();

        console.log('---no name---');

        response.jsonApi('Drink', drinks);
      }
    } else {
      const drinks = yield Drink.with('creator', 'recipeIngredients.ingredient')
      .where('name', 'ilike', `%${name}%`)
      .forPage(parseInt(number), parseInt(size))
      .fetch();

      console.log('---name---');

      response.jsonApi('Drink', drinks);
    }
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: creator,
    };
    const drink = yield Drink.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Drink', drink);
  }

  * show(request, response) {
    const id = request.param('id');
    const drink = yield Drink.with('creator', 'recipeIngredients', 'recipeIngredients.ingredient')
      .where({ id }).firstOrFail();
    response.jsonApi('Drink', drink);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: creator,
    };

    const drink = yield Drink.with('creator').where({ id }).firstOrFail();
    yield drink.update(Object.assign({}, input, foreignKeys));

    response.send(drink);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const drink = yield Drink.query().where({ id }).firstOrFail();
    yield drink.delete();

    response.status(204).send();
  }

}

module.exports = DrinkController;
