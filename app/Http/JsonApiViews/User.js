const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['username', 'email'];
  }

  favorites() {
    return this.hasMany('App/JsonApiViews/Favorite', true);
  }
}

module.exports = User;
