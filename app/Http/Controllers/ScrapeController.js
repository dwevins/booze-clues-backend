'use strict';

const fetch = require('universal-fetch');
const Drink = use('App/Model/Drink');
const Ingredient = use('App/Model/Ingredient');
const Env = use('Env');

const makeDrink = (drink) => {
  const attrs = {
    name: drink.name,
    recipe: drink.descriptionPlain,
    photo_url: `http://assets.absolutdrinks.com/drinks/transparent-background-white/${drink.id}.png`,
    user_id: null,
  };

  return Drink.create(attrs);
};

class ScrapeController {
  * store(request, response) {
    const key = Env.get('API_KEY');
    const drinkURL = `http://addb.absolutdrinks.com/drinks/?apiKey=${key}&start=0&pageSize=1024`;
    const drinkData = yield fetch(drinkURL).then((res) => res.json());

    const data = drinkData.result.map(makeDrink);

    return response.send(yield data);
  }
}

module.exports = ScrapeController;
