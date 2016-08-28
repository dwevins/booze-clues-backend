'use strict';

const Drink = use('App/Model/Drink');
const attributes = ['name', 'recipe', 'photo-url'];

class DrinkController {

  * index(request, response) {
    const { number, size } = request.input('page') || { number: 1, size: 5 };
    const name = request.input('name');
    const ingredients = request.input('ingredients');

    if (!name && !ingredients) {
      const drinks = yield Drink.with('creator')
        .orderBy('name', 'asc')
        .forPage(parseInt(number), parseInt(size))
        .fetch();
      response.jsonApi('Drink', drinks);
    } else if (name && !ingredients) {
      // const ingredientsArray = ???
      // needs to split list of ingredients into an array
      // ??? how does the string appear in the request?
      // ??? what can I use as a delimiter?
      const drinks = yield Drink.with('creator')
        .orderBy('name', 'asc')
        .forPage(parseInt(number), parseInt(size))
        // .where(???)
        // needs to check all drinks for ingredients from ingredientsArray
        // should return all drinks containing any ingredient from ingredientsArray
        // ??? how to make drinks with most ingredient matches show first?
        //
        .fetch;
    } else {
      const drinks = yield Drink.with('creator')
      .where('name', 'ilike', `%${name}%`)
      .forPage(parseInt(number), parseInt(size))
      .fetch();
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
