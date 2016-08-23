'use strict';

const Request = use('Request');
const Drink = use('App/Model/Drink');
const Ingredient = use('App/Model/Ingredient');
const Env = use('Env');

class ScrapeController {
  * store(req, res) {
    const key = Env.get('API_KEY');
    const drinkURL = `http://addb.absolutdrinks.com/drinks/?apiKey=${key}`;
    const drinkData = yield Request.get(drinkURL);
    res.send(JSON.parse(drinkData));
  }
}

module.exports = ScrapeController;
